import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
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
	  	headerStyle:{width:'80px'},
	  	style:{maxWidth:80,textAlign:'center'},
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
    		striped
  			hover
  			condensed
     	/>
	)
}

export default BookTable;