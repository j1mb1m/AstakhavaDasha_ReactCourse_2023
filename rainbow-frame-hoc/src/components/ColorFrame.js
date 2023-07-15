import PropTypes from 'prop-types';
import './ColorFrame.css';

function ColorFrame(props) {

    return (
        <div className='ColorFrame' style={{ borderColor: `${props.color}` }}>
            {props.children}
        </div>
    );

}

ColorFrame.propTypes = {
    color: PropTypes.string.isRequired,
};

export default ColorFrame;
