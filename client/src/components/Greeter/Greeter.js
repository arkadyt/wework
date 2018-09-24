import React from 'react'
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

        return (
            <div className="Greeter__container">
                <div className={logoScreenClasses}>
                    <div className="Greeter__logo">
                        <span>We</span><span>Work</span>
                    </div>
                    <span className={headlineClasses}>
                        Social network website for professionals
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