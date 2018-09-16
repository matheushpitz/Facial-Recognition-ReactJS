import React, { Component } from 'react';
import ImageLoader from './components/ImageLoader';
import Axios from 'axios';
import {SERVER_HOST} from './config/config';
import FRUploader from './components/FRUploader';
import './App.css';

class App extends Component {
	
	constructor(props) {
		// call super constructor.
		super(props);
		// initialize state.
		this.state = {
			facesData: []
		};
		
		// Create a instance of Axios.
		this.axiosInstance = Axios.create({
			baseURL: SERVER_HOST,
			headers: {'Content-Type': 'application/json'}
		});
	}

    handleImageLoader(img) {
        // call axios.
        this.axiosInstance.post('/', {image: img}).then((res) => {
            // set state when server responses.
            this.setState({
                facesData: res.data.images[0].faces
            });
        }).catch((err) => {
            alert('error');
        });

        // Remove all faces and enable loading.
        this.setState({
            facesData: []
        });
    }
	
	render() {
		return (
			<div className="app">
                <FRUploader faces={this.state.facesData} onChange={e => this.handleImageLoader(e)} />
			</div>
		);
	}		
}

export default App;
