import React from 'react';
import PropTypes from 'prop-types';

import ProductItem from './ProductItem';
import './ProductList.css';
import EditingForm from './Product/EditingForm'
import ViewForm from './Product/ViewForm';

import { FormStatus } from '../enums/form-status'

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
        formStatus: FormStatus.VIEW,
        isModifySelectedProduct: false,
        productArray: this.props.goodsList,
    };

    scrollTarget = React.createRef();

    selectProduct = (id) => {
        if (this.state.isModifySelectedProduct) return;

        console.log('выбран товар с ID ' + id);
        this.setState({ selectedProductID: id, formStatus: FormStatus.VIEW });
    };

    editProduct = (id) => {
        if (this.state.isModifySelectedProduct) return;

        this.setState({ selectedProductID: id, formStatus: FormStatus.EDIT });
    };

    removeProduct = (id) => {
        if (this.state.isModifySelectedProduct) return;

        if (window.confirm('Do you confirm the deletion?')) {
            console.log('удален товар с ID ' + id);
            const arr = this.state.productArray.filter((item) => item.id !== id);
            if (id === this.state.selectedProductID) {
                this.setState({ selectedProductID: null, productArray: arr });
            } else
                this.setState({ productArray: arr });
        }
    };

    canselProductCard = () => {
        this.setState({ isModifySelectedProduct: false, formStatus: FormStatus.VIEW });
    }

    saveProductCard = (item) => {
        const arr = this.state.productArray;
        if (this.state.formStatus === FormStatus.NEW) {
            let max_id = arr.reduce((p, v) => p.id > v.id ? p.id : v.id);
            item.id = ++max_id;
            arr.push(item);
        }

        this.setState({ selectedProductID: null, isModifySelectedProduct: false, formStatus: FormStatus.VIEW, productArray: arr });
    }

    newProductOnClick = (event) => {
        event.stopPropagation();
        
        this.setState({ selectedProductID: null, isModifySelectedProduct: true, formStatus: FormStatus.NEW });
    }

    modifyProductCard = () => {
        if (this.state.isModifySelectedProduct) return;

        this.setState({ isModifySelectedProduct: true });
    }

    componentDidMount() {
        this.scrollToBottom();
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }
    scrollToBottom = () => {
        this.scrollTarget.current?.scrollIntoView({ behavior: "smooth"});
    }

    renderForm(param) {
        let item = {};

        switch (param) {
            case FormStatus.NEW:
                return <>
                    <div ref={this.scrollTarget}/>
                    <EditingForm
                        item={{ id: 0, title: '', description: '', url: '', price: 0, availableQuantity: 1 }}
                        isNewItem={true}
                        cbCansel={this.canselProductCard}
                        cbSave={this.saveProductCard}
                        cbModify={this.modifyProductCard}
                    />
                </>
            case FormStatus.EDIT:
                if (!this.state.selectedProductID) return null;

                item = this.state.productArray.find(item => item.id === this.state.selectedProductID);
                return <>
                    <div ref={this.scrollTarget}/>
                    <EditingForm
                        key={item.id}
                        item={item}
                        isNewItem={false}
                        cbCansel={this.canselProductCard}
                        cbSave={this.saveProductCard}
                        cbModify={this.modifyProductCard}
                    />
                </>
            default:
                if (!this.state.selectedProductID) return null;

                item = this.state.productArray.find(item => item.id === this.state.selectedProductID);
                return <ViewForm key={item.id} item={item} />
        }

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
                    {this.state.productArray && this.state.productArray.map(e =>
                        <ProductItem
                            key={e.id}
                            item={e}
                            cbSelect={this.selectProduct}
                            selectedProductID={this.state.selectedProductID}
                            cbRemove={this.removeProduct}
                            cbEdit={this.editProduct}
                            onlyView={this.state.isModifySelectedProduct}
                        />
                    )}</tbody>
            </table>
            <button onClick={this.newProductOnClick} disabled={this.state.isModifySelectedProduct}>New product</button>
            {this.renderForm(this.state.formStatus)}
        </div>

    };
}

export default ProductList;