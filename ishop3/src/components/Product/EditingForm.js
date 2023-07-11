import React from 'react';
import './EditingForm.css';
import PropTypes from 'prop-types';

class EditingForm extends React.Component {

    static propTypes = {
        item: PropTypes.shape({
            id: PropTypes.number.isRequired,
            title: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
            url: PropTypes.string.isRequired,
            price: PropTypes.number.isRequired,
            availableQuantity: PropTypes.number,
        }),
        isNewItem: PropTypes.bool.isRequired,
        cbCansel: PropTypes.func.isRequired,
        cbSave: PropTypes.func.isRequired,
        cbModify: PropTypes.func.isRequired,
    };

    state = {
        fields: {
            id: this.props.item.id,
            title: this.props.item.title,
            description: this.props.item.description,
            price: this.props.item.price,
            url: this.props.item.url,
            availableQuantity: this.props.item.availableQuantity
        },
        errors: {},
    };

    #validateRules = {
        title: function (value) {
            return !value.trim();
        },
        description: function (value) {
            return !value.trim();
        },
        url: function (value) {
            const urlPattern = /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-/]))?(.jpeg|.png|.gif)$/;
            return (!urlPattern.test(value) || !value.trim())
        },
        availableQuantity: function (value) {
            const numberPattern = /^\d+$/;
            return !numberPattern.test(value);
        },
        price: function (value) {
            const numberPattern = /^\d+(\.\d{1,2})?$/;
            return !numberPattern.test(value);
        },
    };

    handleUserInput = (e) => {
        let {name, value} = e.target;
   
        const errors = this.state.errors;
        const fields = this.state.fields;

        if(name === 'price' || name === 'availableQuantity'){
            value = Number(value);
        }

        fields[name] = value;

        if ((name in this.#validateRules) && this.#validateRules[name](value)) {
            errors[name] = true;
        }
        else {
            errors[name] = false;
        }

        this.setState({ fields: fields, errors: errors });
        this.props.cbModify();
    }

    validForm = () => {
        for (const iterator in this.state.fields) {
            if ((iterator in this.#validateRules) && this.#validateRules[iterator](this.state.fields[iterator])) {
                return false;
            }
        }
        return true;
    }

    canselOnClick = (event) => {
        event.preventDefault();
        event.stopPropagation();

        this.props.cbCansel();
    }

    saveChangesOnClick = (event) => {
        event.preventDefault();
        event.stopPropagation();

        for (let elem in this.state.fields) {
            if (elem in this.props.item)
                this.props.item[elem] = this.state.fields[elem];
        }

        this.props.cbSave(this.props.item);
    }

    render() {
        return <form name='ProductEditingForm' className='ProductEditingForm'>
            <label >Name:
                <input type='text' name='title' value={this.state.fields.title} onChange={this.handleUserInput} />
            </label>
            <div className="error">{this.state.errors.title && <p>Проверьте корректность ввода! Поле не может быть пустым.</p>}</div>

            <label className='ProductEditingForm_description'>Description:
                <textarea type='text' name='description' value={this.state.fields.description} rows='5' onChange={this.handleUserInput} />
            </label>
            <div className="error">{this.state.errors.description && <p>Проверьте корректность ввода! Поле не может быть пустым.</p>}</div>

            <label>url:
                <input type='url' name='url' value={this.state.fields.url} onChange={this.handleUserInput} />
            </label>
            <div className="error">{this.state.errors.url && <p>Проверьте корректность ввода! В поле могут быть указаны картинки форматов: jpeg, gif, png.</p>}</div>

            <label>Price:
                <input type='number' name='price' value={this.state.fields.price} min={0} onChange={this.handleUserInput} />
            </label>
            <div className="error">{this.state.errors.price && <p>Проверьте корректность ввода! Поле должно содержать положительное число.</p>}</div>

            <label>Count:
                <input type='number' name='availableQuantity' value={this.state.fields.availableQuantity} min={1} onChange={this.handleUserInput} />
            </label>
            <div className="error">{this.state.errors.availableQuantity && <p>Проверьте корректность ввода! Поле должно содержать положительное число.</p>}</div>

            <div className='ProductEditingForm_buttons'>
                <button type='submit' onClick={this.saveChangesOnClick} disabled={!this.validForm()}>{this.props.isNewItem ? 'Add' : 'Save'}</button>
                <button type='reset' onClick={this.canselOnClick}>Cancel</button>
            </div>
        </form>

    };

}

export default EditingForm;
