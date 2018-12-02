import React from 'react'
import { withRouter } from 'react-router-dom'
import { FaUserPlus as IcoAdd } from 'react-icons/fa'
import Field from '../../Field/Field'
import { discoverListNodeType } from '../../../types/index'

const ListNode = withRouter(({
    _id, name, avatar, title, company,
    followAPerson,
    history
}) => (
        <div className="ListNode-container">
            <img className="ListNode-img" src={avatar} alt="" />
            <div className="ListNode-name">
                <Field
                    type="linkButton"
                    label={name}
                    inline
                    style={{ fontSize: '1.15em' }}
                    onClick={() => history.push(`/profile/id/${_id}`)} />
                <p>{title}{company && ` at ${company}`}</p>
            </div>
            <Field
                type="linkButton"
                style={{ fontSize: '1.4rem' }}
                onClick={() => followAPerson(_id)}>
                <IcoAdd />
            </Field>
        </div>
    ))

ListNode.propTypes = {
  node: discoverListNodeType.isRequired
}

export const _UnconnectedListNode = ListNode
export default ListNode
