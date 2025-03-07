import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from './store/slices/themeSlice';
import Header from '@components/header';
import ThemeRoutes from './routes';

function App() {
  const dispatch = useDispatch();
  const theme = useSelector(state => state.theme.theme);

  const handleToggle = () => {
    dispatch(toggleTheme());
  };

  useEffect(() => {
    const htmlElement = document.documentElement;
    if (theme === 'dark') {
      htmlElement.setAttribute('data-theme', 'dark');
    } else {
      htmlElement.removeAttribute('data-theme');
    }
  }, [theme]);

  return <ThemeRoutes />;
}

export default App;
