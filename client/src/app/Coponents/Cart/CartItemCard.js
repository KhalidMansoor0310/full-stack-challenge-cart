import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { FaMinus, FaPlus } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  increaseQuantity,
  decreaseQuantity,
  removeFormCart,
} from "../../Features/Cart/CartSlice";

function CartItemCard({ item }) {
  console.log("item: ", item);
  //set the product info to state
  const [product, setProduct] = useState({});
  console.log("product: ", product);

  //import redux dispatch
  const dispatch = useDispatch();

  //increase quantity
  const increaseItemQuantity = (e) => {
    e.preventDefault();
    dispatch(increaseQuantity(item));
  };
  //decrease the item quantity
  const decreaseItemQunaity = (e) => {
    e.preventDefault();
    dispatch(decreaseQuantity(item));
  };
  //remove item form cart
  const removeItem = (e) => {
    e.preventDefault();
    dispatch(removeFormCart(item));
  };

  const fetchData = async (itemId) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/items/${itemId}`
      );
      return response.data;
    } catch (err) {
      console.log("Error fetching data:", err);
      return null;
    }
  };

  useEffect(() => {
    if (item) {
      fetchData(item.id).then((data) => {
        if (data) {
          setProduct({ ...data, quantity: item.quantity });
        }
      });
    }
  }, [item]);
  let content = "";
  if (product) {
    return (content = (
      <Card className="my-2 p-4">
        <Card.Body>
          <div className="d-flex justify-content-between">
            <div className="w-100">
              <Link
                to={`/product/${product._id}`}
                className="text-dark text-decoration-none fs-5"
              >
                {product.itemName ? product.itemName.slice(0, 20) : ""}...
              </Link>
            </div>
            <div className="d-flex w-100 justify-content-center">
              <button
                className="btn btn-sm btn-dark fs-6 me-3 text-center"
                onClick={decreaseItemQunaity}
              >
                <FaMinus />
              </button>
              <span className="fs-4">{product.quantity}</span>
              <button
                className="btn btn-sm btn-dark fs-6 ms-3 text-center"
                onClick={increaseItemQuantity}
              >
                <FaPlus />
              </button>
            </div>
            <div className="w-100 text-center">
              <span className="fs-5">
                $
                {product.itemPrice
                  ? (product.itemPrice * product.quantity).toFixed(2)
                  : ""}
              </span>
            </div>
            <div className="w-100 text-center">
              <Button variant="danger" onClick={removeItem}>
                Remove
              </Button>
            </div>
          </div>
        </Card.Body>
      </Card>
    ));
  }
  return { content };
}

export default CartItemCard;
