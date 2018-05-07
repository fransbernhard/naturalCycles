import * as types from "../action-types/index";
// import firebase from 'firebase'
import fb from '../../Database'

export const fetchAll = (URL) => {
  return (dispatch) => {
    dispatch({ type: types.FETCH_REQUEST })
    return fetchPosts(URL)
    .then(([response, json]) => {
      if(response.status === 200){
        dispatch(fetchPostsSuccess(json))
      } else {
        dispatch({ type: types.FETCH_ERROR })
      }
    }).catch(function(error) {
      console.log(error);
    })
  }
}

const fetchPosts = URL => {
  return fetch(URL, { method: 'GET'})
    .then( response => Promise.all([response, response.json()]))
}

const fetchPostsSuccess = payload => {
  return {
    type: types.FETCH_POSTS_SUCCESS,
    payload
  }
}

export const loginUserSuccess = payload => {
  return {
    type: types.USER_LOGIN_SUCCESS,
    payload
  }
}

export const loginUser = (email, password) => {
  return (dispatch) => {
    fb.auth().signInWithEmailAndPassword(email, password)
    .then((user) => {
      const currentUsr = fb.auth().currentUser
      dispatch(loginUserSuccess(currentUsr.displayName)) // set state
    }).catch(err => {
      console.log(err);
    })
  }
}
