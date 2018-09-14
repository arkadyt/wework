import React from 'react'
import './Overlay.css'

class Overlay extends React.Component {
    componentWillMount() {
        window.scrollTo({ top: 0 })
    }

    render() {
        const { children, onBackdropClick } = this.props

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
}

export default Overlay