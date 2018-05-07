import {Link} from 'react-router-dom'
import React, { Component } from 'react'
import { connect } from 'react-redux'

import fb from '../../Database'

class Header extends Component {
  constructor(props){
    super(props)
    this.handleLogout = this.handleLogout.bind(this)

    fb.auth().onAuthStateChanged(user => {
			const logoutBtn = document.getElementById("logoutBtn")
      const welcomeTitle = document.getElementById("welcomeTitle")

			if(user){
				logoutBtn.classList.remove('hide')
        welcomeTitle.classList.remove('hide')
			} else {
				logoutBtn.classList.add('hide')
        welcomeTitle.classList.add('hide')
			}
	  })
  }

  handleLogout(e){
    e.preventDefault()
    fb.auth().signOut()
  }

  render(){
    return(
      <header>
        <nav>
          <ul className="menu-ul">
            <h1 id="welcomeTitle" >Welcome {this.props.user ? this.props.user : "stranger"}</h1>
            <button id="logoutBtn" className="logoutBtn hide" onClick={this.handleLogout}>Logout</button>
          </ul>
        </nav>
      </header>
    )
  }
}

const mapStateToProps = user => {
  return user
}

export default connect(mapStateToProps,)(Header);
