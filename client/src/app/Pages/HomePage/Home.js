import React, { Fragment } from "react";
import TopNavbar from "../../Coponents/Header/TopNavbar";
import HeaderSlider from "../../Coponents/Slider/HeaderSlider";
import LatestProducts from "../../Coponents/Product/LatestProducts";
function Home() {
  return (
    <Fragment>
      <TopNavbar />
      <HeaderSlider />
      <LatestProducts />
    </Fragment>
  );
}

export default Home;
