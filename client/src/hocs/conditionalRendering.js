import React, { Fragment } from 'react'

export const withEither = (conditionFn, EitherComponent) => Component => props => {
    return conditionFn(props)
        ? <EitherComponent {...props} />
        : <Component {...props} />
}

export const withAdded = (conditionFn, AddedComponent) => Component => props =>
    conditionFn(props)
        ? (
            <Fragment>
                <Component {...props} />
                <AddedComponent {...props} />
            </Fragment>
        ) 
        : <Component {...props} />