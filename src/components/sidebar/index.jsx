import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { Home, User, Settings, Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@components/ui/sheet';
import { useSelector } from 'react-redux';
import { toggleSideBar } from '@/store/slices/sideBarSlice';
import { useDispatch } from 'react-redux';

const Sidebar = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector(state => state.sidebar.isOpen);
  const direction = useSelector(state => state.language.direction);

  const handleToggle = () => {
    dispatch(toggleSideBar());
  };

  return (
    isOpen && (
      <div className='md:hidden p-4'>
        <Sheet open={isOpen} onOpenChange={handleToggle}>
          <SheetTrigger asChild>
            <Button variant='outline' size='icon'>
              <Menu className='h-4 w-4' />
            </Button>
          </SheetTrigger>
          <SheetContent side={direction === 'rtl' ? 'right' : 'left'} className='w-64'>
            <nav className='space-y-2 mt-16'>
              <Button variant='ghost' asChild>
                <Link to='/register' className='flex items-center gap-2' onClick={handleToggle}>
                  <Home className='h-4 w-4' />
                  Register
                </Link>
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    )
  );
};

export default Sidebar;
