import React from 'react';
import PropTypes from 'prop-types';
import './DoubleButton.css';



class DoubleButton extends React.Component {

    static propTypes = {
        caption1: PropTypes.string.isRequired,
        caption2: PropTypes.string.isRequired,
        cbPressed: PropTypes.func.isRequired,
    }

    constructor(props) {
        super();
        this.caption1 = props.caption1;
        this.caption2 = props.caption2;
        this.content = props.children;
    }

    caption1Clicked = () => {
        this.props.cbPressed(1);
    }

    caption2Clicked = () => {
        this.props.cbPressed(2);
    }

    render() {
        return <div className='DoubleButton'>
            <button type='submit' onClick={this.caption1Clicked}>{this.caption1}</button>
            <span>
                {this.content}
            </span>
            <button type='submit' onClick={this.caption2Clicked}>{this.caption2}</button>
        </div>
    }
}

export default DoubleButton;