
var ProductList = React.createClass({

    displayName: 'ProductList',

    propTypes: {
        goodsList: React.PropTypes.arrayOf(
            React.PropTypes.shape({
                id: React.PropTypes.number.isRequired,
                title: React.PropTypes.string.isRequired,
                url: React.PropTypes.string.isRequired,
                price: React.PropTypes.number.isRequired,
                availableQuantity: React.PropTypes.number,
            })
        )
    },

    render: function () {
        return React.DOM.table({ className: 'ProductList' },
            React.DOM.thead(null,
                React.DOM.tr(null,
                    React.DOM.td({ className: 'url' }, 'Картинка'),
                    React.DOM.td({ className: 'title' }, 'Название'),
                    React.DOM.td({ className: 'price' }, 'Цена'),
                    React.DOM.td({ className: 'availableQuantity' }, 'Доступно'),
                )
            ),
            React.DOM.tbody(null,
                this.props.goodsList.map(e =>
                    React.DOM.tr({ key: e.id },
                        React.DOM.td({ className: 'url' }, React.DOM.img({ src: e.url, alt: e.title })),
                        React.DOM.td({ className: 'title' }, e.title),
                        React.DOM.td({ className: 'price' }, e.price),
                        React.DOM.td({ className: 'availableQuantity' }, e.availableQuantity),
                    )
                )
            )
        )
    },

})

