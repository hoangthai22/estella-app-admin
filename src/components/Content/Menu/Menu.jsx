import { faArchive, faChevronRight, faClipboardList, faPlusCircle, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "./Menu.scss";
const Menu = (props) => {
  const changePage = (page) => {
    props.callbackFunc(page);
  };
  return (
    <div className="menu__wrapper">
      <div className="menu__menu">
        <div style={{ display: "flex", alignItems: "center" }}>
          <FontAwesomeIcon className="menu__icon" icon={faClipboardList} />
          <div>Đơn hàng</div>
        </div>
        <div style={{ fontSize: ".9rem", color: "#db7093", opacity: 0.8, display: "flex", alignItems: "center", gap: 5 }}>
          Xem lịch sử đơn hàng <FontAwesomeIcon style={{ fontSize: "1rem" }} icon={faChevronRight} />
        </div>
      </div>
      <div className="menu__menu" onClick={() => changePage("Product")}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <FontAwesomeIcon className="menu__icon" icon={faArchive} />
          <div>Sản phẩm của tôi</div>
        </div>
        <div style={{ fontSize: ".9rem", color: "#db7093", opacity: 0.8 }}>
          <FontAwesomeIcon style={{ fontSize: "1rem" }} icon={faChevronRight} />
        </div>
      </div>
      <div className="menu__menu" onClick={() => changePage("CreateProduct")}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <FontAwesomeIcon className="menu__icon" icon={faPlusCircle} />
          <div>Thêm sản phẩm mới</div>
        </div>
        <div style={{ fontSize: ".9rem", color: "#db7093", opacity: 0.8 }}>
          <FontAwesomeIcon style={{ fontSize: "1rem" }} icon={faChevronRight} />
        </div>
      </div>
      <div className="menu__menu">
        <div style={{ display: "flex", alignItems: "center" }}>
          <FontAwesomeIcon className="menu__icon" icon={faSignOutAlt} />
          <div>Đăng xuất</div>
        </div>
        <div style={{ fontSize: ".9rem", color: "#db7093", opacity: 0.8 }}>
          <FontAwesomeIcon style={{ fontSize: "1rem" }} icon={faChevronRight} />
        </div>
      </div>
    </div>
  );
};

export default Menu;
