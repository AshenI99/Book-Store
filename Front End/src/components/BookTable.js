import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { MdDelete } from 'react-icons/md'
import { AiFillEdit } from 'react-icons/ai'
import { useNavigate } from "react-router-dom";

const BookTable=(props)=>{

	const navigate = useNavigate();

	const columns = [
	  {
	    dataField: 'bookName',
	    text: 'Book Name'
	  },{
	    dataField: 'author',
	    text: 'Author'
	  },{
	    dataField: 'quantity',
	    text: 'Quantity'
	  },{
	    dataField: 'price',
	    text: 'Price'
	  },{
	  	dataField:'actions',
	  	text:'Actions',
	  	headerStyle:{width:'110px'},
	  	style:{maxWidth:110,textAlign:'center'},
	  	formatter: (rowContent, row) => {
    		return (
    			<div className='text-primary icons'>
    				<span title="Edit Book" onClick={()=> props.onEditClick(row)}><AiFillEdit /></span>
    				<span title="Delete Book" onClick={()=> props.onDeleteClick(row.id)}><MdDelete/></span>
    			</div>
    		)
        }
	  }
	];

	const options = {
	  pageStartIndex: 1,
	  alwaysShowAllBtns: true, // Always show next and previous button
	  withFirstAndLast: false, // Hide the going to First and Last page button
	  hideSizePerPage: true, // Hide the sizePerPage dropdown always
	  hidePageListOnlyOnePage: true, // Hide the pagination list when only one page
	  firstPageText: 'First',
	  prePageText: 'Back',
	  nextPageText: 'Next',
	  lastPageText: 'Last',
	  nextPageTitle: 'First page',
	  prePageTitle: 'Pre page',
	  firstPageTitle: 'Next page',
	  lastPageTitle: 'Last page',
	  showTotal: false,
	  disablePageTitle: true,
	  sizePerPage:5
	};

	const rowEvents = {
	  onClick: (e, row, rowIndex) => {
	  	if(!e.target.children.length && e.target.nodeName !== 'path'){
	    	navigate(`/${row.id}`)
	  	}
	  }
	};

	return(
    	<BootstrapTable 
    		keyField='id' 
    		data={ props.books } 
    		columns={ columns } 
    		rowEvents={ rowEvents }
  			bordered={ false }
  			pagination={ paginationFactory(options) }
     	/>
	)
}

export default BookTable;