import React from 'react';
import PropTypes from 'prop-types';

class FRUploader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            img: '',
            scaleWidth: 1,
            scaleHeight: 1
        }
    }

    changeHandle(e) {
        if(e.target.files !== undefined && e.target.files.length > 0) {
            let fr = new FileReader();
            fr.onload = (ev) => {
                this.setState({img: ev.target.result});
            }
            fr.readAsDataURL(e.target.files[0]);
        }
    }

    loadHandle(e) {
        this.setState({
            scaleWidth: e.target.width / e.target.naturalWidth,
            scaleHeight: e.target.height / e.target.naturalHeight
        });
        this.props.onChange(this.state.img);
    }

    renderFace(face, index) {
        let faceStyle = {
            height: face.height * this.state.scaleHeight,
            width: face.width * this.state.scaleWidth,
            left: face.left * this.state.scaleWidth,
            top: face.top * this.state.scaleHeight
        };

        return (
            <div key={index} className="face-box" style={faceStyle}>
                <p className="face-name">Face{index}</p>
            </div>
        );
    }

    render() {
        return(
            <div className="upload-image uploader">
                <img className="upload-image" src={this.state.img} alt={'Preview'} onLoad={(e) => this.loadHandle(e)} />
                <FileUploader onChange={(e) => this.changeHandle(e)}/>
                {this.props.faces.map( (e, index) => this.renderFace(e['face_location'], index) )}
            </div>
        );
    }
}

const FileUploader = props => {

    let fileRef = React.createRef();

    return(
        <div>
            <input type={'file'} ref={fileRef} onChange={props.onChange} style={{display: 'none'}} />
            <button onClick={() => fileRef.current.click()}>Upload</button>
        </div>
    );
}

FRUploader.propTypes = {
    onChange: PropTypes.func,
    faces: PropTypes.array
};

FRUploader.defaultProps = {
    onChange: () => {},
    faces: []
};

FileUploader.propTypes = {
    onChange: PropTypes.func
};

FileUploader.defaultProps = {
    onChange: () => {}
};

export default FRUploader;