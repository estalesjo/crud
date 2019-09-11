import React, { Component } from 'react';
import { Modal, ModalHeader, Button } from 'reactstrap'
import AddEditForm from './AddEditForm'
import Edit from '../images/edit.png'

class ModalForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modal: false
        };
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }))
    }

    render () {

        const closeBtn = <button className="close" onClick={this.toggle}>&times;</button>

        const label = this.props.buttonLabel;

        let button = ''
        let title = ''

        if(label === 'Edit'){
            button = <img
                   src={Edit}
                   alt="edit"
                    onClick={this.toggle}
                    style={{float: "left", width: '20px'}}
                    />
            title = 'Edit'

        } else {
            button = <Button onClick={this.toggle} style={{ marginBottom: '30px'}}>{label}</Button>
            title = 'Post a new comment'
      }

       return (
           <div style={{margin: 'auto', width: '150px'}}>
               {button}
               <Modal isOpen={this.state.modal} toggle={this.toggle}>
                <ModalHeader toggle={this.toggle} close={closeBtn}>{title}</ModalHeader>
                
                <AddEditForm 
                        addItemToState={this.props.addItemToState}
                        updateState={this.props.updateState}
                        toggle={this.toggle}
                        item={this.props.item}
                />
               </Modal>
           </div>


       )
    }
}

export default ModalForm;