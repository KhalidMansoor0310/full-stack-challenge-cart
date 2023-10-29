import React, { Fragment, useEffect, useState } from "react";
import { Button, Col, Container, Image, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import TopNavbar from "../../../Coponents/Header/TopNavbar";
import "./ProductDetails.css";
import { FaPlus, FaMinus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addToCarts } from "../../../Features/Cart/CartSlice";
import { getSingleProducts } from "../../../Features/Product/ProductSlice";

function SingleProductDetails() {
  const { productId } = useParams();
  const [quantity, setQuantity] = useState(1);
  const { singleProduct } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const addToCart = () => {
    if (singleProduct) {
      let item = {
        id: productId,
        quantity: quantity,
        price: singleProduct.itemPrice,
      };
      dispatch(addToCarts(item));
    }
  };

  useEffect(() => {
    dispatch(getSingleProducts(productId));
  }, [productId]);

  return (
    <Fragment>
      <TopNavbar />
      <Container>
        {singleProduct ? (
          <Row className="my-5">
            <Col md={6} sm={12}>
              <div className="img-container p-3">
                <Image className="single-img" src={singleProduct.imagePath} />
              </div>
            </Col>
            <Col md={6} sm={12}>
              <div className="px-4">
                <h2>{singleProduct.itemName}</h2>
                <h4 className="py-2">Price: ${singleProduct.itemPrice}</h4>
                <p>{singleProduct.itemDescription}</p>
                <div className="d-flex mb-3">
                  <button
                    className="btn btn-sm btn-dark fs-6 me-3 text-center"
                    onClick={decreaseQuantity}
                  >
                    <FaMinus />
                  </button>
                  <input
                    type="number"
                    className="form-control text-center w-auto p-0 m-0"
                    value={quantity}
                    readOnly={true}
                    required={true}
                  />
                  <button
                    className="btn btn-sm btn-dark fs-6 ms-3 text-center"
                    onClick={increaseQuantity}
                  >
                    <FaPlus />
                  </button>
                </div>
                <div className="">
                  <Button variant="dark" className="me-2">
                    Buy Now
                  </Button>
                  <Button
                    variant="secondary"
                    className="ms-2"
                    onClick={addToCart}
                  >
                    Add To Cart
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
        ) : (
          <div className="d-flex justify-content-center align-items-center my-5">
            ....loading
          </div>
        )}
      </Container>
    </Fragment>
  );
}

export default SingleProductDetails;
