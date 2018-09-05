import React, { Component } from 'react';
import ImageLoader from './components/ImageLoader';
import Axios from 'axios';
import {SERVER_HOST} from './config/config';
import FRUploader from './components/FRUploader';
import './App.css';

function handleImageLoader(img) {	
	// call axios.
	this.axiosInstance.post('/', {image: img}).then((res) => {	
		// set state when server responses.
		this.setState({
			facesData: res.data.images[0].faces,
			loading: false
		});
	}).catch((err) => {
		alert('error');
	});

	// Remove all faces and enable loading.
	this.setState({
		facesData: [],
		loading: true
	});
}

function renderLoading() {
	if(this.state.loading) {
		return(
			<div className={'div-loader'}>
				<div className="loader"></div>
			</div>
		);
	}
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
		this.renderLoading = renderLoading.bind(this);
	}
	
	render() {
		return (
			<div>
                <FRUploader />
				{this.renderLoading()}
				<ImageLoader facesData={this.state.facesData} onImageLoad={img => this.handleImageLoader(img)} />
			</div>
		);
	}		
}

export default App;
