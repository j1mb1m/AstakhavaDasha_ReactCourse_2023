import PropTypes from 'prop-types';
import './RainbowFrame.css';

function generateFrame(colors, content) {

    let result = colors.reduce((prev, curr) => {
        return <div className='RainbowFrame' style={{ borderColor: `${curr}` }} children={prev}></div>
    }, content);

    return result;
}

export const RainbowFrame = props => {
    return generateFrame([...props.colors], props.children);
};

RainbowFrame.propTypes = {
    colors: PropTypes.arrayOf(PropTypes.string.isRequired),
};

