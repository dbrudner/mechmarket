import React from 'react'
import KeyboardListItem from './keyboard-list-item'

export default function KeyboardList(props) {
    
    const renderKeyboardList = keyboards => {
        return Object.keys(keyboards).map((keyboard) => {
            console.log(keyboards[keyboard])
            return (
                <KeyboardListItem keyboard={keyboards[keyboard]} />
            )
        })
    }
    
    return (
        <div>
            {renderKeyboardList(props.keyboards)}
        </div>
    )
}