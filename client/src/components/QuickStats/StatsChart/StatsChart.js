import React, { Fragment } from 'react'
import {
    FaThumbsUp as IcoLike,
    FaComments as IcoComments
} from 'react-icons/fa'

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

export default StatsChart
