import React from 'react'
import { Link } from 'react-router-dom'

const Header=()=>{

	return(
		<div className='header'>
			<Link to='/'><img src="./logo.png" style={{maxHeight:'90%'}}/></Link>
		</div>
	)
}

export default Header;