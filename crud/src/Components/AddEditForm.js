import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

class AddEditForm extends React.Component {
    state = {
       id: 0,
        message: '',
        author: ''
    }

    onChange = e => {
        this.setState({[e.target.name]: e.target.value})
    }

    submitAdd = e => {
        e.preventDefault();

        fetch('http://localhost:3000/crud', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: this.state.id,
                message: this.state.message,
                author: this.state.author
            })
        })
        .then(response => response.json())
        .then(item => {
            this.props.addItemToState(item);
            this.props.toggle();       
        })
        .catch(err => console.log(err));
    }

    submitEdit = e => {
        e.preventDefault();
        fetch('http://localhost:3000/crud', {
            method: 'put',
            headers: {
                'Content-type' : 'application/json'
            },
            body: JSON.stringify({
                id: this.state.id,
                message: this.state.message,
                author: this.state.author
            })
        })
        .then(response => response.json())
        .then(item => {
            this.props.updateState(item);
            this.props.toggle();       
        })
        .catch(err => console.log(err));
    }

    componentDidMount() {
        if(this.props.item) {
            const { id, message, author } = this.props.item;
            this.setState({ id, message, author });
        }
    }


    render() {
        return(
        <Form onSubmit={this.props.item ? this.submitEdit : this.submitAdd}>
            <FormGroup style={{margin: '20px'}}>
                <Label for="author">Name: </Label>
                <Input required type="text" name="author" id="author" onChange={this.onChange} value={this.state.author === null ? '' : this.state.author} />
            </FormGroup>
            <FormGroup style={{margin: '20px'}}>
                <Label for="message">Comment: </Label>
                <Input required type="textarea" name="message" id="message" onChange={this.onChange} value={this.state.message === null ? '' : this.state.message}  />
            </FormGroup>
        
            <Button style={{float: 'right', margin: '10px' }}>Submit</Button>
        </Form>
        );
    }
}

export default AddEditForm;