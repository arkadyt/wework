import React, { Fragment } from 'react'
import ListNode from '../ListNode/ListNode'
import { withEither, withAdded } from '../../../hocs/conditionalRendering'
import { compose } from 'recompose'
import FBSpinner from '../../FBSpinner/FBSpinner'
import EmptyList from './EmptyList/EmptyList'
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
                            node={item}
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
const withCondRenderings = compose(
  withEither(isLoadingFn, FBSpinner),
  withAdded(isEmptyFn, EmptyList), 
)
const CreatorsListWithCondRenderings = withCondRenderings(CreatorsList)


export const _UnconnectedCreatorsList = CreatorsListWithCondRenderings
export default CreatorsListWithCondRenderings
