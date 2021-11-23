import React from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

const BookModal=(props)=>{

	return(
		<Modal 
			show={props.isOpen} 
			onHide={props.toggleModal}
			centered
		>
			<Modal.Header><h5>{props.formState.id ? 'Edit Book' : 'Add Book'}</h5></Modal.Header>
			<Modal.Body>	
				<Form onSubmit={props.onSaveClick}>	
					<Form.Group className='mt-0' controlId="bookName">
						<Form.Label>Book Name</Form.Label>
						<Form.Control type="text" placeholder="Enter book name" name="bookName" value={props.formState.bookName} onChange={props.onChangeHandler} required/>
					</Form.Group>

					<Form.Group className='mt-3' controlId="bookAuthor">
						<Form.Label>Author</Form.Label>
						<Form.Control type="text" placeholder="Enter author name" name="author" value={props.formState.author} onChange={props.onChangeHandler} required/>
					</Form.Group>

					<Form.Group className='mt-3' controlId="bookQuantity">
						<Form.Label>Quantity</Form.Label>
						<Form.Control type="number" placeholder="Enter quantity" name="quantity" value={props.formState.quantity} onChange={props.onChangeHandler} required/>
					</Form.Group>

					<Form.Group className='mt-3' controlId="bookPrice">
						<Form.Label>Price</Form.Label>
						<Form.Control type="tel" placeholder="Enter price" name="price" value={props.formState.price} onChange={props.onChangeHandlerNum} required/>
					</Form.Group>

					<Form.Group className='mt-3' controlId="bookInvoice">
						<Form.Label>Invoice</Form.Label>
						<Form.Control type="file" name="invoice" onChange={props.onChangeHandlerFile} required/>
					</Form.Group>					

					<div className='text-end mt-3'><Button type="submit">Save Book</Button></div>
				</Form>
			</Modal.Body>
		</Modal>
	)
}

export default BookModal;