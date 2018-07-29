import React, { Component } from 'react';
import ImageLoader from './components/ImageLoader';
import Axios from 'axios';
import {SERVER_HOST} from './config/config';
import './App.css';

function handleImageLoader(img) {		
	this.axiosInstance.post('/', {image: img}).then((res) => {		
		this.setState({
			facesData: res.data.images[0].faces,
			loading: false
		});
	}).catch((err) => {
		alert('error');
	});

	this.setState({
		facesData: [],
		loading: true
	});
}

class App extends Component {
	
	constructor(props) {
		// call super constructor.
		super(props);
		// initialize state.
		this.state = {
			facesData: [],
			loading: false
		};
		
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
			<ImageLoader facesData={this.state.facesData} onImageLoad={img => this.handleImageLoader(img)} />
		);
	}		
}

export default App;
