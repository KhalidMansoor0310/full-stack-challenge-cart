import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { cartState } from "../../Features/Cart/CartSlice";

function TopNavbar() {
  let { carts } = useSelector(cartState);
  return (
    <Navbar bg="light" className="py-3" expand="lg" variant="light">
      <Container>
        <NavLink to={"/"} className={"navbar-brand fw-bold"}>
          RandoStore
        </NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <NavLink to={"/"} className="nav-link">
              All Products
            </NavLink>

            <NavLink to={"/new-item"} className="nav-link">
              Manage Products
            </NavLink>

            <NavLink to={"/cart"} className="nav-link">
              Cart ({carts?.length})
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default TopNavbar;
