import { Request, Response } from "express";
import { Types } from "mongoose";
import Products from "../../db/schemas/product";
import { sendError } from "../../utils/response_utils";

export const getProducts = async (
  req: Request,
  res: Response
): Promise<void> => {
  const itemsPerPage: number = 50;
  const page: number = parseInt(req.query.page as string);
  const start = (page - 1) * itemsPerPage;
  const total: number = await Products.count();

  const products = await Products.find().skip(start).limit(itemsPerPage);

  res.send({
    page: page,
    per_page: itemsPerPage,
    total: total,
    total_pages: Math.ceil(total / itemsPerPage),
    data: products,
  });
};

export const createProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    console.log(req.body);
    const { name, image, description, price } = req.body;
    const product = await Products.create({
      name,
      image,
      description,
      price,
    });
    res.send(product);
  } catch (e) {
    sendError(res, e);
  }
};

export const updateProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id: string = req.params.productId;
    const { name, image, description, price } = req.body;

    const updatedProduct = await Products.findOneAndUpdate(
      {
        _id: id,
      },
      {
        name,
        image,
        description,
        price,
      }
    );

    if (updatedProduct) {
      res.send({ data: "OK" });
    } else {
      res.status(404).send({});
    }
  } catch (e) {
    sendError(res, e);
  }
};

export const deleteProductById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const productId: string = req.params.productId;

    const deleted = await Products.deleteOne({
      _id: Types.ObjectId(productId),
    });
    const sendStatus = (deleted: any) => {
      if (deleted.deletedCount > 0) {
        res.send({});
      } else {
        res.status(404).send({});
      }
    };
    await sendStatus(deleted);
  } catch (e) {
    sendError(res, e);
  }
};
