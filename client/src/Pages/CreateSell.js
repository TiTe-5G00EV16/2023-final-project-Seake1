import { Component } from "react";
import { Form, Button, Col, Spinner, Alert } from "react-bootstrap";
import { createProduct } from "../services/productData";
import SimpleSider from "../components/Siders/SimpleSider";
import "../components/CreateSell/CreateSell.css";
//Values needed for a new listing.
class AddProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      price: "",
      description: "",
      city: "",
      category: "",
      image: "",
      loading: false,
      alertShow: false,
      errors: [],
    };
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
  }
  //setting state for names and values.
  onChangeHandler(e) {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
    if (e.target.files) {
      this.setState({ image: e.target.files[0] });
    }
  }
  //Submit button handler.
  onSubmitHandler(e) {
    e.preventDefault();
    let { title, price, description, city, category, image } = this.state;
    let obj = { title, price, description, city, category };
    this.setState({ loading: true });
    this.getBase64(image)
      .then((data) => {
        obj["image"] = data;
        createProduct(obj)
          .then((res) => {
            if (res.error) {
              this.setState({ loading: false });
              this.setState({ errors: res.error });
              this.setState({ alertShow: true });
            } else {
              this.props.history.push(
                `/categories/${category}/${res.productId}/details`
              );
            }
          })
          .catch((err) => console.error("Creating product err: ", err));
      })
      .catch((err) => console.error("Converting to base64 err: ", err));
  }

  getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }
  //Setting values for new listing
  render() {
    return (
      <>
        <SimpleSider />
        <div className="container">
          <h1 className="heading">Add new listing</h1>
          <Form onSubmit={this.onSubmitHandler}>
            {this.state.alertShow && (
              <Alert
                variant="danger"
                onClose={() => this.setState({ alertShow: false })}
                dismissible
              >
                <p>{this.state.errors}</p>
              </Alert>
            )}
            <Form.Row>
              <Form.Group as={Col} controlId="formGridTitle">
                <Form.Label>Product name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter name for the product"
                  name="title"
                  required
                  onChange={this.onChangeHandler}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPrice">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  step="0.5"
                  placeholder="Enter a price for the item"
                  name="price"
                  required
                  onChange={this.onChangeHandler}
                />
              </Form.Group>
            </Form.Row>

            <Form.Group controlId="formGridDescription.ControlTextarea1">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Describe the item"
                rows={4}
                name="description"
                required
                onChange={this.onChangeHandler}
              />
            </Form.Group>

            <Form.Row>
              <Form.Group as={Col} controlId="formGridCity">
                <Form.Label>City</Form.Label>
                <Form.Control
                  name="city"
                  placeholder="Tampere"
                  required
                  onChange={this.onChangeHandler}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridCategory">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  as="select"
                  defaultValue="Choose..."
                  name="category"
                  required
                  onChange={this.onChangeHandler}
                >
                  <option>Choose a Category</option>
                  <option>Family</option>
                  <option>Fitness & Sports</option>
                  <option>Pet Supplies</option>
                  <option>Office Products</option>
                  <option>Furniture</option>
                  <option>Vehicles</option>
                  <option>Electronics</option>
                  <option>Clothing & Accessories</option>
                  <option>Hobbies</option>
                  <option>Garden</option>
                </Form.Control>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridImage">
                <Form.Label>Image</Form.Label>
                <Form.Control
                  name="image"
                  type="file"
                  required
                  onChange={this.onChangeHandler}
                />
              </Form.Group>
            </Form.Row>
            {this.state.loading ? (
              <Button className="col-lg-12" variant="dark" disabled>
                Wait... <Spinner animation="border" />
              </Button>
            ) : (
              <Button
                className="col align-self-center"
                variant="info"
                type="submit"
              >
                Add product
              </Button>
            )}
          </Form>
        </div>
      </>
    );
  }
}

export default AddProduct;
