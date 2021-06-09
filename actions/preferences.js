import { submitPerference } from "../utils/SunshinePreferences"

export const RECEIVE_PREFERENCES = "RECEIVE_PREFERENCES" //receive datas from our SunshinePreferences (the AsyncStorage)
export const SAVE_PEREFERENCE = "SAVE_PEREFERENCE"

export function receivePreferences (preferences) {
  return {
    type: RECEIVE_PREFERENCES,
    preferences,
  }
}

function savePerference ({ key, fieldToUpdate, value }) {
  return {
    type: SAVE_PEREFERENCE,
    key,
    fieldToUpdate,
    value,
  }
}

//Dont forget to add your redux thunk middleware to run actions like this
export const handleSavePerference = ({ key, fieldToUpdate, value }) => async (dispatch) => {
  try {

    await submitPerference({key, value})
    dispatch(savePerference({key, fieldToUpdate, value}))
  
    }catch(e){
      console.warn('Error in handleSavePerference: ', e)
    }
}