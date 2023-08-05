import React from 'react';
import PropTypes from 'prop-types';
import './List.css'

export default function List({ items }) {
    return <ul className='List'>
        {items.map(el => <li key={el}>{el}</li>)}
    </ul>
}

List.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.string.isRequired,
    ),
}
