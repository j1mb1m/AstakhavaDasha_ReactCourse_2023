
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
        this.setState({ searchedText: text }, this.updateForm);
    },


    sortOnClick: function () {
        this.setState({ isSorted: !this.state.isSorted }, this.updateForm);
    },

    resetOnClick: function () {
        this.setState({
            searchedText: '',
            isSorted: false,
            data: this.props.stringArr
        });
    },

    // service procedures 

    updateForm: function () {
        var arr = this.props.stringArr;
        if (this.state.searchedText) {
            arr = arr.filter(name => name.includes(this.state.searchedText));
        }
        if (this.state.isSorted) {
            if (arr === this.props.stringArr)
                arr = arr.slice();//creating a new array so that the original array doesn't change
            
            arr.sort(); //sorting a copy of the array
        }
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
