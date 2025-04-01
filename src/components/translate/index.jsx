import { useSelector } from 'react-redux';
// create allias for the path
import { getTranslations } from '../../store/slices/language';

const P = ({ children, translate, ...props }) => {
  const language = useSelector(state => state.language.language);
  const translations = getTranslations(language);

  const translatedText = translate ? translations[children] || children : children;

  return <p {...props}>{translatedText}</p>;
};

export default P;
