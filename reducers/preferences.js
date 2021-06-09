import { RECEIVE_PREFERENCES, SAVE_PEREFERENCE } from '../actions/preferences'

export default function sunshinePreferences (state = [], action) {
  switch (action.type) {
    case RECEIVE_PREFERENCES : //when this runs, state will always be first empty. THis is simialar action to initial data for your app
      return action.preferences
    case SAVE_PEREFERENCE :
      const { key, fieldToUpdate, value } = action
      return state.map(pref => pref.prefKey != key ? pref : //we still have the order of our preference intact even after updating the save preference
          Object.assign({}, pref, { [fieldToUpdate]: value }))
    default :
      return state
  }
}