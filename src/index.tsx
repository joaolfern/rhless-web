import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import relativeTime from 'dayjs/plugin/relativeTime'
import locale from 'dayjs/locale/pt-br'
import dayjs from 'dayjs'

dayjs.locale(locale)
dayjs.extend(relativeTime)

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
