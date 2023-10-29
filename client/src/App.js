import { Route, Routes } from "react-router-dom";
import Cart from "./app/Pages/Cart";
import Home from "./app/Pages/HomePage/Home";
import PageNotFound from "./app/Pages/PageNotFound";
import SingleProductDetails from "./app/Pages/Products/ProductDetails/SingleProductDetails";
import "./App.css";
import AddNewItem from "./app/Pages/AddNewItem";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="product/:productId" element={<SingleProductDetails />} />
        <Route path="cart" element={<Cart />} />
        <Route path="/new-item" element={<AddNewItem />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
