import React, { createContext, useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

export const Context = createContext({isAuthentication: false})

const AppWrapper = () => {
  const [isAuthentication, setisAuthentication] = useState(false)
  const [user, setUser] = useState({})
  return (
    <Context.Provider value={{isAuthentication, setisAuthentication, setUser, user}}>
      <App />
    </Context.Provider>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>,
)
