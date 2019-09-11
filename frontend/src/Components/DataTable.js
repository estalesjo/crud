import React, { Component } from "react";
import ModalForm from "./ModalForm";
import Delete from "../images/trash.png";

class DataTable extends Component {
  deleteItem = id => {
    let confirmDelete = window.confirm("Delete message?");
    if (confirmDelete) {
      fetch("http://localhost:3000/crud", {
        method: "delete",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          id
        })
      })
        .then(response => response.json())
        .then(item => {
          this.props.deleteItemFromState(id);
        })
        .catch(err => console.log(err));
    }
  };

  render() {
    const items = this.props.items.map(item => {
      return (
        <div
          key={item.id}
          style={{
            background: "white",
            margin: "auto",
            marginBottom: "40px",
            width: "600px",
            border: "1px solid #ccc",
            padding: "20px"
          }}
        >
          <p style={{ color: "#b8b8b8", margin: "10px", float: "right" }}>
            Last updated: {item.date}
          </p>
          <p style={{ color: "#222", margin: "10px" }}>{item.message}</p>
          <p style={{ color: "#777", margin: "10px" }}>{item.author}</p>

          <div
            style={{
              float: "right",
              marginTop: "-10px",
              marginRight: "-100px"
            }}
          >
            <ModalForm
              buttonLabel="Edit"
              item={item}
              updateState={this.props.updateState}
            />
            <img
              style={{ width: "25px", marginTop: "-8px", marginLeft: "10px" }}
              src={Delete}
              alt="delete"
              onClick={() => this.deleteItem(item.id)}
            />
          </div>
        </div>
      );
    });
    return <div>{items}</div>;
  }
}

export default DataTable;
