import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { Button } from 'react-bootstrap'

import InvoiceModal from '../components/InvoiceModal'
import LoadingScreen from '../components/LoadingScreen'
import Header from '../components/Header'
import Footer from '../components/Footer'

import { getBookById } from '../services/BookService'

const baseURL =  process.env.REACT_APP_BACKEND_URL;

const SingleBook=(props)=>{
	
	let params = useParams();

	const [singleBook, setSingleBook] = useState({})
	const [invoicePath, setInvoicePath] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(()=>{
		async function fetchData() {
			try{
		      const Data = await getBookById(params.bookId);
		      setSingleBook(Data)
		      setIsLoading(false)
		    } catch(err){
		      console.log(err)
		      setIsLoading(false)
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
			<Header />
			<div className='text-center main-view'>
      			<div className='text-center pt-0 pb-4'><h2>{singleBook.bookName}</h2></div>

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
					<div className='mt-4'>
						<Button onClick={toggleModal} style={{width:'100%'}}>View Invoice</Button>
					</div>
				</div>

			</div>

			<InvoiceModal
				isOpen={invoicePath ? true : false}
				toggleModal={toggleModal}
				invoice={invoicePath}
			/>

			<LoadingScreen isLoading={isLoading} />
			<Footer />
		</>
	)
}

export default SingleBook;