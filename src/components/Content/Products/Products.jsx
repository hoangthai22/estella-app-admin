import { faArrowLeft, faLayerGroup } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { useState } from "react/cjs/react.development";
import { getListProducts } from "../../../apis/apiCaller";
import ModalDisalbe from "../../Modal/ModalDisalbe";
import "./Products.scss";
const Products = (props) => {
  const changePage = (page) => {
    props.callbackFunc(page);
  };
  const [listProducts, setListProducts] = useState([]);
  useEffect(() => {
    getListProducts()
      .then((res) => {
        setListProducts(res?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const getQuantity = (size) => {
    let total = 0;
    size.map((list) => {
      list.listSize.map((i) => {
        total = i.quantity + total;
      });
    });
    return total;
  };

  return (
    <div className="products__wrapper">
      <div className="product__title">
        <div className="product__back">
          <FontAwesomeIcon className="menu__icon" icon={faArrowLeft} onClick={() => changePage("Home")} />
        </div>
        <span>Sản phẩm của tôi</span>
      </div>
      <div className="product__list">
        {listProducts?.map((item) => {
          return (
            <div className="product__item" key={item._id}>
              <div className="product__item__container">
                <div className="product__img__wrapper">
                  <img src={item.productImg} alt="" />
                </div>
                <div className="product__item__title">
                  <span>{item.productName}</span>
                  <span>{item.price}.000 ₫</span>
                </div>
              </div>
              <div className="product__info">
                <div>
                  <FontAwesomeIcon className="product__info__icon__quantity" icon={faLayerGroup} />
                  <span>Kho hàng {getQuantity(item.size)}</span>
                </div>
                <div className="product__btn">
                  <ModalDisalbe />
                  <button>Sửa</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Products;
