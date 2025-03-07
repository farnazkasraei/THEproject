import { Outlet } from 'react-router-dom';
import Header from '@components/header/index';
import Sidebar from '@components/sidebar/index';

const MainLayout = () => {
  console.log('MainLayout');
  return (
    <div className='min-h-screen text-foreground'>
      {/* Header */}
      <Header />

      <div className='flex'>
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <main className='flex-1 w-full h-full'>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
