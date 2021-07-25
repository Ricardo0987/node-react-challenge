import React, { useEffect, useState } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableContainer,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
  Modal,
  Button,
  TextField,
} from "@material-ui/core";
import { Edit, Delete } from "@material-ui/icons";
import { CONFIG } from "../../config";
import Container from "@material-ui/core/Container";
import Menu from "../header/Menu";

const baseUrl = CONFIG.HOST + "/api/v1/products/";

const useStyles = makeStyles((theme) => ({
  modal: {
    position: "absolute",
    width: "88%",
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  icons: {
    cursor: "pointer",
  },
  inputMaterial: {
    width: "100%",
  },
}));

function ProductList() {
  const styles = useStyles();
  const [data, setData] = useState([]);
  const [modalAdd, setModalAdd] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);

  const [currentProduct, setCurrentProduct] = useState({
    name: "",
    image: "",
    description: "",
    price: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log(currentProduct);
  };

  const getProducts = async () => {
    await axios.get(baseUrl).then((response) => {
      setData(response.data.data);
    });
  };

  const createProduct = async () => {
    await axios.post(baseUrl + "create", currentProduct).then((response) => {
      setData(data.concat(response.data));
      togglemodalAdd();
    });
  };

  const updateProduct = async () => {
    console.log(currentProduct);
    await axios
      .put(baseUrl + currentProduct._id, currentProduct)
      .then((response) => {
        var newData = data;
        newData.map((product) => {
          if (currentProduct._id === product._id) {
            product.name = currentProduct.name;
            product.description = currentProduct.description;
            product.image = currentProduct.image;
            product.price = currentProduct.price;
          }
        });
        setData(newData);
        toggleModalEdit();
      });
  };

  const deleteProduct = async () => {
    await axios.delete(baseUrl + currentProduct._id).then((response) => {
      setData(data.filter((product) => product._id !== currentProduct._id));
      toggleModalDelete();
    });
  };

  const togglemodalAdd = () => {
    setModalAdd(!modalAdd);
  };

  const toggleModalEdit = () => {
    setModalEdit(!modalEdit);
  };

  const toggleModalDelete = () => {
    setModalDelete(!modalDelete);
  };

  const selectProduct = (product, step) => {
    setCurrentProduct(product);
    step === "Edit" ? toggleModalEdit() : toggleModalDelete();
  };

  useEffect(() => {
    async function fetchData() {
      await getProducts();
    }
    fetchData();
  }, []);

  const bodyCreate = (
    <div className={styles.modal}>
      <h3>Create product</h3>
      <TextField
        name="name"
        className={styles.inputMaterial}
        label="name"
        onChange={handleChange}
      />
      <br />
      <TextField
        name="image"
        className={styles.inputMaterial}
        label="url_image"
        onChange={handleChange}
      />
      <br />
      <TextField
        name="description"
        className={styles.inputMaterial}
        label="description"
        onChange={handleChange}
      />
      <br />
      <TextField
        name="price"
        className={styles.inputMaterial}
        label="Price"
        onChange={handleChange}
        type="number"
      />
      <br />
      <br />
      <div align="right">
        <Button color="primary" onClick={() => createProduct()}>
          Add
        </Button>
        <Button onClick={() => togglemodalAdd()}>Cancel</Button>
      </div>
    </div>
  );

  const bodyEdit = (
    <div className={styles.modal}>
      <h3>Edit product</h3>
      <TextField
        name="name"
        className={styles.inputMaterial}
        label="name"
        onChange={handleChange}
        value={currentProduct && currentProduct.name}
      />
      <br />
      <TextField
        name="image"
        className={styles.inputMaterial}
        label="url_image"
        onChange={handleChange}
        value={currentProduct && currentProduct.image}
      />
      <br />
      <TextField
        name="description"
        className={styles.inputMaterial}
        label="description"
        onChange={handleChange}
        value={currentProduct && currentProduct.description}
      />
      <br />
      <TextField
        name="price"
        className={styles.inputMaterial}
        label="Price"
        type="number"
        onChange={handleChange}
        value={currentProduct && currentProduct.price}
      />
      <br />
      <br />
      <div align="right">
        <Button color="primary" onClick={() => updateProduct()}>
          Update
        </Button>
        <Button onClick={() => toggleModalEdit()}>Cancel</Button>
      </div>
    </div>
  );

  const bodyDelete = (
    <div className={styles.modal}>
      <p>
        Are you sure you want to remove the product{" "}
        <b>{currentProduct && currentProduct.name}</b> ?{" "}
      </p>
      <div align="right">
        <Button color="secondary" onClick={() => deleteProduct()}>
          Yes
        </Button>
        <Button onClick={() => toggleModalDelete()}>No</Button>
      </div>
    </div>
  );

  return (
    <Container component="main" maxWidth="xl">
      <Menu />
      <div>
        <br />
        <Button
          variant="contained"
          color="primary"
          onClick={() => togglemodalAdd()}
        >
          Add
        </Button>
        <br />
        <br />
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Image</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {data.map((product) => (
                <TableRow key={product._id}>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.image}</TableCell>
                  <TableCell>{product.description}</TableCell>
                  <TableCell>{product.price}</TableCell>
                  <TableCell>
                    <Edit
                      className={styles.icons}
                      onClick={() => selectProduct(product, "Edit")}
                    />
                    &nbsp;&nbsp;&nbsp;
                    <Delete
                      className={styles.icons}
                      onClick={() => selectProduct(product, "Delete")}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Modal open={modalAdd} onClose={togglemodalAdd}>
          {bodyCreate}
        </Modal>

        <Modal open={modalEdit} onClose={toggleModalEdit}>
          {bodyEdit}
        </Modal>

        <Modal open={modalDelete} onClose={toggleModalDelete}>
          {bodyDelete}
        </Modal>
      </div>
    </Container>
  );
}

export default ProductList;
