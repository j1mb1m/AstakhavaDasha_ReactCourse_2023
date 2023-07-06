import React from 'react';
import PropTypes from 'prop-types';

import ProductItem from './ProductItem';
import './ProductList.css';
import ProductCard from './ProductCard';

class ProductList extends React.Component {

    static propTypes = {
        goodsList: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.number.isRequired,
                title: PropTypes.string.isRequired,
                description: PropTypes.string.isRequired,
                url: PropTypes.string.isRequired,
                price: PropTypes.number.isRequired,
                availableQuantity: PropTypes.number,
            })
        )
    };

    state = {
        selectedProductID: null,
        isEditSelectedProduct: false,
        isModifySelectedProduct: false,
        productArray: this.props.goodsList,
    };

    selectProduct = (id) => {
        if (this.state.isModifySelectedProduct) return;

        console.log('выбран товар с ID ' + id);
        this.setState({ selectedProductID: id, isEditSelectedProduct: false });
    };

    editProduct = (id) => {
        if (this.state.isModifySelectedProduct) return;

        this.setState({ selectedProductID: id, isEditSelectedProduct: true });
    };

    removeProduct = (id) => {
        if (this.state.isModifySelectedProduct) return;

        if (confirm('Do you confirm the deletion?')) {
            console.log('удален товар с ID ' + id);
            var arr = this.state.productArray.filter((item) => item.id !== id);
            if (id === this.state.selectedProductID) {
                this.setState({ selectedProductID: null, productArray: arr });
            } else
                this.setState({ productArray: arr });
        }
    };

    canselProductCard = () => {
        this.setState({ isEditSelectedProduct: false, isModifySelectedProduct: false });
    }

    saveProductCard = (item) => {
        this.setState({ isEditSelectedProduct: false, isModifySelectedProduct: false });
    }

    render() {
        return <div className='ProductContainer'>
            <table className='ProductList'>
                <thead>
                    <tr>
                        <td className='ProductItem_url'>Image</td>
                        <td className='ProductItem_title'>Title</td>
                        <td className='ProductItem_description'>Description</td>
                        <td className='ProductItem_price'>Price</td>
                        <td className='ProductItem_availableQuantity'>Available</td>
                        <td className='ProductItem_control'>Control</td>
                    </tr>
                </thead>
                <tbody className='ProductList' >
                    {this.state.productArray.map(e =>
                        <ProductItem
                            key={e.id}
                            item={e}
                            cbSelect={this.selectProduct}
                            selectedProductID={this.state.selectedProductID}
                            cbRemove={this.removeProduct}
                            cbEdit={this.editProduct}
                        />
                    )}</tbody>
            </table>
            <button>New product</button>
            {
                this.state.selectedProductID != null ?
                    this.state.productArray.filter((item) => item.id === this.state.selectedProductID).map(e =>
                        <ProductCard
                            key={e.id}
                            item={e}
                            isEditForm={this.state.isEditSelectedProduct}
                            cbCansel={this.canselProductCard}
                            cbSave={this.saveProductCard}
                        />
                    ) : null
            }
        </div>

    };
}

export default ProductList;