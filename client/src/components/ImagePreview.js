import React from 'react';
import PropTypes from 'prop-types';

function renderFacesBoxes() {
	// get faces
	let faces = this.props.facesData;
	// make the elements.
	return faces.map( (elem, index) => {
		let divStyle = {
			height: elem['face_location'].height * this.imageData.heightScale,
			width: elem['face_location'].width * this.imageData.widthScale,
			left: elem['face_location'].left * this.imageData.widthScale,
			top: elem['face_location'].top * this.imageData.heightScale
		};
		return(
			<div key={index} className={'face-detection-box'} style={divStyle}>
				<p className={'face-detection-text'}>Face {index}</p>
			</div>
		);
	});
}

function handleLoadImage(e) {
	// keep all information about the image.
	let img = e.target;
	this.imageData = {
		width: img.width,
		height: img.height,
		originalWidth: img.naturalWidth,
		originalHeight: img.naturalHeight,
		widthScale: img.width / img.naturalWidth,
		heightScale: img.height / img.naturalHeight
	};	
}

class ImagePreview extends React.Component {
	
	constructor(props) {
		// call super
		super(props);	
		// binds.
		this.renderFacesBoxes = renderFacesBoxes.bind(this);
		this.handleLoadImage = handleLoadImage.bind(this);
	}
	
	render() {
		return(
			<div className={this.props.className}>
				<img alt={'Preview'} className={this.props.className} src={this.props.src} onLoad={(e) => this.handleLoadImage(e)} />
				{this.renderFacesBoxes()}				
			</div>
		);
	}
	
}

ImagePreview.propTypes = {	
	className: PropTypes.string,
	src: PropTypes.string.isRequired,
	facesData: PropTypes.array
};

ImagePreview.defaultProps = {	
	className: 'image-preview',
	src: '',
	facesData: []
};

export default ImagePreview;