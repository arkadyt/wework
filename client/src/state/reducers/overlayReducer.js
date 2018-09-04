import * as types from '../actions/types'

/**
 * Some thoughts on dismissing overlays.
 * There may be many, one over another, if a particular component wants to dismiss one,
 * others on top must be dismissed as well (if they depend on the underlying ofc).
 * 
 * I think a good way to store dependant ovls is a linked list...
 * but that's not required because backdrop limit's user interaction only to the front one.
 * 
 * So we're going to use an array.
 * .addOvl() -- returns idx
 * .dropOvl(idx) 
 * 
 * Or object:
 * [In store code:] const ovls = {}
 * ...
 * .addOvl('key') -- sets an object property, returns true (false if unsuccessful)
 * .dropOvl('key') -- deletes the property
 * 
 * Using object seems to keep stuff more readable and organized. Let's go with it.
 * And also don't make you dependant on the item order which is smth you don't have
 * a well controll over.
 * 
 * USAGE:
 * require methods from dispatch:
 * this.props.addOvl(key)
 * this.props.dropOvl(key)
 * 
 * subscribe to the 'ovls' object:
 * if (this.props.ovls[key]) { return <Overlay>{...componentSpecificToTheKey}</Overlay> }
 * if (this.props.ovls[key2]) { return <Overlay>{...componentSpecificToTheKey}</Overlay> }
 * if (this.props.ovls[key3]) { return <Overlay>{...componentSpecificToTheKey}</Overlay> }
 *
 * if setting a value to false should display dismiss confirmation window:
 * in the 'else if' block following the if show a dismiss window.
 * - Small note: then you should not rely on falsy/truthy values, instead you would need 
 *      to explicitly check against boolean values,
 *      and do not show an overlay when key is undefined. 
 * 
 * A point against dismiss windows:
 * - They make UI annoying, but sometimes they are required, such as when filling out 
 *   a long form. Nobody wants to lose something they have invested into.
 * - But nobody would use my website that intensively, as it exists merely for skill
 *   demonstrating purposes. Worth implementing dismissing?
 * Maybe. At least I have a plan now.
 * 
 * Questions:
 * What if I navigate out? componentWillUnmount() { dropOvl(['keys']) }
 */
const initialState = {}

export default (state = initialState, action) => {
    switch (action.type) {
        case types.DISMISS_OVERLAY:
            const { [action.key]: _, ...rest } = state;
            return rest
        case types.ADD_OVERLAY:
            return {
                ...state,
                [action.key]: true
            }
        default:
            return state
    }
}