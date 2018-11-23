import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { FaUserPlus as IcoAdd } from 'react-icons/fa'
import { compose } from 'recompose'
import { withRouter } from 'react-router-dom'

import './Discover.scss'
import Field from '../Field/Field'
import FBSpinner from '../FBSpinner/FBSpinner'
import { withEither, withAdded } from '../../hocs/conditionalRendering'
import { followAPerson, fetchUsersStats, fetchDiscoverContent } from '../../state/actions/userActions'
import { fetchPosts } from '../../state/actions/postsActions'

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

const CreatorsList = ({
    followAPerson,
    list
}) => (
        <Fragment>
            <h3>Add these people to your feed:</h3>
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
    followAPerson = (_id, callback) => {
        const {
            followAPerson,
            fetchUsersStats,
            fetchPosts,
            fetchDiscoverContent
        } = this.props

        followAPerson(_id, () => {
            fetchDiscoverContent(5)
            fetchUsersStats()
            fetchPosts(false)
            if (callback) callback()
        })
    }

    render() {
        return (
            <div className="Discover-container">
                <CreatorsListWithCondRenderings
                    list={this.props.list}
                    followAPerson={this.followAPerson} />
            </div>
        )
    }

    componentDidMount() {
        this.props.fetchDiscoverContent(5)
    }
}

export default connect(state => ({ list: state.user.discoverList }), {
    followAPerson,
    fetchUsersStats,
    fetchPosts,
    fetchDiscoverContent
})(Discover)
