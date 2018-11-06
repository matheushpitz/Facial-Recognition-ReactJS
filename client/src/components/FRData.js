import React from 'react';
import PropTypes from 'prop-types';

const FRData = props => {
    if(props.faces.length < 1)
        return (<div/>);

    return(
        <table className="face-table">
            <thead>
                <tr>
                    <th>Name</th>                    
                    <th>Age</th>
					<th>Gender</th>
                </tr>
            </thead>
            <tbody>
                {props.faces.map( (e, index) => rowRender(e, index) )}
            </tbody>
        </table>
    );
}

const rowRender = (face, index) => {
    return (
        <tr key={index}>
            <td>Face{index}</td>
            <td>{face.age.min} - {face.age.max} ({Math.round( face.age.score * 100 )}%)</td>
            <td>{face.gender.gender} ({Math.round( face.gender.score * 100 )}%)</td>
        </tr>
    );
}

FRData.propTypes = {
    faces: PropTypes.array
};

FRData.defaultProps = {
    faces: []
};

export default FRData;