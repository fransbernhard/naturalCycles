import { FETCH_REQUEST, FETCH_ERROR } from "../action-types/index"

const fetch = (state = [], action) => {
  switch (action.type) {
    case FETCH_REQUEST:
      return state
    case FETCH_ERROR:
      return "Error in fetch"
    default:
      return state
  }
}

export default fetch
