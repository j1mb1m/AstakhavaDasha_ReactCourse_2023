
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
            isSorted: false,
            data: this.props.stringArr,
        };
    },

    // handlers

    filterTextChanged: function (EO) {
        var text = EO.target.value;
        this.setState({ searchedText: text }, () => { this.search() });
    },


    sortOnClick: function () {
        this.setState({ isSorted: !this.state.isSorted }, () => { this.state.isSorted ? this.sort() : this.search() });
    },

    resetOnClick: function () {
        this.setState({
            searchedText: '',
            isSorted: false,
            data: this.props.stringArr
        });
    },

    // service procedures 

    search: function () {
        var arr = this.props.stringArr.filter(name => name.includes(this.state.searchedText));
        this.setState({ data: arr }, () => {
            if (this.state.isSorted) this.sort();
        });

    },

    sort: function () {
        var arr = [].slice.call(this.state.data).sort();
        this.setState({ data: arr });
    },

    render: function () {
        return React.DOM.div({ className: 'FilterBlock' },
            React.DOM.input({
                type: 'checkbox',
                name: 'sort',
                onClick: this.sortOnClick,
                checked: this.state.isSorted
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
                stringArr: this.state.data,
            })
        )
    },
})
