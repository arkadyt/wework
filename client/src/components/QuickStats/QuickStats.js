import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import {
    FaThumbsUp as IcoLike,
    FaComments as IcoComments
} from 'react-icons/fa'
import { compose } from 'recompose'
import { withRouter } from 'react-router-dom'

import { withEither } from '../../hocs/conditionalRendering'
import FBSpinner from '../FBSpinner/FBSpinner'
import Field from '../Field/Field'
import { fetchUsersStats } from '../../state/actions/userActions'
import './QuickStats.scss'

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
                <p>{title}{company && ` at ${company}`}</p>
                <p>{status}</p>
            </section>
            <section className="QuickStats-rows">
                <h3>Your stats:</h3>
                <div>
                    <span>Following:</span>
                    <div />
                    <span>{subscriptionsCount}</span>
                </div>
                <div>
                    <span>Your followers:</span>
                    <div />
                    <span>{followersCount}</span>
                </div>
                <div>
                    <span>Total posts:</span>
                    <div />
                    <span>{postCount}</span>
                </div>
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
}) => !stats || !usersProfile || !authedUser

const hasNoProfile = ({
    errors: { noProfile }
}) => !!noProfile

const NoProfileMessage = withRouter(({ history }) => (
    <Fragment>
        <h2>You don't yet have a profile, create one now!</h2>
        <Field 
            type="button"
            label="Create"
            onClick={() => {
                history.push('/profile/create-profile')
            }} />
    </Fragment>
))

const withCondRendering = compose(
    withEither(hasNoProfile, NoProfileMessage),
    withEither(isLoadingFn, FBSpinner)
)

const StatsWithCondRendering = withCondRendering(StatsChart)

class QuickStats extends Component {
    render() {
        const { authedUser, usersProfile, stats, errors } = this.props

        return (
            <div className="QuickStats-container">
                <StatsWithCondRendering
                    stats={stats}
                    errors={errors}
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
    stats: state.user.stats,
    errors: state.err
}), { fetchUsersStats })(QuickStats)
