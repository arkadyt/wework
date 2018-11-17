import React from 'react'
import {
    FaShippingFast as IcoTruck
} from 'react-icons/fa'
import './Greeter.css'

class Greeter extends React.Component {
    state = {
        startAnimations: false
    }

    handleLoad = () => {
        this.setState({ startAnimations: true })
    }

    render() {
        const { startAnimations } = this.state

        const whiteScreenClasses = [
            "Greeter__white-screen",
            startAnimations && "animate"
        ].join(' ')

        const logoScreenClasses = [
            "Greeter__logo-screen",
            startAnimations && "animate"
        ].join(' ')

        const headlineClasses = [
            "Greeter__headline",
            startAnimations && "animate"
        ].join(' ')

        const headlineWarningClasses = [
            "Greeter__headline_warning",
            startAnimations && "animate"
        ].join(' ')

        return (
            <div className="Greeter__container">
                <div className={logoScreenClasses}>
                    <div className="Greeter__logo">
                        <span>We</span><span>Work</span>
                    </div>
                    <span className={headlineClasses}>
                        Social network website for professionals
                    </span>
                    <span className={headlineWarningClasses}>
                        Support for the tall screens is already<br />
                        on the way!<br /><br />

                        <span style={{fontSize: 80}}><IcoTruck /></span><br /><br />

                        Until then you can visit the website<br />
                        on desktop or switch your<br />
                        device into the landscape mode.<br /><br />

                        To checkout my skills of building the<br />
                        responsive layouts visit&nbsp;
                        <a href="https://arkadyt.com" target="_blank" rel="noopener noreferrer">
                            <b>https://arkadyt.com</b>
                        </a>!<br />
                    </span>
                </div>
                <div className={whiteScreenClasses} />
            </div>
        )
    }

    componentDidMount() {
        window.addEventListener('load', this.handleLoad)
        document.documentElement.className = 'html-dark-background'
    }
}

export default Greeter