
var FilterBlock = React.createClass({

    displayName: 'FilterBlock',

    propTypes: {
        stringArr: React.PropTypes.arrayOf(
            React.PropTypes.string.isRequired,
        )
    },

    getInitialState: function () {
        return {
            searchedText: '',
            sort: false
        };
    },


    filterTextChanged: function (EO) {
        this.setState({ searchedText: EO.target.value });
    },

    resetOnClick: function () {
        this.setState({ searchedText: '', sort: false });

    },

    sortOnClick: function () {
        this.setState({ sort: !this.state.sort });
    },

    render: function () {
        return React.DOM.div({ className: 'FilterBlock' },
            React.DOM.input({
                type: 'checkbox',
                name: 'sort',
                onClick: this.sortOnClick,
                checked: this.state.sort
            }),
            React.DOM.input({
                type: 'text',
                name: 'filtertext',
                onChange: this.filterTextChanged,
                value: this.state.searchedText,
                placeholder: 'search...'
            }),
            React.DOM.button({
                type: 'button',
                name: 'reset',
                onClick: this.resetOnClick
            }, 'reset'),
            React.createElement(FilterList, {
                stringArr: this.props.stringArr,
                searchLetters: this.state.searchedText,
                sort: this.state.sort,
            })
        )
    },
})
