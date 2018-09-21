import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import {
    FaThumbsUp as IcoLike,
    FaComments as IcoComments
} from 'react-icons/fa'
import axios from 'axios'

import { withEither } from '../../hocs/withEither'
import FBSpinner from '../FBSpinner/FBSpinner'
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

const isLoadingFn = ({ stats, authedUser, usersProfile }) => (
    !stats || !authedUser || !usersProfile
)
const StatsWithLoading = withEither(isLoadingFn, FBSpinner)(StatsChart)

class QuickStats extends Component {
    state = {
        stats: null
    }

    fetchUsersStats = callback => {
        axios.get('/api/users/myStats')
            .then(res => {
                this.setState({ stats: res.data })
                if (callback) callback()
            })
            .catch(err => console.log(err))
    }

    render() {
        const { authedUser, usersProfile } = this.props

        return (
            <div className="QuickStats-container">
                <StatsWithLoading
                    stats={this.state.stats}
                    authedUser={authedUser}
                    usersProfile={usersProfile} />
            </div>
        )
    }

    componentDidMount() {
        this.fetchUsersStats()
    }
}

export default connect(state => ({
    authedUser: state.user,
    usersProfile: state.profile
}))(QuickStats)