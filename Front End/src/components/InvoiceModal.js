import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Document, Page, pdfjs } from 'react-pdf';
import LoadingScreen from './LoadingScreen'

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const InvoiceModal=(props)=>{

	const [numPages, setNumPages] = useState();

	return(
		<Modal show={props.isOpen} onHide={props.toggleModal} size={(props.invoice && props.invoice.split(".").pop() === 'pdf') ? "lg" : "md"}>
			<Modal.Header><h5>Invoice</h5></Modal.Header>

			<Modal.Body>
				<div className='mx-auto text-center'>
					
					{(props.invoice && props.invoice.split(".").pop() !== 'pdf') ?
						<img src={props.invoice} style={{maxWidth:'100%', maxHeight:'65vh'}}/>
					:
						<Document
			                    file={props.invoice}
			                    onLoadSuccess={({ numPages })=>setNumPages(numPages)}
			                    className="pdf-viewer"
			                    loading={<LoadingScreen isLoading={true} sub={true}/>}
			                >
			                {Array.apply(null, Array(numPages))
			                .map((x, i)=>i+1)
			                .map(page => <Page pageNumber={page}/>)}
			            </Document>
			        }
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
