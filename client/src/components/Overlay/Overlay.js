import React from 'react'
import './Overlay.css'

const Overlay = ({ children, onDismiss }) => {
    return (
        <div className="Overlay-container">
            <div className="backdrop"
                onClick={onDismiss} />
            <div className="content">
                {children}
            </div>
        </div>
    )
}

export default Overlay