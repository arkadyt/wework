import React from 'react'
import './Overlay.css'

const Overlay = ({ children, onBackdropClick }) => {
    return (
        <div className="Overlay-container">
            <div className="backdrop"
                onClick={() => onBackdropClick()} />
            <div className="content">
                {children}
            </div>
        </div>
    )
}

export default Overlay