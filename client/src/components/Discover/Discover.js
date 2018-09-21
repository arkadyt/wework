import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { FaUserPlus as IcoAdd } from 'react-icons/fa'
import axios from 'axios'
import { compose } from 'recompose'

import './Discover.css'
import Field from '../Field/Field'
import FBSpinner from '../FBSpinner/FBSpinner'
import { withEither, withAdded } from '../../hocs/conditionalRendering'
import { followAPerson, fetchUsersStats } from '../../state/actions/userActions'

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
                style={{ fontSize: '1.4rem' }}
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
const isEmptyFn = ({ list }) => list.length === 0

const EmptyList = () => (
    <p className="Discover-message">Nothing for you right now! Come back later!</p>
)

const withCondRenderings = compose(
    withEither(isLoadingFn, FBSpinner),
    withAdded(isEmptyFn, EmptyList),
)
const CreatorsListWithCondRenderings = withCondRenderings(CreatorsList)

class Discover extends Component {
    state = {
        list: null
    }

    followAPerson = (_id, callback) => {
        const { followAPerson, fetchUsersStats } = this.props

        // securing myself up against asynchronous .setState()
        // even though it's very unlikely that the list will get
        // updated before I have a chance to check its length later down
        const { list } = this.state
        const listLength = list.length

        followAPerson(_id, () => {
            this.setState(prevState => ({
                list: prevState.list.filter(item => {
                    item._id !== _id
                })
            }))

            // ...later down here
            if (listLength === 1)
                // just followed the last person from the list, check for more
                this.fetchASample(5)

            fetchUsersStats()
            if (callback) callback()
        })
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
        return (
            <div className="Discover-container">
                <CreatorsListWithCondRenderings
                    list={this.state.list}
                    followAPerson={this.followAPerson} />
            </div>
        )
    }

    componentDidMount() {
        this.fetchASample(5)
    }
}

export default connect(null, { followAPerson, fetchUsersStats })(Discover)