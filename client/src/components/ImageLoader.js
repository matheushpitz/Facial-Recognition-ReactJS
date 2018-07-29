import React from 'react';
import ImagePreview from './ImagePreview';
import {ImageDescriptor} from './ImageDescriptor';
import PropTypes from 'prop-types';

function handleChange(e) {
	let files = e.target.files;
	if(files !== undefined && files[0] !== undefined) {			
		let fr = new FileReader();
		fr.onload = (ev) => {			
			// Set the state
			this.setState({imageSrc: ev.target.result});
			// call the callback
			this.props.onImageLoad(ev.target.result);
		};
		fr.readAsDataURL(files[0]);				
	}
}

class ImageLoader extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {imageSrc: '/img/no-image.jpg'};
		
		this.handleChange = handleChange.bind(this);
	}
	
	render() {
		return(
			<div className={this.props.className}>
				<ImagePreview src={this.state.imageSrc} facesData={this.props.facesData} />
				<input className={'image-input-file'} type={'file'} onChange={e => this.handleChange(e)} />
				<ImageDescriptor facesData={this.props.facesData} />
			</div>
		);
	}
}

ImageLoader.propTypes = {
	onImageLoad: PropTypes.func.isRequired,
	className: PropTypes.string,
	facesData: PropTypes.array
};

ImageLoader.defaultProps = {
	onImageLoad: () => {return},
	className: 'image-loader',
	facesData: []
};

export default ImageLoader;