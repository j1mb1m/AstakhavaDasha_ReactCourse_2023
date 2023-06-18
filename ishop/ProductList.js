
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

    render: function () {
        return React.DOM.div({ className: 'ProductList' },
            this.props.goodsList.map(e =>
                React.createElement(ProductItem, {
                    key: e.id,
                    item: e,
                })
            )
        )
    },
})

