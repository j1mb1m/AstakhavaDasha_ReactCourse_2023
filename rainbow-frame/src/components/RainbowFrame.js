import PropTypes from 'prop-types';
import ColorFrame from './ColorFrame';

function generateFrame(colors, content) {
    const color = colors.pop();
    if (colors.length > 0)
        return <ColorFrame color={color}>
            {generateFrame(colors, content)}
        </ColorFrame>;
    else
        return <ColorFrame color={color}>
            {content}
        </ColorFrame>;;
}

export const RainbowFrame = props => {
    const colors = [...props.colors];
    return generateFrame(colors, props.children);
};

RainbowFrame.propTypes = {
    colors: PropTypes.arrayOf(PropTypes.string.isRequired),
};

