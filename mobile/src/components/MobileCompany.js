import React from 'react';
import PropTypes from 'prop-types';
import { clientEvents } from './events';
import './MobileCompany.css';
import MobileClient from './MobileClient';
import { clientFilteringOptions, formStatus } from '../utils/enums'
import { accontMinLimit } from '../utils/constant'
import MobileClientEditForm from './MobileClientEditForm';

class MobileCompany extends React.PureComponent {

    static propTypes = {
        clients: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.number.isRequired,
                surname: PropTypes.string.isRequired,
                name: PropTypes.string.isRequired,
                patronymic: PropTypes.string.isRequired,
                balance: PropTypes.number.isRequired,
            })
        )
    };

    state = {
        clients: this.props.clients,
        filteredClients: this.props.clients,
        filterType: clientFilteringOptions.ALL,
        formStatus: formStatus.NONE,
        selectedClientID: null,
    };

    componentDidMount = () => {
        clientEvents.addListener('EEditClienClicked', this.editClient);
        clientEvents.addListener('EDeleteClienClicked', this.deleteClient);
        clientEvents.addListener('ESaveMobileClientClicked', this.saveMobileClient);
        clientEvents.addListener('EUnSaveMobileClientClicked', this.canselMobileClient);
    };

    componentWillUnmount = () => {
        clientEvents.removeListener('EEditClienClicked', this.editClient);
        clientEvents.removeListener('EDeleteClienClicked', this.deleteClient);
        clientEvents.removeListener('ESaveMobileClientClicked', this.saveMobileClient);
        clientEvents.removeListener('EUnSaveMobileClientClicked', this.canselMobileClient);
    };

    filterClients() {
        switch (this.state.filterType) {
            case clientFilteringOptions.ALL:
                return this.setState({ filteredClients: this.state.clients });
            case clientFilteringOptions.ACTIVE:
                return this.setState({ filteredClients: this.state.clients.filter(item => item.balance >= accontMinLimit) });
            case clientFilteringOptions.BLOCKED:
                return this.setState({ filteredClients: this.state.clients.filter(item => item.balance < accontMinLimit) });
            default: break;
        }
    }

    editClient = (item) => {
        this.setState({ selectedClientID: item, formStatus: formStatus.EDIT });
    };

    saveMobileClient = (data) => {
        let clients = this.state.clients;

        if (this.state.formStatus === formStatus.NEW) {
            let max_id = clients.reduce((p, v) => p.id > v.id ? p.id : v.id);
            data.id = ++max_id;
            clients.push(data);
        }
        else if (this.state.formStatus === formStatus.EDIT) {
            clients = clients.map(element => {
                if (element.id === data.id) {
                    return data;
                }
                return element;
            });
        }
        this.setState({ selectedClientID: null, formStatus: formStatus.NONE, clients }, this.filterClients);
    };

    canselMobileClient = () => {
        this.setState({ selectedClientID: null, formStatus: formStatus.NONE });
    };

    deleteClient = (id) => {
        const clients = this.state.clients.filter((item) => item.id !== id);
        this.setState({ clients, formStatus: formStatus.NONE, selectedClientID: null }, this.filterClients);
    };

    render() {
        console.log('render MobileCompany');

        return <div className='MobileCompany'>
            <div className='row'>
                <button value='All' onClick={() => this.setState({ filterType: clientFilteringOptions.ALL }, this.filterClients)}>Все</button>
                <button value='Active' onClick={() => this.setState({ filterType: clientFilteringOptions.ACTIVE }, this.filterClients)}>Активные</button>
                <button value='Blocked' onClick={() => this.setState({ filterType: clientFilteringOptions.BLOCKED }, this.filterClients)}>Заблокированные</button>
            </div>
            <div className='row'>
                <table>
                    <thead>
                        <tr>
                            <td>Фамилия</td>
                            <td>Имя</td>
                            <td>Отчество</td>
                            <td>Баланс</td>
                            <td>Статус</td>
                            <td>Редактировать</td>
                            <td>Удалить</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.filteredClients && this.state.filteredClients.map(item => {
                                return <MobileClient
                                    key={item.id}
                                    item={item} />;
                            })
                        }
                    </tbody>
                </table>
            </div>
            <div className='row'><button onClick={()=>this.setState({ formStatus: formStatus.NEW })}>Добавить клиента</button></div>
            {
                (this.state.formStatus === formStatus.EDIT) && <MobileClientEditForm key={this.state.selectedClientID} isNewItem={false} item={this.state.clients.find(item => item.id === this.state.selectedClientID)} />
            }
            {
                (this.state.formStatus === formStatus.NEW) && <MobileClientEditForm isNewItem={true}
                    item={{ id: 0, surname: '', name: '', patronymic: '', balance: 0, }} />
            }

        </div >

    }
}

export default MobileCompany;