import React from 'react';


import './WithRainbowFrame.css';

function withRainbowFrame(colors) {

    return function (Comp) {

        function run(props) {

            return <div className='WithRainbowFrame'>{generateFrame([...colors])}</div>;

            function generateFrame(colors) {

                let result = colors.reduce((prev, curr) => {
                    return <div className='RainbowFrame' style={{ borderColor: `${curr}` }} children={prev}></div>
                }, <Comp {...props}></Comp>);

                return result;
            }
        }

        return props => (run(props));
    };
};

export { withRainbowFrame };