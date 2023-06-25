
var FilterList = React.createClass({

    displayName: 'FiletrList',

    propTypes: {
        stringArr: React.PropTypes.arrayOf(
            React.PropTypes.string.isRequired,
        ),
        searchLetters: React.PropTypes.string.isRequired,
        sort: React.PropTypes.bool.isRequired,
    },

    render: function () {
        return React.DOM.ul({ name: 'stringArray' },
            this.props.sort ?
                this.props.stringArr.filter(name => name.includes(this.props.searchLetters)).sort().map((e, index) =>
                    React.DOM.li({ key: index }, e),
                ) :
                this.props.stringArr.filter(name => name.includes(this.props.searchLetters)).map((e, index) =>
                    React.DOM.li({ key: index }, e),
                )
        )
    },
})
