import React, { Component } from "react";
import tickAll from "./img/tick.svg";
import "./App.css";
import TodoItem from "./component/TodoItem";

class App extends Component {
  constructor() {
    super();
    this.state = {
      newItem: "",
      todoItems: [],
      status: 0,
    };

    this.inputElement = React.createRef();

    this.onKeyUp = this.onKeyUp.bind(this);
    this.onChange = this.onChange.bind(this);
    this.todoFilter = this.todoFilter.bind(this);
    this.doneAll = this.doneAll.bind(this);
    this.removeItems = this.removeItems.bind(this);
  }

  componentDidMount() {
    this.inputElement.current.focus();

    const todoList = sessionStorage.getItem("todoList");
    let todoTmp = JSON.parse(todoList);
    console.log(todoList);
    if (todoTmp) {
      this.setState({ todoItems: todoTmp });
    }
  }

  componentDidUpdate() {
    sessionStorage.setItem("todoList", JSON.stringify(this.state.todoItems));
  }

  onItemClicked(item) {
    console.log({ item });
    return () => {
      const isComplete = item.isComplete;
      const { todoItems } = this.state;
      const index = todoItems.indexOf(item);
      this.setState({
        todoItems: [
          ...todoItems.slice(0, index),
          {
            ...item,
            isComplete: !isComplete,
          },
          ...todoItems.slice(index + 1),
        ],
      });
    };
  }

  doneAll() {
    const { todoItems } = this.state;
  }

  onKeyUp(event) {
    let text = event.target.value;
    if (event.keyCode === 13) {
      //enter key;
      text = text.trim();
      if (!text) {
        return;
      }
      this.setState({
        newItem: "",
        todoItems: [
          { title: text, isComplete: false },
          ...this.state.todoItems,
        ],
      });
    }
  }

  onChange(event) {
    this.setState({
      newItem: event.target.value,
    });
  }

  todoFilter(number) {
    this.setState({
      status: number,
    });
  }

  todoCount() {
    const { todoItems } = this.state;
    let count = 0;
    let a = [];

    for (a of todoItems) {
      if (a.isComplete === false) count++;
    }
    return count;
  }

  clearCompleted() {
    const { todoItems } = this.state;
    // let filtered = Object.filter(todoItems, item => item.complete === false);
    let filtered = todoItems.filter((item) => item.isComplete === false);
    this.setState({
      ...todoItems.splice(0, todoItems.length),
      todoItems: filtered,
    });

    // console
    /*let a = [];
    let count = 0;
    for(a of todoItems){ 
      if(a.isComplete === true){
       this.setState({
         ...todoItems.splice(count,1)
       })
      }
      ++count;
    }*/
  }
  removeItems(item) {
    console.log({ item });
    const { todoItems } = this.state;
    const index = todoItems.indexOf(item);

    console.log({ index });
    todoItems.splice(index, 1);
    this.setState({
      todoItems: todoItems,
    });
  }

  render() {
    const { todoItems, newItem, status } = this.state;
    return (
      <div className="App">
        <div className="Header">
          <img src={tickAll} width={20} onClick={this.doneAll()} alt="..." />
          <input
            type="text"
            ref={this.inputElement}
            placeholder="Add a new item!"
            value={newItem}
            onChange={this.onChange}
            onKeyUp={this.onKeyUp}
          />
        </div>

        {todoItems.length === 0 && "Nothing here"}
        {status === 0 &&
          todoItems.map((item, index) => (
            <TodoItem
              key={index}
              item={item}
              handleClick={this.onItemClicked(item)} // handleClick is a prop
              handleDeleted={() => this.removeItems(item)}
            />
          ))}

        {status === 1 &&
          todoItems.map((item, index) => {
            if (item.isComplete === false)
              return (
                <TodoItem
                  key={index}
                  item={item}
                  handleClick={this.onItemClicked(item)} // handleClick is a prop
                  handleDeleted={() => this.removeItems(item)}
                />
              );
            return "";
          })}

        {status === 2 &&
          todoItems.map((item, index) => {
            if (item.isComplete === true)
              return (
                <TodoItem
                  key={index}
                  item={item}
                  handleClick={this.onItemClicked(item)} // handleClick is a prop
                  handleDeleted={() => this.removeItems(item)}
                />
              );
            return "";
          })}

        <div className="footer">
          <p>{this.todoCount()} item lefts</p>

          <button onClick={() => this.todoFilter(0)}>All</button>

          <button onClick={() => this.todoFilter(1)}>Active</button>

          <button onClick={() => this.todoFilter(2)}>Completed</button>

          <button onClick={() => this.clearCompleted()}>Clear Completed</button>
        </div>
      </div>
    );
  }
}

export default App;
