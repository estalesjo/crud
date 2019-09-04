import React, { Component } from 'react';
import DataTable from './Components/DataTable';
import ModalForm from './Components/ModalForm';

export default class App extends Component {
    state = {
        items: []
    }
    componentDidMount(){
        this.getItems()
      }

    getItems() {
        fetch('http://localhost:3000/crud')
        .then(response => response.json())
        .then(items => this.setState({items}))
        .catch(err => console.log(err))
    }

    addItemToState = (item) => {
        this.setState(prevState => ({
            items: [...prevState.items, item]
        }))
    }

    updateState = (item) => {
        const index = this.state.items.findIndex(data => data.id === item.id);
        const newArray = [
            ...this.state.items.slice(0, index), 
            item,
            ...this.state.items.slice(index + 1)
        ]
        this.setState({ items: newArray })
    }

    deleteItemFromState = (id) => {
        const updatedItem = this.state.items.filter(item => item.id !== id);
        this.setState({ items: updatedItem })
    }

    render() {
        return (
            <div className="App">
                <h1>CRUD</h1>
                <ModalForm buttonLabel="Post a comment" addItemToState={this.addItemToState} />
                <DataTable items={this.state.items} updateState={this.updateState} deleteItemFromState={this.deleteItemFromState} />
            </div>
        )
    }
}

