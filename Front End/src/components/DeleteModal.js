import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const DeleteModal=(props)=>{

	return(
		<Modal show={props.isOpen} onHide={props.toggleModal}>
			<Modal.Header style={{color:'red'}}><h5>Delete Book</h5></Modal.Header>

			<Modal.Body>
				<div>Are you sure you want to delete this book?</div>
				<div className='text-end'>
					<Button className='me-2' onClick={props.deleteBook} variant='danger'>YES</Button>
					<Button onClick={props.toggleModal}>NO</Button>
				</div>
			</Modal.Body>
		</Modal>
	)
}

export default DeleteModal;
