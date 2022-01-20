import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Input, Tag, Tooltip, Upload } from "antd";
import React, { useRef, useState } from "react";
import { useEffect } from "react/cjs/react.development";
import "./Tags.scss";
const Tags = (props) => {
  const [tags, setTags] = useState([]);
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [editInputIndex, setEditInputIndex] = useState(-1);
  const [editInputValue, setEditInputValue] = useState("");
  const [imgUrlColor, setimgUrlColor] = useState([]);
  const handleClose = (removedTag, removeUrl) => {
    const newTags = tags.filter((tag) => tag !== removedTag);
    const newUrl = imgUrlColor.filter((img) => img !== removeUrl);
    setTags(newTags);
    setimgUrlColor(newUrl)
    console.log({ newTags, newUrl });
    props.callbackFunc({ tags: newTags, imgSrc: newUrl });
  };
  const inputText = useRef(null);
  const showInput = () => {
    setInputVisible(true);
  };

  function handleInputChange(e) {
    const { value } = e.target;
    setInputValue(value);
  }

  function handleInputConfirm() {
    let newTags = [];
    console.log(editInputValue);
    if (inputValue && tags.indexOf(inputValue) === -1) {
      newTags = [...tags, inputValue];
      setTags(newTags);
      console.log({ newTags });

      if (props.mode === "Size") {
        props.callbackFunc(newTags);
      }
    } else {
      setTags([...tags]);
    }
    setInputVisible(false);
    setInputValue("");
  }

  function handleEditInputChange(e) {
    const { value } = e.target;
    setEditInputValue(value);
  }

  function handleEditInputConfirm() {
    const newTags = [...tags];
    newTags[editInputIndex] = editInputValue;
    setTags(newTags);
    setEditInputIndex(-1);
    setEditInputValue("");
  }

  const propsUpload = {
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    listType: "picture",
    beforeUpload(file) {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          const img = document.createElement("img");
          img.src = reader.result;
          let imgSrc = [...imgUrlColor, img.src];
          setimgUrlColor(imgSrc);
          props.callbackFunc({ tags, imgSrc });
          img.onload = () => {
            const canvas = document.createElement("canvas");
            canvas.width = img.naturalWidth;
            canvas.height = img.naturalHeight;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0);
            ctx.fillStyle = "red";
            ctx.textBaseline = "middle";
            ctx.font = "33px Arial";
            ctx.fillText("Ant Design", 20, 20);
            canvas.toBlob(resolve);
          };
        };
      });
    },
  };

  return (
    <div>
      {tags.map((tag, index) => {
        if (editInputIndex === index) {
          return (
            <Input
              ref={inputText}
              key={tag}
              size="small"
              className="tag-input"
              value={editInputValue}
              onChange={handleEditInputChange}
              onBlur={handleEditInputConfirm}
              onPressEnter={handleEditInputConfirm}
            />
          );
        }
        const isLongTag = tag.length > 20;
        const tagElem = (
          <>
            <Tag className="edit-tag" key={tag} closable={index >= 0} onClose={() => handleClose(tag, imgUrlColor[index])}>
              <span
                onDoubleClick={(e) => {
                  if (index !== 0) {
                    setEditInputIndex(index);
                    setEditInputValue(tag);
                    e.preventDefault();
                  }
                }}
              >
                {isLongTag ? `${tag.slice(0, 20)}...` : tag}
              </span>
            </Tag>
            {props.mode === "Color" && (
              <Upload {...propsUpload} maxCount={1}>
                <Button style={{ height: "36px" }}>
                  <FontAwesomeIcon className="menu__icon" icon={faUpload} /> Thêm ảnh
                </Button>
              </Upload>
            )}
          </>
        );
        return isLongTag ? (
          <Tooltip title={tag} key={tag}>
            {tagElem}
          </Tooltip>
        ) : (
          tagElem
        );
      })}
      {inputVisible && (
        <Input
          ref={inputText}
          type="text"
          size="small"
          className="tag-input"
          name="color"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputConfirm}
          onPressEnter={handleInputConfirm}
        />
      )}
      {!inputVisible && (
        <Tag className="site-tag-plus" onClick={showInput}>
          + Thêm
        </Tag>
      )}
    </div>
  );
};

export default Tags;
