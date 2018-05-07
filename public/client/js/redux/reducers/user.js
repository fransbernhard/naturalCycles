import { USER_LOGIN_SUCCESS } from "../action-types/index"

const user = (state = [], action) => {
  switch (action.type) {
    case USER_LOGIN_SUCCESS:
      return action.payload
    default:
      return state
  }
}

export default user
