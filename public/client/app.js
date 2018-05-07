import React, {Component} from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import {
    BrowserRouter as Router,
    Route,
    Redirect,
    Switch
} from 'react-router-dom'
import './app.scss'

import Home from './js/components/Home.js'
import Header from './js/components/common/Header.js'
import Footer from './js/components/common/Footer.js'
import LoginForm from './js/components/LoginForm.js'

import store from './js/redux/store/index'

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <Header />
          <Switch>
            <Route exact path={'/'} component={Home}/>
            <Route render={() => { return <Redirect to="/" />}} />
          </Switch>
        </div>
      </Router>
    </Provider>
  )
}

render(<App/>, document.getElementById('app'))

if (module.hot) { module.hot.accept() }
