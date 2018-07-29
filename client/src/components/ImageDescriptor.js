import React from 'react';
import PropTypes from 'prop-types';

export const ImageDescriptor = (props) => {
	
	let descriptions = props.facesData.map((elem, index) => {
		return(
			<div>
				<h2>Face {index}</h2>
				<h3>Gender</h3>
				<p>{elem.gender.gender}</p>
				<p>{Math.floor(elem.gender.score * 100)}%</p>
				<h3>Age</h3>
				<p>Between {elem.age.min} and {elem.age.max}</p>
				<p>{Math.floor(elem.age.score * 100)}%</p>
			</div>
		);
	});
	
	return(
		<div className={props.className}>
			{descriptions}
		</div>
	);
}

ImageDescriptor.propTypes = {	
	className: PropTypes.string,	
	facesData: PropTypes.array
};

ImageDescriptor.defaultProps = {	
	className: 'image-descriptor',	
	facesData: []
}; 