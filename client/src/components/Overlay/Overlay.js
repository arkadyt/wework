import React from 'react'
import './Overlay.scss'

class Overlay extends React.Component {
    componentWillMount() {
        document.body.style = "overflow: hidden"
    }

    componentWillUnmount() {
        document.body.style = null
    }

    render() {
        const { children, onBackdropClick } = this.props

        return (
            <div id="Overlay-container-backdrop"
                className="Overlay-container" onClick={function (e) {
                    if (e.target.id === 'Overlay-container-backdrop')
                        onBackdropClick()
                }}>
                <div className="content">
                    {children}
                </div>
            </div>
        )
    }
}

export default Overlay
