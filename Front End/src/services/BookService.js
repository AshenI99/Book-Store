import axios from 'axios';

const baseURL =  process.env.REACT_APP_BACKEND_URL;


export const getBooksList=()=>{

	return new Promise((resolve, reject) => {
		axios.get(`${baseURL}books`)
			.then((data)=>{
				resolve(data.data);
			})
			.catch((e)=> reject(e))
	})
} 


export const saveBook=()=>{

	return new Promise((resolve, reject) => {
		axios.post(`${baseURL}books`)
			.then((data)=>{
				resolve(data.data);
			})
			.catch((e)=> reject(e))
	})
} 


export const deleteBookById=(id)=>{

	return new Promise((resolve, reject) => {
		axios.delete(`${baseURL}books/${id}`)
			.then((data)=>{
				resolve(data.data);
			})
			.catch((e)=> reject(e))
	})
} 