import { combineReducers } from 'redux'
import fetch from './fetch'
import posts from './posts'
// import banan from './banan'
import user from './user'

const app = combineReducers({
  fetch,
  posts,
  // banan,
  user
})

export default app;
