import React from 'react'
import Controls from './Controls'
import List from './List'

import './Filter.css'

function Filter({ sort, reset, filter, filteredText, isSorted, items }) {

    return <div className='Filter'>
        <input type='checkbox' name='sort' onChange={(e) => { sort(prev => !prev) }} checked={isSorted} />
        <input type='text' name='filtertext' onChange={(e) => { filter(e.target.value) }} placeholder='search...' value={filteredText} />
        <button type='button' name='reset' onClick={reset}>reset</button>
        <List items={items} />
    </div>
}

export default Controls(Filter)