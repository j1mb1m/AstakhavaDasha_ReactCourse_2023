import React from 'react';
import ColorFrame from './ColorFrame';

import './WithRainbowFrame.css';

function withRainbowFrame(colors) {

    return function (Comp) {

        function run(props) {

            return <div className='WithRainbowFrame'>{generateFrame([...colors])}</div>;

            function generateFrame(temp_colors) {
                const color = temp_colors.pop();

                if (!temp_colors.length)
                    return <ColorFrame color={color}>
                        <Comp {...props}></Comp>
                    </ColorFrame>

                return <ColorFrame color={color}>
                    {generateFrame(temp_colors)}
                </ColorFrame>
            }
        }

        return props => (run(props));
    };
};

export { withRainbowFrame };