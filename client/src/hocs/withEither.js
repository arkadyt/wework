import React from 'react'

export const withEither = (conditionFn, EitherComponent) => Component => props => {
    return conditionFn(props)
        ? <EitherComponent {...props} />
        : <Component {...props} />
}