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


export const saveNewBook=(data)=>{

	return new Promise((resolve, reject) => {
		axios.post(`${baseURL}books`, data)
			.then((data)=>{
				resolve(data.data);
			})
			.catch((e)=> reject(e))
	})
} 

export const updateBook=(data, id)=>{

	return new Promise((resolve, reject) => {
		axios.put(`${baseURL}books/${id}`, data)
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