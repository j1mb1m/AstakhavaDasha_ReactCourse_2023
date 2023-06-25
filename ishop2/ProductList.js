
var ProductList = React.createClass({

    displayName: 'ProductList',

    propTypes: {
        goodsList: React.PropTypes.arrayOf(
            React.PropTypes.shape({
                id: React.PropTypes.number.isRequired,
                title: React.PropTypes.string.isRequired,
                description: React.PropTypes.string.isRequired,
                url: React.PropTypes.string.isRequired,
                price: React.PropTypes.number.isRequired,
                availableQuantity: React.PropTypes.number,
            })
        )
    },

    getInitialState: function () {
        return {
            selectedProductID: null,
            productArray: this.props.goodsList,
        };
    },

    selectProduct: function (id) {
        console.log('выбран товар с ID ' + id);
        this.setState({ selectedProductID: id });
    },

    removeProduct: function (id) {
        console.log('удален товар с ID ' + id);
        var arr = this.state.productArray.filter((item) => item.id !== id);
        this.setState({ productArray: arr });
    },

    render: function () {
        return React.DOM.table({ className: 'ProductList' },
            React.DOM.thead(null,
                React.DOM.tr(null,
                    React.DOM.td({ className: 'ProductItem_url' }, 'Image'),
                    React.DOM.td({ className: 'ProductItem_title' }, 'Title'),
                    React.DOM.td({ className: 'ProductItem_description' }, 'Description'),
                    React.DOM.td({ className: 'ProductItem_price' }, 'Price'),
                    React.DOM.td({ className: 'ProductItem_availableQuantity' }, 'Available'),
                    React.DOM.td({ className: 'ProductItem_control' }, 'Control'),
                )
            ), React.DOM.tbody({ className: 'ProductList' },
                this.state.productArray.map(e =>
                    React.createElement(ProductItem, {
                        key: e.id,
                        item: e,
                        cbSelected: this.selectProduct,
                        selectedProductID: this.state.selectedProductID,
                        cbRemoved: this.removeProduct,
                    })
                )
            )
        )
    },
})

