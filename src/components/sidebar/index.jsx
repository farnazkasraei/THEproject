// this is not component, it is view in layout.
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@components/ui/sheet';
import { useSelector } from 'react-redux';
import { toggleSideBar } from '@/store/slices/sideBar';
import { useDispatch } from 'react-redux';
import SideMenu from './body/menu';
import RegisterForm from './body/registerForm';

const Sidebar = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector(state => state.sidebar.isOpen);
  const type = useSelector(state => state.sidebar.type);
  const direction = useSelector(state => state.language.direction);

  const handleToggle = () => {
    dispatch(toggleSideBar('menu'));
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
          <SheetContent side={direction === 'rtl' ? 'right' : 'left'} className='min-w-64'>
            {type === 'menu' ? <SideMenu /> : <RegisterForm type={type} />}
          </SheetContent>
        </Sheet>
      </div>
    )
  );
};

export default Sidebar;
