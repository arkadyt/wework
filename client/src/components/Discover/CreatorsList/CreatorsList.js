import React, { Fragment } from 'react'
import ListNode from '../ListNode/ListNode'
import { withEither, withAdded } from '../../../hocs/conditionalRendering'
import { compose } from 'recompose'
import FBSpinner from '../../FBSpinner/FBSpinner'
import { arrayOf, func } from 'prop-types'
import { discoverListNodeType } from '../../../types/index'


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

CreatorsList.propTypes = {
  list: arrayOf(discoverListNodeType).isRequired,
  followAPerson: func.isRequired
}


const isLoadingFn = ({ list }) => !list
const isEmptyFn = ({ list }) => list.length === 0
const EmptyList = () => <p className="Discover-message">Nothing for you right now! Come back later!</p>
const withCondRenderings = compose(
  withEither(isLoadingFn, FBSpinner),
  withAdded(isEmptyFn, EmptyList), 
)
const CreatorsListWithCondRenderings = withCondRenderings(CreatorsList)


export const _UnconnectedCreatorsList = CreatorsListWithCondRenderings
export default CreatorsListWithCondRenderings
