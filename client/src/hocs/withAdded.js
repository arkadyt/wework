import React, { Fragment } from 'react'

export const withAdded = (conditionFn, AddedComponent) => Component => props =>
    conditionFn(props)
        ? (
            <Fragment>
                <Component {...props} />
                <AddedComponent {...props} />
            </Fragment>
        ) 
        : <Component {...props} />