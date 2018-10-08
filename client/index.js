import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {Router} from 'react-router-dom'
import history from './history'
import store from './store'
import Sidebar from './components/Navbar/Sidebar'

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Sidebar />
    </Router>
  </Provider>,
  document.getElementById('app')
)
