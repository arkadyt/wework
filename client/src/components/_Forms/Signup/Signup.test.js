/**
 * Contract:
 *
 * What my component renders?
 * (snapshot testing)
 * - form containing 4 text fields
 *   1 div with 1 submit field and 1 text span
 *
 * What do I pass to components I render?
 * (props passing)
 * Look at:
 * - Redirect
 * - form
 * - name field
 * - email field
 * - password field
 * - password confirmation field
 * - submit field
 * - Link component
 *
 * What effects do the props I receive have?
 * (props effects)
 * - subfields in [errors] object cause Field components to show error spans right below input fields
 * - vice versa is true: no errors, no red texts
 * - if user is authed, visiting /signup would redirect him to /profile
 * - if user isn't authed, visiting /signup would show Signup component
 *
 * How do I use functions (any of them)?
 * (functions)
 * - 4 thunk functions must be called with correct args
 * - onSubmit must preventDefault(), call all 4 thunk actions and history.push()
 * - Fields' onChange functions receive event obj and call setState correctly
 *
 * What does the state hold?
 * (state)
 * - name field data
 * - email textfield data
 * - password field data
 * - pwd confirmation field data
 *
 * How and When do I update/invalidate state? 
 * (state)
 * - When user types, Fields update respective state parts through setState calls
 * - No invalidation occurs throughout the whole lifecycle of the component
 *
 * How state affects other components?
 * (state)
 * - Updates text in text Fields
 *
 * Any context?
 * (context)
 * - react-router
 *   > history.push()
 *
 * Lifecycle hooks side effects?
 * - N/A
 *
 * Public ref API?
 * - N/A
 *
 * What happens when user interacts with my component?
 * (interaction)
 * - When user types, respective fields update state through setState calls
 * - When user clicks on [Submit] button form's onSubmit function is called
 * - When user clicks on login <Link> it navigates to /login
 * - Manually visiting /signup while authenticated redirects to /profile
 */
