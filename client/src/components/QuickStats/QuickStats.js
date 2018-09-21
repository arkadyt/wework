import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import {
    FaThumbsUp as IcoLike,
    FaComments as IcoComments
} from 'react-icons/fa'

import { withEither } from '../../hocs/conditionalRendering'
import FBSpinner from '../FBSpinner/FBSpinner'
import { fetchUsersStats } from '../../state/actions/userActions'
import './QuickStats.css'

const StatsChart = ({
    authedUser: {
        name, avatar
    },
    usersProfile: {
        title, company, status
    },
    stats: {
        followers: followersCount,
        following: subscriptionsCount,
        postCount,
        totalLikes,
        totalComments
    }
}) => (
        <Fragment>
            <section className="QuickStats-name">
                <img src={avatar} alt=""></img>
                <h2>{name}</h2>
                <p>{title} at {company}</p>
                <p>{status}</p>
            </section>
            <section className="QuickStats-rows">
                <h3>Your stats:</h3>
                <p>
                    <span>Following:</span>
                    <span>{subscriptionsCount}</span>
                </p>
                <p>
                    <span>Your followers:</span>
                    <span>{followersCount}</span>
                </p>
                <p>
                    <span>Total posts:</span>
                    <span>{postCount}</span>
                </p>
            </section>
            <section className="QuickStats-likes-comments">
                <h3>Total likes and comments on your posts:</h3>
                <div>
                    <p><IcoLike /> {totalLikes}</p>
                    <p><IcoComments /> {totalComments}</p>
                </div>
            </section>
        </Fragment>
    )

const isLoadingFn = ({
    stats,
    authedUser,
    usersProfile,
}) => {
    return !stats || !usersProfile || !authedUser
}

const StatsWithLoading = withEither(isLoadingFn, FBSpinner)(StatsChart)

class QuickStats extends Component {
    render() {
        const { authedUser, usersProfile, stats } = this.props

        return (
            <div className="QuickStats-container">
                <StatsWithLoading
                    stats={stats}
                    authedUser={authedUser}
                    usersProfile={usersProfile} />
            </div>
        )
    }

    componentDidMount() {
        const { fetchUsersStats } = this.props
        fetchUsersStats()
    }
}

export default connect(state => ({
    authedUser: state.user,
    usersProfile: state.profile,
    stats: state.user.stats
}), { fetchUsersStats })(QuickStats)