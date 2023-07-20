import PropTypes from 'prop-types';
import './BR2JSX.css';

function BR2JSX(props) {

    const text = props.text;
    const sentences = text.split(/<br>|<br\s*\/>/i);

    return (
        <div className='BR2JSX'>
            {sentences.reduce((prev, curr, index) => { return <>{prev}{!!index && <br />} {curr}</> }, '')}
        </div >
    );

}

BR2JSX.propTypes = {
    text: PropTypes.string.isRequired,
};

export default BR2JSX;
