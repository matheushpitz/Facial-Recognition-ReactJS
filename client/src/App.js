import React, { Component } from 'react';
import Axios from 'axios';
import {SERVER_HOST} from './config/config';
import FRUploader from './components/FRUploader';
import FRData from './components/FRData';
import './App.css';

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
	}

    handleImageLoader(img) {
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
	
	render() {
		return (
			<div className="app">
                <FRUploader faces={this.state.facesData} loading={this.state.loading} onChange={e => this.handleImageLoader(e)} />
				<FRData faces={this.state.facesData}/>
			</div>
		);
	}		
}

export default App;
