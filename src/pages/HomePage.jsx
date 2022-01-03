import React, { useState } from "react";
import AddProduct from "../components/Content/AddProduct/AddProduct";
import Menu from "../components/Content/Menu/Menu";
import Products from "../components/Content/Products/Products";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import ModalDisalbe from "../components/Modal/ModalDisalbe";
import "./main.scss";

function HomePage(props) {
  const [currentPage, setCurrentPage] = useState();

  const changeCurrentPage = (childData) => {
    setCurrentPage(childData);
  };

  const result = () => {
    switch (currentPage) {
      case "Product":
        return <Products callbackFunc={changeCurrentPage} />;
      case "Home":
        return (
          <div>
            <Header />
            <Menu callbackFunc={changeCurrentPage} />
          </div>
        );
      case "CreateProduct":
        return (
          <div>
            <AddProduct callbackFunc={changeCurrentPage} />
          </div>
        );
      default:
        return (
          <div>
            <Header />
            <Menu callbackFunc={changeCurrentPage} />
          </div>
        );
    }
  };

  return (
    <div>
      <div className="content">{result()}</div>
    </div>
  );
}

export default HomePage;
