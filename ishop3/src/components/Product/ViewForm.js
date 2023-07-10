import React from 'react';
import './ViewForm.css';
import PropTypes from 'prop-types';

class ViewForm extends React.Component {

    static propTypes = {
        item: PropTypes.shape({
            id: PropTypes.number.isRequired,
            title: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
            url: PropTypes.string.isRequired,
            price: PropTypes.number.isRequired,
            availableQuantity: PropTypes.number.isRequired,
        }),
    };


    render() {
        return <div className='ProductViewingForm'>
                <div className='ProductViewingForm_title' >{this.props.item.title}</div>
                <div className='ProductViewingForm_description' >{this.props.item.description}</div>
                <div className='ProductViewingForm_price' >{`Price: ${this.props.item.price} руб.`}</div>
                <div className='ProductViewingForm_count' >Count: {this.props.item.availableQuantity} шт.</div>
            </div>
    };

}

export default ViewForm;
