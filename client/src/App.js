import React, { Component } from 'react';
import ImageLoader from './components/ImageLoader';
import Axios from 'axios';
import {SERVER_HOST} from './config/config';
import './App.css';

function handleImageLoader(img) {		
	this.axiosInstance.post('/', {image: img}).then((res) => {
		alert(JSON.stringify(res));
	}).catch((err) => {
		alert('error');
	});	
}

class App extends Component {
	
	constructor(props) {
		// call super constructor.
		super(props);
		// initialize state.
		this.state = {};
		
		// Create a instance of Axios.
		this.axiosInstance = Axios.create({
			baseURL: SERVER_HOST,
			headers: {'Content-Type': 'application/json'}
		});
		// Bind functions.
		this.handleImageLoader = handleImageLoader.bind(this);
	}
	
	render() {
		return (
			<ImageLoader onImageLoad={img => this.handleImageLoader(img)} />
		);
	}		
}

export default App;
