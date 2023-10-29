import React, { Fragment } from "react";
import { Card } from "react-bootstrap";
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";
import "./ProductCard.css";
function ProductCard({ product }) {
  return (
    <Fragment>
      <Link
        to={`/product/${product._id}`}
        className="text-dark text-decoration-none"
      >
        <Card className="custom-card shadow">
          <Card.Img
            variant="top"
            className="py-3 card-img"
            src={product.imagePath}
          />
          <Card.Body className="text-center">
            <Card.Title className="fs-6">{product.itemName} ...</Card.Title>
            <Card.Text className="text-capitalize text-decoration-none fs-6">
              {product.itemDescription}
            </Card.Text>
            <h5>${product.itemPrice}</h5>
            <div className="py-2 d-flex justify-content-center fs-6">
              <ReactStars
                count={5}
                value={2}
                isHalf={true}
                emptyIcon={<i className="far fa-start"></i>}
                halfIcon={<i className="fa fa-star-half-alt"></i>}
                fullIcon={<i className="fa fa-star"></i>}
                activeColor="#ffd700"
              ></ReactStars>
              {`(${2})`}
            </div>
          </Card.Body>
        </Card>
      </Link>
    </Fragment>
  );
}

export default ProductCard;
