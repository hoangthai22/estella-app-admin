import { faArrowLeft, faChevronRight, faListUl, faTag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Select, Tag, Upload } from "antd";
import React, { useState } from "react";
import Tags from "../Tags/Tags";
import "./AddProduct.scss";

const { Option } = Select;

const AddProduct = (props) => {
  const changePage = (page) => {
    props.callbackFunc(page);
  };
  const [fileList, setFileList] = useState([]);
  const [category, setCategory] = useState("");


  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
  };

  function handleChange(value) {
    console.log(`selected ${value}`);
  }

  return (
    <div className="add__product__wrapper">
      <div className="add__product__title">
        <div className="product__back">
          <FontAwesomeIcon className="menu__icon" icon={faArrowLeft} onClick={() => changePage("Home")} />
        </div>
        <span>Thêm sản phẩm</span>
      </div>
      <div className="add__product__img">
        <Upload action="https://www.mocky.io/v2/5cc8019d300000980a055e76" listType="picture-card" fileList={fileList} onChange={onChange} onPreview={onPreview}>
          {fileList.length < 5 && "+ Thêm ảnh"}
        </Upload>
      </div>
      <div className="add__product__name">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span>Tên sản phẩm</span>
          <span>0/120</span>
        </div>
        <div>
          <input type="text" className="add__product__input" placeholder="Nhập tên sản phẩm" />
        </div>
      </div>
      <div className="add__product__name">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span>Mô tả sản phẩm</span>
          <span>0/3000</span>
        </div>
        <div>
          <input type="text" className="add__product__input" placeholder="Nhập mô tả sản phẩm" />
        </div>
      </div>
      <div className="add__product__info">
        <div className="add__product__info__category">
          <div style={{ display: "flex", alignItems: "center" }}>
            <FontAwesomeIcon className="menu__icon" icon={faListUl} />
            <span>Danh mục</span>
          </div>
          <div style={{ fontSize: ".9rem", color: "#db7093", opacity: 0.8, display: "flex", alignItems: "center" }}>
            <Select style={{ width: 150, textAlign: "right" }} autoFocus={true} bordered={false} showArrow={false} onChange={handleChange}>
              <Option value="cao-got">Giày cao gót</Option>
              <Option value="sneaker">Giày sneaker</Option>
              <Option value="Sandal">Giày Sandal</Option>
            </Select>
            <FontAwesomeIcon style={{ fontSize: "1rem" }} icon={faChevronRight} />
          </div>
        </div>

        <div className="add__product__info__category">
          <div style={{ display: "flex", alignItems: "center" }}>
            <FontAwesomeIcon className="menu__icon" icon={faTag} />
            <span>Giá</span>
          </div>
          <div style={{ fontSize: ".9rem", color: "#db7093", opacity: 0.8 }}>
            <input type="number" className="add__product__input" />
          </div>
        </div>

        <div className="add__product__info__size">
          <div style={{ display: "flex", alignItems: "center" }}>
            <span>Màu sắc</span>
          </div>
        </div>
        <div style={{ backgroundColor: "#fff", padding: "12px" }}>
          <Tags/>
        </div>

        <div className="add__product__info__size">
          <div style={{ display: "flex", alignItems: "center" }}>
            <span>Kích cỡ</span>
          </div>
        </div>
        <div style={{ backgroundColor: "#fff", padding: "12px" }}>
          <Tags/>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
