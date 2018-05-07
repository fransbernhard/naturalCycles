import React, {Component} from 'react';
// import fb from '../Da'

import fb from '../Database'

import { connect } from 'react-redux'
import { loginUser } from "../redux/actions/index"
import { bindActionCreators } from "redux"

class LoginForm extends Component {
	constructor(props){
    super(props);

		this.state = {
      email: '',
			username: '',
      password: ''
    }

    this.handleSubmitRegister = this.handleSubmitRegister.bind(this)
		this.handleSubmitLogin = this.handleSubmitLogin.bind(this)

		this.handleChangeEmail = this.handleChangeEmail.bind(this)
		this.handleChangeUsername = this.handleChangeUsername.bind(this)
    this.handleChangePwd = this.handleChangePwd.bind(this)

	  fb.auth().onAuthStateChanged(user => {

			const loginBtn = document.getElementById("loginBtn")
			const registerBtn = document.getElementById("registerBtn")
			const loginForm = document.getElementById("loginForm")
			const wText = document.getElementById("wText")

			if(user){
				console.log("USER IS LOGGED IN");
				registerBtn.classList.add('hide')
				loginBtn.classList.add('hide')
				loginForm.classList.add("hide")
				wText.classList.add('hide')
			} else {
				console.log("USER IS LOGGED OUT");
				registerBtn.classList.remove('hide')
				loginBtn.classList.remove('hide')
				loginForm.classList.remove("hide")
				wText.classList.remove('hide')
			}
	  })
  }

	registerUser(username, email, password) {
		const errorText = document.getElementById("wText")

		fb.auth().createUserWithEmailAndPassword(email, password)
			.then((user) => {
				user.updateProfile({
					displayName: username
				}).then(() => {
					console.log("displayName: " + username);
				}, (err) => {
					console.log("Error in setting displayName: " + err);
				})

				fb.database().ref(`users/${user.uid}`).set({
					username: username,
					email: email,
					password: password
				})

				errorText.innerHTML = ""

			}).catch(function(error){
				var errorCode = error.code;
				var errorMessage = error.message;
				errorText.innerHTML = errorMessage
			})
	}

	handleChangeEmail(e) {
    this.setState({
      email: e.target.value,
    })
  }

  handleChangePwd(e) {
    this.setState({
      password: e.target.value
    })
  }

	handleChangeUsername(e) {
		this.setState({
			username: e.target.value
		})
	}

	handleSubmitLogin(e) {
		 e.preventDefault()
		 this.props.loginUser(this.state.email, this.state.password)
	}

	handleSubmitRegister(e) {
		e.preventDefault()
		this.registerUser(this.state.username, this.state.email, this.state.password)
	}

	render(){
	  return (
      <div className="loginForm">
				<p className="wText hide" id="wText"></p>
        <form id="loginForm" className="hide">
					<input type="text" onChange={this.handleChangeUsername} placeholder="Username" name="uname" />
					<input type="text" onChange={this.handleChangeEmail} placeholder="Email" name="email" />
          <input type="password" onChange={this.handleChangePwd} placeholder="Password" name="psw" />
					<div className="btn-container">
						<button className="btn loginBtn" id="loginBtn" onClick={this.handleSubmitLogin}>Login</button>
						<button id="registerBtn" className="btn registerBtn" onClick={this.handleSubmitRegister}>Register</button>
					</div>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ loginUser }, dispatch)
}

const mapStateToProps = (state) => {
  return {
		user: state.user,
		banan: state.banan
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
