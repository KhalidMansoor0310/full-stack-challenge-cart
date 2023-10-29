import React, { Fragment } from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import TopNavbar from "../Coponents/Header/TopNavbar";

function PageNotFound() {
  return (
    <Fragment>
      <TopNavbar />
      <Container>
        <div className="m-auto w-100 text-center my-5">
          <h1 className="text-danger">404 | Page Not Found</h1>
          <Link to="/" className="text-dark text-decoration-none fs-5">
            Go back to Home Page
          </Link>
        </div>
      </Container>
    </Fragment>
  );
}

export default PageNotFound;
