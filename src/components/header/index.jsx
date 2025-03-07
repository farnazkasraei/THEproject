import { Link } from 'react-router-dom';
import { Sun, Moon, Menu } from 'lucide-react';
import { Button } from '@components/ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { setLanguage } from '@/store/slices/languageSlice';
import P from '../translate';
import { useEffect, useMemo } from 'react';
import { toggleTheme } from '@/store/slices/themeSlice';
import { toggleSideBar } from '@/store/slices/sideBarSlice';

const Header = () => {
  const dispatch = useDispatch();
  const direction = useSelector(state => state.language.direction);
  const theme = useSelector(state => state.theme.theme);
  const language = useSelector(state => state.language.language);

  // Apply direction and theme to the <html> element
  useEffect(() => {
    const htmlElement = document.documentElement;
    htmlElement.setAttribute('dir', direction);
    htmlElement.setAttribute('data-theme', theme === 'dark' ? 'dark' : 'light');
  }, [direction, theme]);

  // Calculate the position of the menu button based on the direction
  const menuButtonPosition = useMemo(() => {
    const style = {};
    if (direction === 'rtl') {
      style.left = '0';
    } else {
      style.right = '0';
    }
    if (theme === 'dark') {
      style.background = 'rgba(255, 255, 255, 0.1)';
    } else {
      style.background = 'rgba(0, 0, 0, 0.1)';
    }
    return style;
  }, [direction]);

  return (
    <header className='bg-background border-b sticky top-0 z-50'>
      <div className='container mx-auto flex items-center justify-between p-4'>
        {/* Menu Button and Logo */}
        <div className='flex items-center gap-40'>
          <Button
            variant='ghost'
            style={menuButtonPosition}
            onClick={() => dispatch(toggleSideBar())}
          >
            <Menu className={`h-4 w-4`} />
          </Button>
          <Link to='/' className='flex items-center gap-2'>
            <span className='text-lg font-semibold'>
              <P translate>the project</P>
            </span>
          </Link>
        </div>

        {/* Theme and Language Buttons */}
        <nav className='flex items-center gap-4'>
          <Button
            onClick={() => dispatch(toggleTheme())}
            aria-label='Toggle theme'
            className={theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}
          >
            {theme === 'dark' ? <Sun className='h-4 w-4' /> : <Moon className='h-4 w-4' />}
          </Button>
          <Button
            onClick={() => dispatch(setLanguage(language === 'en' ? 'fa' : 'en'))}
            aria-label='Toggle language'
            className={theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}
          >
            {language === 'en' ? 'FA' : 'EN'}
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
