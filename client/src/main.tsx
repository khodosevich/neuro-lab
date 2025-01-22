import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'
import { store } from '../store/index'

createRoot(document.getElementById('root')!).render(
    <Provider store={ store }>
      <HashRouter>
        <App />
      </HashRouter>
    </Provider>  
  )
