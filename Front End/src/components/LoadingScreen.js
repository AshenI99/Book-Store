import React from 'react';
import Spinner from 'react-bootstrap/Spinner'

const LoadingScreen=(props)=>{

	const styles = {
		full:{
			backgroundColor:'rgba(255,255,255,0.98)', 
			width:'100%', 
			height:'105%', 
			position:'fixed', 
			zIndex:'1000',
			top:0,
			left:0
		},
		fullSpinner:{
			position:'fixed', 
			top:'45%', 
			left:'50%', 
			zIndex:'1000'
		},
		sub:{
			width:'100%', 
			height:'100%', 
			position:'absolute', 
			zIndex:'1000'
		},
		subSpinner:{
			position:'fixed', 
			top:'45%', 
			left:'48%', 
			zIndex:'1000'
		}
	}

	if(props.isLoading){
		return(
			<div style={props.sub ? styles.sub : styles.full}>
				<div style={props.sub ? styles.subSpinner : styles.fullSpinner}>
					<Spinner style={{color:'rgba(54, 48, 74,0.8)'}}  animation='border'>	
					{' '}						
					</Spinner>	
		        </div>	
	        </div>	
		)
	}else{
		return null
	}
}

export default LoadingScreen;