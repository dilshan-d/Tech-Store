import './App.css'
import { Routes, Route } from 'react-router-dom'
import AdminPage from './pages/adminPage'
import HomePage from './pages/homePage'
import TestPage from './pages/test'
import LoginPage from './pages/logingPage'
import { Toaster } from 'react-hot-toast';
import AdminAddProductPage from './pages/admin/AdminAddProductPage';
import AdminEditProductPage from './pages/admin/AdminEditProductPage';
import ProductPage from './pages/productPage';
import UserRegsterPage from './pages/RegisterPage'

function App() {
  return (
      <div className='w-full min-h-screen flex flex-col bg-primary text-secondary font-sans antialiased selection:bg-blue-500/30 selection:text-white'>
        <Toaster position="top-right" />
        <Routes>
          <Route path='/*' element={<HomePage />} />
          <Route path='/admin/*' element={<AdminPage />} />
          <Route path='/test/*' element={<TestPage />} />
          <Route path='/login/*' element={<LoginPage/>} />
          <Route path='/add-product/*' element={<AdminAddProductPage />} />
          <Route path='/register/*' element={<UserRegsterPage/>}></Route>
        </Routes>
      </div>
  )
}

export default App