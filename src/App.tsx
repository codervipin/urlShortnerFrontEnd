import { RouterProvider } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import route from './routes/routes'
import Header from './components/Header'
import { Toaster } from 'react-hot-toast'

const App = ()=> {

  return (
    <>
    <Header/>
    <RouterProvider router={route}>
    </RouterProvider>  
    <Toaster/>
    </>
  )
}

export default App
