import React from 'react';
import PropTypes from 'prop-types';

export const ImageDescriptor = (props) => {
	// make the elements.
	let descriptions = props.facesData.map((elem, index) => {
		return(			
			<ul key={index} className="collection with-header">
				<li className="collection-header">Face {index}</li>				
				<li className="collection-item">Gender: {elem.gender.gender}</li>
				<li className="collection-item">Probability: {Math.floor(elem.gender.score * 100)}%</li>				
				<li className="collection-item">Age: between {elem.age.min} and {elem.age.max}</li>
				<li className="collection-item">Probability: {Math.floor(elem.age.score * 100)}%</li>
			</ul>							
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