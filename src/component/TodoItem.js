import React, { Component } from "react";
import PropTypes from "prop-types";

import "./TodoItem.css";
import classNames from "classnames";
import checkImg from "../img/check.svg";
import doneImg from "../img/done.svg";

class TodoItem extends Component {
  render() {
    const { item, handleClick, handleDeleted } = this.props;
    let url = checkImg;
    if (item.isComplete) {
      url = doneImg;
    }

    return (
      <div
        className={classNames("TodoItem", { "TodoItem-done": item.isComplete })}
      >
        <img src={url} width={32} onClick={handleClick} alt="..." />
        <p>{item.title}</p>
        <button onClick={handleDeleted}>x</button>
      </div>
    );
  }
}

TodoItem.propTypes = {
  item: PropTypes.shape({
    isComplete: PropTypes.bool,
    title: PropTypes.string,
  }),
  onClick: PropTypes.func,
};

export default TodoItem;
