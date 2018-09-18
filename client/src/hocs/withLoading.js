import React, { Fragment } from 'react'

export const withLoading = (conditionFn, LoadingComponent) => Component => props =>
    conditionFn(props)
        ? (
            <Fragment>
                <Component {...props} />
                <LoadingComponent />
            </Fragment>
        ) 
        : <Component {...props} />