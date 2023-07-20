import PropTypes from 'prop-types';
import './BR2JSX.css';

function BR2JSX(props) {

    const text = props.text;
    const sentences = text.split(/<br\s*\/?>/i);

    function join(originArray) {
        const array = [];
        originArray.forEach(function (str, index) {
            if (!!index)
                array.push(<br key={index} />);
            array.push(str);
        })
        return array;
    }

    return (
        <div className='BR2JSX'>
            {join(sentences).map(item => item)}
        </div>
    );
}
/* просто через reduce: {sentences.reduce((prev, curr, index) => { return <>{prev}{!!index && <br />}{curr} </> }, '')} */

BR2JSX.propTypes = {
    text: PropTypes.string.isRequired,
};

export default BR2JSX;
