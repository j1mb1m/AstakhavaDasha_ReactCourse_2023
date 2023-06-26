
var FilterList = React.createClass({

    displayName: 'FiletrList',

    propTypes: {
        stringArr: React.PropTypes.arrayOf(
            React.PropTypes.string.isRequired,
        ),
    },

    render: function () {
        return React.DOM.ul({ name: 'stringArray' },
            this.props.stringArr.map((e, index) =>
                React.DOM.li({ key: index }, e),
            )
        )
    },
})
