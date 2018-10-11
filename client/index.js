import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {Router} from 'react-router-dom'
import history from './history'
import store from './store'
import Navbar from './components/Sidebar/Navbar'
import Footer from './components/Footer/Footer'
import Routes from './routes'
import styles from './components/Utils/Global.css'

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Navbar>
        <div style={styles.content}>
          <Routes />
        </div>
        <Footer />
      </Navbar>
    </Router>
  </Provider>,
  document.getElementById('app')
)
