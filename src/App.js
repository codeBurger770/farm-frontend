import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import store from './redux/store'
import MainRoute from './routes/MainRoute'

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <MainRoute />
      </BrowserRouter>
    </Provider>
  )
}
