import P from '@/components/translate';
import { Button } from '@/components/ui/button';
import { toggleSideBar } from '@/store/slices/sideBar';
import { Home } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

export default function SideMenu() {
  const dispatch = useDispatch();

  const handleToggle = () => {
    dispatch(toggleSideBar('register'));
  };
  return (
    <nav className='space-y-2 mt-16'>
      <Button variant='ghost' asChild>
        <Link to='/register' className='flex items-center gap-2' onClick={handleToggle}>
          <Home className='h-4 w-4' />
          <P translate>Register</P>
        </Link>
      </Button>
    </nav>
  );
}
