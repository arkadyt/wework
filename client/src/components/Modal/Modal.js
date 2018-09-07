import React from 'react'
import Field from '../Field/Field'
import Overlay from '../Overlay/Overlay'
import { connect } from 'react-redux'
import { dismissOverlay } from '../../state/actions/overlayActions'
import './Modal.css'

const Modal = ({
    question,
    onConfirm,
    onDismiss,
    overlayId,
    actionColor,
    dismissOverlay
}) => {
    const handleDismiss = () => {
        (onDismiss || function () { dismissOverlay(overlayId) })()
    }

    return (
        <Overlay onDismiss={() => handleDismiss()}>
            <div className="Modal-container">
                <p className="question">{question}</p>
                <div className="buttons">
                    <Field
                        type="button"
                        label="No"
                        style={{ width: '100%' }}
                        onClick={() => handleDismiss()} />
                    <Field
                        type="button"
                        label="Yes"
                        style={actionColor
                            ? {
                                backgroundColor: actionColor,
                                borderColor: actionColor,
                                color: 'white',
                                width: '100%'
                            }
                            : null}
                        onClick={() => {
                            onConfirm()
                            dismissOverlay(overlayId)
                        }} />
                </div>
            </div>
        </Overlay>
    )
}

export default connect(null, { dismissOverlay })(Modal)