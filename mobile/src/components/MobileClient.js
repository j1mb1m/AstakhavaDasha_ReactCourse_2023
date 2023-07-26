import React from 'react';
import PropTypes from 'prop-types';
import { clientEvents } from './events';
import { accontMinLimit } from '../utils/constant'
import './MobileClient.css';

class MobileClient extends React.PureComponent {

    static propTypes = {

        item: PropTypes.shape({
            id: PropTypes.number.isRequired,
            surname: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            patronymic: PropTypes.string.isRequired,
            balance: PropTypes.number.isRequired,
        }),
    };

    state = {
        id: this.props.item.id,
        surname: this.props.item.surname,
        name: this.props.item.name,
        patronymic: this.props.item.patronymic,
        balance: this.props.item.balance,
    };

    editClientOnClick = () => {
        clientEvents.emit('EEditClienClicked', this.props.item.id);
    };

    deleteClientOnClick = () => {
        clientEvents.emit('EDeleteClienClicked', this.props.item.id);
    };

    componentDidUpdate = (oldProps, oldState) => {
        if (this.props.item.surname !== this.state.surname) {
            this.setState({ surname: this.props.item.surname });
        }
        else if (this.props.item.name !== this.state.name) {
            this.setState({ name: this.props.item.name });
        }
        else if (this.props.item.patronymic !== this.state.patronymic) {
            this.setState({ patronymic: this.props.item.balpatronymicance });
        }
        else if (this.props.item.balance !== this.state.balance) {
            this.setState({ balance: this.props.item.balance });
        }
    };

    render() {
        console.log(`render MobileClient ${this.state.id}`);

        return <tr key={this.props.item.id} className='MobileClient'>
            <td className='MobileClientSurname'>{this.state.surname}</td>
            <td className='MobileClientName'>{this.state.name}</td>
            <td className='MobileClientPatronymic'>{this.state.patronymic}</td>
            <td className='MobileClientBalance'>{this.state.balance}</td>
            <td className={`MobileClientStatus ${this.state.balance >= 0 ? 'active' : null}`}>{this.state.balance >= accontMinLimit ? 'active' : 'blocked'}</td>
            <td><button onClick={this.editClientOnClick}>Редактировать</button></td>
            <td><button onClick={this.deleteClientOnClick}>Удалить</button></td>
        </tr>
    }
}

export default MobileClient;

