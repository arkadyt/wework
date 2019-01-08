import React from 'react'
import './Overlay.scss'

class Overlay extends React.Component {
  componentWillMount() {
    document.body.style = "overflow: hidden"
  }

  componentWillUnmount() {
    document.body.style = null
  }

  handleSubmit(e) {
    const { 
      onBackdropClick 
    } = this.props

    if (e.target.id === 'Overlay-container-backdrop') {
      onBackdropClick()
    }
  }

  render() {
    const { 
      children, 
      centered
    } = this.props

    return (
      <div id="Overlay-container-backdrop" className="Overlay-container" onClick={this.handleSubmit}>
        <div className={["Overlay-content", centered ? "Overlay-content-centered" : null].join(' ')}>
          {children}
        </div>
      </div>
    )
  }
}

export default Overlay
