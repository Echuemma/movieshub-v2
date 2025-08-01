import React from 'react'
import Header from './Header'
import { Outlet, useNavigation } from 'react-router-dom'
import Footer from './Footer'

const MainLayout = () => {
  const navigation = useNavigation()
  const isLoading = navigation.state === 'loading';

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="loader">
          Loading...
        </div>
      </div>
    )
  }  
  return (
    <div>
      <Header />
      <main className='w-[100%] mx-auto min-h-screen max-w-[1920px]  '>
        {isLoading ? <Loader/> : <Outlet />}
      </main>
      <Footer />
    </div>
  )
}

export default MainLayout
