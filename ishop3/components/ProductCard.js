import React from 'react';
import './ProductCard.css';
import PropTypes from 'prop-types';

class ProductCard extends React.Component {

    static propTypes = {
        item: PropTypes.shape({
            id: PropTypes.number.isRequired,
            title: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
            url: PropTypes.string.isRequired,
            price: PropTypes.number.isRequired,
            availableQuantity: PropTypes.number.isRequired,
        }),
        isEditForm: PropTypes.bool,
        cbCansel: PropTypes.func.isRequired,
        cbSave: PropTypes.func.isRequired,
    };

    canselOnClick = (event) => {
        event.preventDefault();
        event.stopPropagation();

        this.props.cbCansel();
    }

    saveChangesOnClick = (event) => {
        event.preventDefault();
        event.stopPropagation();

        this.props.cbSave(this.props.item);
    }

    render() {
        return this.props.isEditForm ?
            <div className='ProductCard'>
                <label>Name:
                    <input type='text' name='productTitle' defaultValue={this.props.item.title} />
                </label>
                <label className='ProductCardEdit_description'>Description:
                    <textarea type='text' name='productDescription' defaultValue={this.props.item.description} rows='5' />
                </label>
                <label>url:
                    <input type='url' name='productImage' defaultValue={this.props.item.url} />
                </label>
                <label>Price:
                    <input type='number' name='productPrice' defaultValue={this.props.item.price} min={0} />
                </label>
                <label>Count:
                    <input type='number' name='productCount' defaultValue={this.props.item.availableQuantity} min={1} />
                </label>
                <div className='ProductCard_buttons'>
                    <button onClick={this.saveChangesOnClick}>Save</button>
                    <button onClick={this.canselOnClick}>Cancel</button>
                </div>
            </div>
            : <div className='ProductCard'>
                <div className='ProductCard_title' >{this.props.item.title}</div>
                <div className='ProductCard_description' >{this.props.item.description}</div>
                <div className='ProductCard_price' >{`Price: ${this.props.item.price} руб.`}</div>
                <div className='ProductCard_count' >Count: {this.props.item.availableQuantity} шт.</div>
            </div>

    };

}

export default ProductCard;
