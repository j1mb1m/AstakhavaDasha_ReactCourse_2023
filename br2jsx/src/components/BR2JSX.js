import PropTypes from 'prop-types';
import './BR2JSX.css';

function BR2JSX(props) {

    function normalize(text) {
        const reg = /<(\s)*br(\s)*(\/)*>/g;
        text = text.replace(reg, '<br/>');
        return text;
    }

    let text = props.text;

    const sentences = normalize(text).split('<br/>');

    return (
        <div className='BR2JSX'>
            {sentences.map((str, index) => {
                return <span key={index}>{str} <br /></span>
            })}
        </div>
    );

}

BR2JSX.propTypes = {
    text: PropTypes.string.isRequired,
};

export default BR2JSX;
