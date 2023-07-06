import React from 'react';
import './ProductItem.css';
import PropTypes from 'prop-types';

class ProductItem extends React.Component {

    static propTypes = {
        item: PropTypes.shape({
            id: PropTypes.number.isRequired,
            title: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
            url: PropTypes.string.isRequired,
            price: PropTypes.number.isRequired,
            availableQuantity: PropTypes.number.isRequired,

        }),
        selectedProductID: PropTypes.number,
        cbSelect: PropTypes.func.isRequired,
        cbRemove: PropTypes.func.isRequired,
        cbEdit: PropTypes.func.isRequired,
    };

    productItemOnClick = (event) => {
        event.preventDefault();
        event.stopPropagation();

        this.props.cbSelect(this.props.item.id);
    };

    deleteOnClick = (event) => {
        event.preventDefault();
        event.stopPropagation();

        this.props.cbRemove(this.props.item.id);
    };

    editOnClick = (event) => {
        event.preventDefault();
        event.stopPropagation();

        /*         this.props.cbSelect(this.props.item.id); */
        this.props.cbEdit(this.props.item.id);
    };

    render() {
        return <tr
            className={`ProductItem${(this.props.selectedProductID === this.props.item.id) ? ' SelectedRow' : ''}`}
            key={this.props.item.id}
            onClick={this.productItemOnClick}>

            <td className='ProductItem_url'><img src={this.props.item.url} alt={this.props.item.title}></img></td>
            <td className='ProductItem_title'>{this.props.item.title}</td>
            <td className='ProductItem_description'>{this.props.item.description}</td>
            <td className='ProductItem_price'>{`${this.props.item.price} руб.`}</td>
            <td className='ProductItem_availableQuantity'>{this.props.item.availableQuantity} шт.</td>
            <td className='ProductItem_control'>
                <button onClick={this.editOnClick}>Edit</button>
                <button onClick={this.deleteOnClick}>Delete</button>
            </td>
        </tr>
    };

}

export default ProductItem;
