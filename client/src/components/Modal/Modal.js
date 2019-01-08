import React from 'react'
import Field from '../Field/Field'
import Overlay from '../Overlay/Overlay'
import './Modal.scss'

const Modal = ({
    question,
    onConfirm,
    onDismiss,
    actionColor
}) => {
    const actionButtonStyle = actionColor ? {
        backgroundColor: actionColor,
        borderColor: actionColor,
        color: 'white',
        width: '100%'
    } : null

    return (
        <Overlay centered onBackdropClick={onDismiss}>
            <div className="Modal-container">
                <p className="question">{question}</p>
                <div className="buttons">
                    <Field
                        type="button"
                        label="No"
                        style={{ width: '100%' }}
                        onClick={onDismiss} />
                    <Field
                        type="button"
                        label="Yes"
                        style={actionButtonStyle}
                        onClick={onConfirm} />
                </div>
            </div>
        </Overlay>
    )
}

export default Modal
