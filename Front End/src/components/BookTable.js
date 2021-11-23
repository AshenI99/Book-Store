import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import { MdDelete } from 'react-icons/md'
import { AiFillEdit } from 'react-icons/ai'

const BookTable=(props)=>{

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
    				<span><AiFillEdit onClick={()=> props.onEditClick(row)}/></span>
    				<span><MdDelete onClick={()=> props.onDeleteClick(row.id)}/></span>
    			</div>
    		)
        }
	  }
	];


	return(
    	<BootstrapTable 
    		keyField='id' 
    		data={ props.books } 
    		columns={ columns } 
     	/>
	)
}

export default BookTable;