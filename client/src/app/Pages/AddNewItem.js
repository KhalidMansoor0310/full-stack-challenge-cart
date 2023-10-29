import { useState } from "react";
import TopNavbar from "../Coponents/Header/TopNavbar";
import HeaderSlider from "../Coponents/Slider/HeaderSlider";
import { useDispatch, useSelector } from "react-redux";
import {
  addProduct,
  deleteProduct,
  getAllProducts,
} from "../Features/Product/ProductSlice";
import { useNavigate } from "react-router-dom";
import { Table } from "react-bootstrap";
import { ToastContainer } from "react-toastify";

const AddNewItem = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    products: { items },
    isLoading,
  } = useSelector((state) => state.products);
  const [formData, setFormData] = useState({
    productName: "",
    productPrice: "",
    productImage: "",
    description: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let itemData = {
      itemName: formData?.productName,
      itemPrice: formData?.productPrice,
      imagePath: formData?.productImage,
      itemDescription: formData?.description,
    };

    dispatch(addProduct(itemData));
    setTimeout(() => {
      dispatch(getAllProducts());
    }, 1000);
    // navigate("/");

    setFormData({
      productName: "",
      productPrice: "",
      productImage: "",
      description: "",
    });
  };

  return (
    <div>
      <ToastContainer />
      <TopNavbar />
      <HeaderSlider />
      <div className="container my-5">
        <div className="row">
          <div className="col-md-6 shadow-lg p-0 p-lg-5">
            <h2>Create New Item</h2>
            <hr />
            <form onSubmit={handleSubmit}>
              <div className="col-12 mb-3">
                <label htmlFor="productName" className="form-label">
                  Product Name <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="productName"
                  name="productName"
                  placeholder="Enter your product name...."
                  value={formData.productName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="col-12 mb-3">
                <label htmlFor="productPrice" className="form-label">
                  Product Price <span className="text-danger">*</span>
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="productPrice"
                  name="productPrice"
                  placeholder="Enter your product price...."
                  value={formData.productPrice}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="col-12 mb-3">
                <label htmlFor="productImage" className="form-label">
                  Product Image <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="productImage"
                  name="productImage"
                  placeholder="Enter your product image path...."
                  value={formData.productImage}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="col-12 mb-3">
                <label htmlFor="description" className="form-label">
                  Description <span className="text-danger">*</span>
                </label>
                <textarea
                  className="form-control"
                  id="description"
                  name="description"
                  rows="3"
                  placeholder="Enter your product description...."
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                ></textarea>
              </div>
              <div>
                <div>
                  <button className="btn btn-success btn-sm" type="submit">
                    {isLoading ? "...wait" : "Submit"}
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div className="col-md-6 m-auto">
            <table className="table">
              <thead className="">
                <tr>
                  <th>Item Name</th>
                  <th>Item Price</th>
                  <th>Item image</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {items &&
                  items?.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{item?.itemName}</td>
                        <td>{item?.itemPrice}</td>
                        <td>
                          <img
                            src={item?.imagePath}
                            height={"50px"}
                            width={"50px"}
                            alt=""
                          />
                        </td>
                        <td>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => {
                              dispatch(deleteProduct(item?._id));
                              setTimeout(() => {
                                dispatch(getAllProducts());
                              }, 1000);
                            }}
                          >
                            X
                          </button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AddNewItem;
