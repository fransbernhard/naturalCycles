import React, { Component } from 'react'
import fb from '../Database'

import { connect } from 'react-redux'
import { bindActionCreators } from "redux"
import { fetchAll, loginUserSuccess } from "../redux/actions/index"

import image from '../../img/four.jpg';
import Posts from './Posts.js'

import LoginForm from './LoginForm.js'

var bgStyle = {
  width: "100vw",
  minHeight: "90vh",
  backgroundImage: "url(" + image + ")"
}

class Home extends Component {
  constructor(props){
    super(props)
    fb.auth().onAuthStateChanged(user => {
      if(user){
        this.props.loginUserSuccess(user.displayName)
      }
    })

    const URL = 'https://jsonplaceholder.typicode.com/posts'
    this.props.fetchAll(URL)
  }

  render(){
    return (
      <div className="bg" style={bgStyle}>
        <div className="home-wrapper">
          <LoginForm />
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({fetchAll, loginUserSuccess}, dispatch)
}

export default connect(null, mapDispatchToProps)(Home);
