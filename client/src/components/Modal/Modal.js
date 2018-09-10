import React from 'react'
import Field from '../Field/Field'
import Overlay from '../Overlay/Overlay'
import './Modal.css'

const Modal = ({
    question,
    onConfirm,
    onDismiss,
    actionColor
}) => {
    const handleDismiss = () => {
        onDismiss()
    }

    const handleConfirm = () => {
        onConfirm()
        onDismiss()
    }

    return (
        <Overlay onBackdropClick={() => handleDismiss()}>
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
                        onClick={() => handleConfirm()} />
                </div>
            </div>
        </Overlay>
    )
}

export default Modal