import { Modal } from "antd";
import React, { useState } from "react";
import "./style.scss";

export default function ModalDisalbe(props) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <>
      <button type="primary" onClick={showModal}>
        Ẩn
      </button>
      <Modal
        width={350}
        okText={"Xác nhận"}
        cancelText={"Hủy"}
        okButtonProps={{ borderRadius: 10 }}
        closable={false}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        style={{ textAlign: "center", borderRadius: 10 }}
      >
        <p style={{ fontSize: "0.9rem" }}>Vui lòng xác nhận bạn muốn ẩn sản phẩm này</p>
      </Modal>
    </>
  );
}
