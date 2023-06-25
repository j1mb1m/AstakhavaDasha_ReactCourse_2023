
var ProductItem = React.createClass({

    displayName: 'ProductItem',

    propTypes: {
        item: React.PropTypes.shape({
            id: React.PropTypes.number.isRequired,
            title: React.PropTypes.string.isRequired,
            description: React.PropTypes.string.isRequired,
            url: React.PropTypes.string.isRequired,
            price: React.PropTypes.number.isRequired,
            availableQuantity: React.PropTypes.number.isRequired,

        }),
        cbSelected: React.PropTypes.func.isRequired,
        selectedProductID: React.PropTypes.number,
        cbRemoved: React.PropTypes.func.isRequired,
    },

    productItemOnClick: function (event) {
        if (event.target.type == 'submit') return;
        this.props.cbSelected(this.props.item.id);
    },

    deleteOnClick: function () {
        if (confirm('Do you confirm the deletion?'))
            this.props.cbRemoved(this.props.item.id);
    },

    render: function () {
        return React.DOM.tr({
            className: `ProductItem${(this.props.selectedProductID === this.props.item.id) ? ' SelectedRow' : ''}`,
            key: this.props.item.id,
            onClick: this.productItemOnClick
        },
            React.DOM.td({ className: 'ProductItem_url' }, React.DOM.img({ src: this.props.item.url, alt: this.props.item.title })),
            React.DOM.td({ className: 'ProductItem_title' }, this.props.item.title),
            React.DOM.td({ className: 'ProductItem_description' }, this.props.item.description),
            React.DOM.td({ className: 'ProductItem_price' }, `${this.props.item.price} руб.`),
            React.DOM.td({ className: 'ProductItem_availableQuantity' }, `${this.props.item.availableQuantity} шт.`),
            React.DOM.td({ className: 'ProductItem_control' }, React.DOM.button({ onClick: this.deleteOnClick }, 'Delete')),
        )
    },

})