import { Input, Tag, Tooltip } from "antd";
import React, { useRef, useState } from "react";
import "./Tags.scss";
const Tags = () => {
  const [tags, setTags] = useState([]);
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [editInputIndex, setEditInputIndex] = useState(-1);
  const [editInputValue, setEditInputValue] = useState("");
  const handleClose = (removedTag) => {
    const newTags = tags.filter((tag) => tag !== removedTag);
    setTags(newTags);
  };
  const inputText = useRef(null);
  const showInput = () => {
    setInputVisible(true);
    console.log("ok",window.document.getElementsByClassName('.tag-input'));
    // inputText.current.focus();
    
  };

  function handleInputChange(e) {
    const { value } = e.target;
    setInputValue(value);
  }

  function handleInputConfirm() {
    let newTags = [];

    if (inputValue && tags.indexOf(inputValue) === -1) {
      newTags = [...tags, inputValue];
      setTags(newTags);
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
    console.log([...tags]);
    const newTags = [...tags];
    newTags[editInputIndex] = editInputValue;
    setTags(newTags);
    setEditInputIndex(-1);
    setEditInputValue("");
    console.log(newTags);
  }
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
          <Tag className="edit-tag" key={tag} closable={index >= 0} onClose={() => handleClose(tag)}>
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
