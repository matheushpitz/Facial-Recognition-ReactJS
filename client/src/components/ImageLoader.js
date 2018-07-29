import React from 'react';
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
		this.state = {imageSrc: ''};
		
		this.handleChange = handleChange.bind(this);
	}
	
	render() {
		return(
			<div className={this.props.className}>
				<img className={'image-preview'} src={this.state.imageSrc} />
				<input className={'image-input-file'} type={'file'} onChange={e => this.handleChange(e)} />
			</div>
		);
	}
}

ImageLoader.propTypes = {
	onImageLoad: PropTypes.func.isRequired,
	className: PropTypes.string
};

ImageLoader.defaultProps = {
	onImageLoad: () => {return},
	className: 'image-loader'
};

export default ImageLoader;