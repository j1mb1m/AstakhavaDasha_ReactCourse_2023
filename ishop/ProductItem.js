
var ProductItem = React.createClass({

    displayName: 'ProductItem',

    propTypes: {
        item: React.PropTypes.shape({
            id: React.PropTypes.number.isRequired,
            title: React.PropTypes.string.isRequired,
            description: React.PropTypes.string.isRequired,
            url: React.PropTypes.string.isRequired,
            price: React.PropTypes.number.isRequired,
            availableQuantity: React.PropTypes.number,
        })
    },

    render: function () {
        return React.DOM.div({ className: 'ProductItem', key: this.props.item.id },
            React.DOM.div({ className: 'ProductItem_url' }, React.DOM.img({ src: this.props.item.url, alt: this.props.item.title })),
            React.DOM.div({ className: 'ProductItem_info' },
                React.DOM.div({ className: 'ProductItem_title' }, this.props.item.title),
                React.DOM.div({ className: 'ProductItem_description' }, this.props.item.description)),
            React.DOM.div({ className: 'ProductItem_price' }, `${this.props.item.price} руб.`),
            React.DOM.div({ className: 'ProductItem_availableQuantity' }, `${this.props.item.availableQuantity} шт.`),
        )
    },

})