import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap'

import BookTable from '../components/BookTable'
import BookModal from '../components/BookModal'
import DeleteModal from '../components/DeleteModal'
import LoadingScreen from '../components/LoadingScreen'
import Header from '../components/Header'
import Footer from '../components/Footer'

import { getBooksList, saveNewBook, deleteBookById, updateBook } from '../services/BookService'

const numCheck = [1,2,3,4,5,6,7,8,9,'.',' '];

const Home=()=>{

  const [books, setBooks] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [formState, setFormState] = useState({
    bookName:'',
    author:'',
    quantity:'',
    price:''
  })
  const [deleteId, setDeleteId] = useState();
  const [isLoading, setIsLoading] = useState(true);


  useEffect(()=>{
  	async function fetchData() {
	    try{
	      const Data = await getBooksList();
	      setBooks(Data);
        setIsLoading(false);
	    } catch(err){
	      console.log(err);
        setIsLoading(false);
	    }
	  }
    fetchData();
  },[])

  const toggleModal=()=>{
    setIsOpen(!isOpen);
    setTimeout(()=>{
      setFormState({
        bookName:'',
        author:'',
        quantity:'',
        price:''
      });
    }, 50)
  }

  const onChangeHandler=(e)=>{
    const { name, value } = e.target;
    setFormState({
      ...formState, 
      [name]: value
    })
  }

  const onChangeHandlerNum=(e)=>{
    const { name, value } = e.target;
    if(value[value.length - 1] == 0 || numCheck.find((el)=> el == value[value.length - 1]) || !value){
      setFormState({
        ...formState, 
        [name]: value
      })
    }
  }

  const onChangeHandlerFile=(e)=>{
    const { files } = e.target;
      setFormState({
      ...formState,
      invoice: files[0]
    })
  }

  const onSaveClick= async(e)=>{
    toggleModal();
    e.preventDefault();
    setIsLoading(true)

    let data = new FormData();

    data.append('bookName', formState.bookName);
    data.append('author', formState.author);
    data.append('quantity', formState.quantity);
    data.append('price', formState.price);

    if(formState.invoice && formState.invoice.name)
      data.append('invoice', formState.invoice);

    if(formState.id){
      try{
        const Data = await updateBook(data, formState.id);

        let newData = JSON.parse(JSON.stringify(books));

        for(var i=0; i<newData.length; i++){
          if(newData[i].id === Data.id){
            newData[i] = Data;
          }
        }
        setBooks(newData);
        setFormState({
          bookName:'',
          author:'',
          quantity:'',
          price:''
        });
        setIsLoading(false)

      } catch(err){
        console.log(err)
        setIsLoading(false)
      }
    }
    else{
      try{
        const Data = await saveNewBook(data);
        
        setBooks(Data);
        setFormState({
          bookName:'',
          author:'',
          quantity:'',
          price:''
        });
        setIsLoading(false)

      } catch(err){
        console.log(err)
        setIsLoading(false)
      }
    }
  }

  const onEditClick=(item)=>{
    setFormState({
      bookName: item.bookName,
      author: item.author,
      quantity: item.quantity,
      price: item.price,
      invoice: item.invoicePath,
      id: item.id,
    })
    setIsOpen(true);
  }


  const onDeleteClick=(id)=>{
    setDeleteId(id);
  }

  const deleteBook=async()=>{
    setIsLoading(true)
    try{
      const Data = await deleteBookById(deleteId);
      
      let newData = JSON.parse(JSON.stringify(books));
      newData = newData.filter((el)=> el.id !== Data)
      setBooks(newData);
      setDeleteId();
      setIsLoading(false);

    } catch(err){
      console.log(err)
      setIsLoading(false);
    }
  }

  // console.log(books);

  return (
    <>
    <Header/>
    <div className="container main-view">

      <div className='text-center pt-0'><h2>Available Books</h2></div>

      <div className='text-end mt-0 mb-2'><Button onClick={toggleModal}>Add a new book</Button></div>
      
      <BookTable 
        books={books} 
        onEditClick={onEditClick}
        onDeleteClick={onDeleteClick}
      />
      
      <BookModal 
        isOpen={isOpen} 
        toggleModal={toggleModal} 
        onSaveClick={onSaveClick}
        onChangeHandler={onChangeHandler}
        onChangeHandlerNum={onChangeHandlerNum}
        onChangeHandlerFile={onChangeHandlerFile}
        formState={formState}
      />

      <DeleteModal
        isOpen={deleteId ? true : false}
        toggleModal={()=> setDeleteId()}
        deleteBook={deleteBook}
      />

      <LoadingScreen isLoading={isLoading} />

    </div>
    <Footer/>
    </>
  );
}

export default Home;