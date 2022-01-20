import { faArrowLeft, faChevronRight, faListUl, faTag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Select, Upload } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { addProduct, getListCategory } from "../../../apis/apiCaller";
import Footer from "../../Footer/Footer";
import Tags from "../Tags/Tags";
import "./AddProduct.scss";

const { Option } = Select;

const AddProduct = (props) => {
  const changePage = (page) => {
    props.callbackFunc(page);
  };
  const [fileList, setFileList] = useState([]);
  const [category, setCategory] = useState("");
  const [listCategory, setListCategory] = useState([]);
  const [price, setPrice] = useState(0);
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [isValid, setisValid] = useState(false);
  const [color, setColor] = useState({});
  const [size, setSize] = useState([]);
  const inputPrice = useRef();

  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    getListCategory()
      .then((res) => {
        setListCategory(res?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    console.log({ color });
    console.log({ size });
    if (color.tags.length > 0 && color.imgSrc.length > 0 && size.length > 0 && description.length > 0 && productName.length > 0 && price > 0 && category.length > 0 && fileList.length > 0) {
      setisValid(true);
    } else {
      setisValid(false);
    }
  }, [description.length, productName.length, price, category.length, fileList.length, color.tags, color.imgSrc, size, color]);
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

  function handleChangeCategory(value) {
    setCategory(value);
  }
  function handleChangePrice(e) {
    setPrice(e.target.value);
  }
  function handleChangeName(e) {
    setProductName(e.target.value);
  }
  function handleChangeDes(e) {
    setDescription(e.target.value);
  }

  const onSubmit = () => {
    console.log({ size });
    let listImgDetail = [];
    for (let i = 0; i < fileList.length; i++) {
      listImgDetail.push(fileList[i].thumbUrl);
    }
    let categorySelected = listCategory.filter((item) => item.slug === category);
    let listColor = [];
    console.log({ color });
    color?.tags?.map((item, ind) => {
      listColor = [
        ...listColor,
        {
          color: item,
          imgTitle: color?.imgSrc[ind],
          listSize: size.map((i) => {
            return {
              sizeName: i,
              quantity: 100,
            };
          }),
        },
      ];
    });
    const data = {
      productName,
      productDescription: description,
      listImgDetail,
      category: { slug: categorySelected[0].slug, _id: categorySelected[0]._id, categoryName: categorySelected[0].categoryName },
      price: parseInt(price),
      size: listColor,
    };
    console.log(data);
    addProduct(data);
  };

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
          <input type="text" className="add__product__input" placeholder="Nhập tên sản phẩm" onChange={handleChangeName} />
        </div>
      </div>
      <div className="add__product__name">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span>Mô tả sản phẩm</span>
          <span>0/3000</span>
        </div>
        <div>
          <input type="text" className="add__product__input" placeholder="Nhập mô tả sản phẩm" onChange={handleChangeDes} />
        </div>
      </div>
      <div className="add__product__info">
        <div className="add__product__info__category">
          <div style={{ display: "flex", alignItems: "center" }}>
            <FontAwesomeIcon className="menu__icon" icon={faListUl} />
            <span>Danh mục</span>
          </div>
          <div style={{ fontSize: ".9rem", color: "#db7093", opacity: 0.8, display: "flex", alignItems: "center" }}>
            <Select style={{ width: 150, textAlign: "right" }} autoFocus={true} bordered={false} showArrow={false} onChange={handleChangeCategory}>
              {listCategory?.map((item) => {
                return (
                  <>
                    <Option value={item.slug} key={item._id}>
                      {item.categoryName}
                    </Option>
                  </>
                );
              })}
            </Select>
            <FontAwesomeIcon style={{ fontSize: "1rem" }} icon={faChevronRight} />
          </div>
        </div>

        <div className="add__product__info__category" onClick={() => inputPrice.current.focus()}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <FontAwesomeIcon className="menu__icon" icon={faTag} />
            <span>Giá</span>
          </div>
          <div style={{ fontSize: ".9rem", color: "#db7093", opacity: 0.8 }}>
            <input ref={inputPrice} type="number" className="add__product__input" onChange={handleChangePrice} />
          </div>
        </div>

        <div className="add__product__info__size">
          <div style={{ display: "flex", alignItems: "center" }}>
            <span>Màu sắc</span>
          </div>
        </div>
        <div style={{ backgroundColor: "#fff", padding: "0 12px 12px" }}>
          <Tags callbackFunc={(color) => setColor(color)} mode={"Color"} />
        </div>
        <div className="add__product__info__size">
          <div style={{ display: "flex", alignItems: "center" }}>
            <span>Kích cỡ</span>
          </div>
        </div>
        <div style={{ backgroundColor: "#fff", padding: "12px" }}>
          <Tags callbackFunc={(size) => setSize(size)} mode={"Size"} />
        </div>
      </div>
      <Footer onSubmit={onSubmit} isValid={isValid} />
    </div>
  );
};

export default AddProduct;
