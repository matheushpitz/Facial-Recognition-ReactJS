import React from 'react';
import PropTypes from 'prop-types';

class FRUploader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {img: ''}
    }

    render() {
        return(
            <div>
                <ImagePreview src={this.state.img} />
                <FileUploader onChange={(e) => this.changeHandle(e)}/>
            </div>
        );
    }

    changeHandle(e) {
        if(e.target.files !== undefined && e.target.files.length > 0) {
            let fr = new FileReader();
            fr.onload = (ev) => {
                this.setState({img: ev.target.result});
                this.props.onChange(ev.target.result);
            }
            fr.readAsDataURL(e.target.files[0]);
        }
    }
}

const ImagePreview = props => {
    return(
        <img src={props.src} alt={'Preview'} />
    );
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
    onChange: PropTypes.func
};

FRUploader.defaultProps = {
    onChange: () => {}
};

ImagePreview.propTypes = {
    src: PropTypes.string
};

ImagePreview.defaultProps = {
    src: ''
};

FileUploader.propTypes = {
    onChange: PropTypes.func
};

FileUploader.defaultProps = {
    onChange: () => {}
};

export default FRUploader;