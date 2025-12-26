import { Outlet } from 'react-router'
import Navbar from '../components/Navbar';

function MainLayout() {
  return (
    <>
     <div className="flex flex-col h-screen">
      <Navbar />
      <main className="flex-1 bg-purple-mesh opacity-80 inset-1 pt-20">
        <Outlet />
      </main>
    </div>
    </>
  )
}

export default MainLayout;