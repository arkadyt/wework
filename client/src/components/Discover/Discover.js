import React, { Component } from 'react'
import { connect } from 'react-redux'
import { arrayOf, func } from 'prop-types'

import './Discover.scss'
import { followAPerson, fetchUsersStats, fetchDiscoverContent } from '../../state/actions/userActions'
import { fetchPosts } from '../../state/actions/postsActions'
import CreatorsList from './CreatorsList/CreatorsList'
import { discoverListNodeType } from '../../types/index'


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
                <CreatorsList
                    list={this.props.list}
                    followAPerson={this.followAPerson} />
            </div>
        )
    }

    componentDidMount() {
        this.props.fetchDiscoverContent(5)
    }
}

Discover.propTypes = {
  list: arrayOf(discoverListNodeType),
  followAPerson: func.isRequired,
  fetchUsersStats: func.isRequired,
  fetchDiscoverContent: func.isRequired,
  fetchPosts: func.isRequired
}


export const _UnconnectedDiscover = Discover
export default connect(state => ({ list: state.user.discoverList }), {
    followAPerson,
    fetchUsersStats,
    fetchPosts,
    fetchDiscoverContent
})(Discover)
