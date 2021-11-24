import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { Button } from 'react-bootstrap'

import InvoiceModal from '../components/InvoiceModal'

import { getBookById } from '../services/BookService'

const baseURL =  process.env.REACT_APP_BACKEND_URL;

const SingleBook=(props)=>{
	
	let params = useParams();

	const [singleBook, setSingleBook] = useState({})
	const [invoicePath, setInvoicePath] = useState(false);

	useEffect(()=>{
		async function fetchData() {
			try{
		      const Data = await getBookById(params.bookId);
		      setSingleBook(Data)
		    } catch(err){
		      console.log(err)
		    }
		}
		fetchData();
	},[])

	const toggleModal=()=>{
		if(!invoicePath)
    		setInvoicePath(`${baseURL}books/invoice/${singleBook.invoicePath}`);
    	else
    		setInvoicePath();
  	}

	return(
		<>
			<div className='text-center'>
				<h5>{singleBook.bookName}</h5>

				<div className='detail-row'>
					<div>
						<span>Book Name: </span>
						<span>{singleBook.bookName}</span>
					</div>
					<div>
						<span>Author: </span>
						<span>{singleBook.author}</span>
					</div>
					<div>
						<span>Price: </span>
						<span>{singleBook.price}</span>
					</div>
					<div>
						<span>Quantity: </span>
						<span>{singleBook.quantity}</span>
					</div>
					<div>
						<Button onClick={toggleModal} style={{width:'100%'}}>View Invoice</Button>
					</div>
				</div>

			</div>

			<InvoiceModal
				isOpen={invoicePath ? true : false}
				toggleModal={toggleModal}
				invoice={invoicePath}
			/>
		</>
	)
}

export default SingleBook;