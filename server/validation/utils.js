module.exports.isEmpty = value => (
    value === undefined ||
    value === null ||
    (typeof value === 'object' && Object.keys(value).length === 0) ||
    (typeof value === 'string' && value.trim().length === 0) ||
    (typeof value === 'array' && value.length === 0)
)

/**
 * Delete properties from object containing only
 * empty string and/or spaces.
 * 
 * WARNING: Intended to work only for root level props.
 */
module.exports.undefinize = obj => {
    const object = { ...obj }
    for (let i in object)
        if (typeof object[i] === 'string' && /^\s*$/.test(object[i]))
            delete object[i]
    return object
}