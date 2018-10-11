import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {Router} from 'react-router-dom'
import history from './history'
import store from './store'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import Routes from './routes'

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Navbar>
        <div>
          <Routes />
        </div>
        <Footer />
      </Navbar>
    </Router>
  </Provider>,
  document.getElementById('app')
)
