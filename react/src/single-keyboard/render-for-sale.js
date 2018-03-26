import React from 'react'
import styled from 'styled-components'

export const renderForSale = (keyboard, param) => {

    const style = {
        color: 'rgb(232, 58, 58)', 
        fontWeight: 700, 
        
    }

    const MessageUser = styled.div`
        display: inline-block;
        cursor: pointer;
        color: rgb(34.4%,33%,83.9%);
    `

    const envelopeIcon = {
        marginLeft: '1rem',
        color: 'black'
    }

    const UserInfo = () => {
        return (
            <MessageUser>
                Message User
                <i style={envelopeIcon} className="fas fa-envelope"></i>                        
            </MessageUser>
        )
    }

    if (keyboard.forSale) {
        return (
            <div style={{marginBottom: '2rem', textAlign: 'center', marginLeft: '-2.5rem'}}>
                <div className='text-center' style={style}>
                    This Keyboard is For Sale
                </div>
                {param === 'preview' ? null : <UserInfo/>}
            </div>
        )
    } else {
        return null
    }
}