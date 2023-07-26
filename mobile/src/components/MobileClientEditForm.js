import React from 'react';
import PropTypes from 'prop-types';
import { clientEvents } from './events';
import './MobileClientEditForm.css';

class MobileClientEditForm extends React.PureComponent {

    static propTypes = {

        item: PropTypes.shape({
            id: PropTypes.number.isRequired,
            surname: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            patronymic: PropTypes.string.isRequired,
            balance: PropTypes.number.isRequired,
        }),
        isNewItem: PropTypes.bool.isRequired,
    };

    surnameRef = React.createRef(this.props.item.surname);
    nameRef = React.createRef(this.props.item.name);
    patronymicRef = React.createRef(this.props.item.patronymic);
    balanceRef = React.createRef(this.props.item.balance);

    canselOnClick = () => {
        clientEvents.emit('EUnSaveMobileClientClicked');
    };

    saveChangesOnClick = () => {
        const data = {
            surname: this.surnameRef.current.value,
            name: this.nameRef.current.value,
            patronymic: this.patronymicRef.current.value,
            balance: Number(this.balanceRef.current.value),
        };

        let item = { ...this.props.item, ...data };
        clientEvents.emit('ESaveMobileClientClicked', item);
    };

    render() {
        console.log(`render MobileClientEditForm ${this.props.item.id}`);

        return <form className='MobileClientEditForm' >
            <label>Фамилия:
                <input type='text' name='surname' ref={this.surnameRef} defaultValue={this.props.item.surname} />
            </label>
            <label>Имя:
                <input type='text' name='name' ref={this.nameRef} defaultValue={this.props.item.name} />
            </label>
            <label>Отчество:
                <input type='text' name='patronymic' ref={this.patronymicRef} defaultValue={this.props.item.patronymic} />
            </label>
            <label>Баланс:
                <input type='number' name='balance' ref={this.balanceRef} defaultValue={this.props.item.balance} />
            </label>
            <div className='MobileClientEditForm_buttons'>
                <button type='button' onClick={this.saveChangesOnClick} >{this.props.isNewItem ? 'Добавить' : 'Сохранить'}</button>
                <button type='reset' onClick={this.canselOnClick}>Закрыть</button>
            </div>
        </form>
    }

}

export default React.memo(MobileClientEditForm);