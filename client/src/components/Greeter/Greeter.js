import React from 'react'
import './Greeter.scss'

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

        const msgClasses = [
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
                        Social networking platform for professionals
                    </span>
                    <p className={msgClasses}>
                        Support for vertical layouts has not been
                        implemented yet!
                    </p>
                    <p className={msgClasses}>
                        If you would like to contribute, please open
                        a Pull Request at github.com/arkadyt/wework!
                    </p>
                    <p className={msgClasses}>
                        In the meanwhile you can try reloading this
                        page in landscape mode or visiting it from
                        a desktop computer!
                    </p>
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
