import thunk from 'redux-thunk'
import { applyMiddleware } from 'redux'

export default applyMiddleware(
  thunk, //which takes the functions and executes them, thereby obtaining actions to pass to the reducers. Without this you cant run functions like handleSavePerference() at /actions/preferences
)