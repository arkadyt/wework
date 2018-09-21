import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { FaUserPlus as IcoAdd } from 'react-icons/fa'
import axios from 'axios'

import './Discover.css'
import Field from '../Field/Field'
import FBSpinner from '../FBSpinner/FBSpinner'
import { withEither } from '../../hocs/conditionalRendering'
import { followAPerson } from '../../state/actions/userActions'

const ListNode = ({
    _id, name, avatar, title, company,
    followAPerson
}) => (
        <div className="ListNode-container">
            <img className="ListNode-img" src={avatar} alt="" />
            <div className="ListNode-name">
                <p>{name}</p>
                <p>{title} at {company}</p>
            </div>
            <Field
                type="linkButton"
                style={{ color: 'black', fontSize: '1.4rem' }}
                onClick={() => followAPerson(_id)}>
                <IcoAdd />
            </Field>
        </div>
    )

const CreatorsList = ({
    followAPerson,
    list
}) => (
        <Fragment>
            <h3>Add these creators to your feed:</h3>
            <div>
                {list.map(item => {
                    return (
                        <ListNode
                            key={item._id}
                            {...item}
                            followAPerson={followAPerson} />
                    )
                })}
            </div>
        </Fragment>
    )

const isLoadingFn = ({ list }) => !list
const CreatorsListWithLoading = withEither(isLoadingFn, FBSpinner)(CreatorsList)

class Discover extends Component {
    state = {
        list: null
    }

    fetchASample = (num, callback) => {
        axios.get(`/api/users/sample/${num}`)
            .then(res => {
                this.setState({ list: res.data })
                if (callback) callback()
            })
            .catch(err => console.log(err))
    }

    render() {
        const { followAPerson } = this.props

        return (
            <div className="Discover-container">
                <CreatorsListWithLoading
                    list={this.state.list}
                    followAPerson={followAPerson} />
            </div>
        )
    }

    componentDidMount() {
        this.fetchASample(5)
    }
}

export default connect(null, { followAPerson })(Discover)