import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import {
    FaThumbsUp as IcoLike,
    FaComments as IcoComments
} from 'react-icons/fa'

import { withEither } from '../../hocs/withEither'
import FBSpinner from '../FBSpinner/FBSpinner'
import './QuickStats.css'


/**
 * Layout:
 * Image
 * Name
 * Title at Company
 * Followers
 * Following
 * Post count
 * (?) Likes count
 * Comments count
 */

const Stats = ({
    authedUser: {
        name, avatar, followers, following
    },
    usersProfile: {
        title, company, status
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
                    <span>{following.length}</span>
                </p>
                <p>
                    <span>Your followers:</span>
                    <span>{followers.length}</span>
                </p>
                <p>
                    <span>Total posts:</span>
                    <span>{10}</span>
                </p>
            </section>
            <section className="QuickStats-likes-comments">
                <h3>Total likes and comments on your posts:</h3>
                <div>
                    <p><IcoLike /> 178</p>
                    <p><IcoComments /> 45</p>
                </div>
            </section>
        </Fragment>
    )

const isProfileUnavailableFn = ({ usersProfile }) => !usersProfile
const StatsWithCondRenderings = withEither(isProfileUnavailableFn, FBSpinner)(Stats)

export default connect(state => ({
    authedUser: state.user,
    usersProfile: state.profile
}))(({ authedUser, usersProfile }) => (
    <div className="QuickStats-container">
        <StatsWithCondRenderings
            authedUser={authedUser}
            usersProfile={usersProfile} />
    </div>
))