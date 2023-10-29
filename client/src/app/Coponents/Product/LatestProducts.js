import React from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import ProductCard from "./Card/ProductCard";

function LatestProducts() {
  const {
    products: { items },
  } = useSelector((state) => state.products);
  console.log("items: ", items);
  return (
    <Container className="my-3 py-3">
      <h3 className="text-center mb-4">Latest Products</h3>
      <Row>
        {items && items?.length > 0 ? (
          items?.map((p) => {
            return (
              <Col xs={12} sm={6} md={4} lg={3} className="mb-4" key={p.id}>
                <ProductCard product={p} />
              </Col>
            );
          })
        ) : (
          <div className="d-flex justify-content-center align-items-center my-5">
            ....loading
          </div>
        )}
      </Row>
    </Container>
  );
}

export default LatestProducts;
