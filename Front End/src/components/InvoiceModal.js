import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const InvoiceModal=(props)=>{

	return(
		<Modal show={props.isOpen} onHide={props.toggleModal}>
			<Modal.Header><h5>Invoice</h5></Modal.Header>

			<Modal.Body>
				<div className='mx-auto text-center'>
					<img src={props.invoice} style={{maxWidth:'100%', maxHeight:'65vh'}}/>
				</div>
				<div className='text-end mt-3'>
					<a href={props.invoice} className='me-2 btn-danger btn' variant='danger'>Download Invoice</a>
					<Button onClick={props.toggleModal}>Close</Button>
				</div>
			</Modal.Body>
		</Modal>
	)
}

export default InvoiceModal;
