import React from "react";
import "./Footer.scss";

const Footer = (props) => {
  const handleSubmit = () => {
    props.onSubmit();
  };
  return (
    <div className="footer__wrapper">
      <div className="footer__btn">
        <div>
          <button>Hủy</button>
        </div>
        <div style={{ opacity: props.isValid ? 1 : "0.5" }}>
          <button disabled={!props.isValid} onClick={handleSubmit}>Xác nhận</button>
        </div>
      </div>
    </div>
  );
};

export default Footer;
