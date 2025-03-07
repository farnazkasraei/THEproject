import { useSelector } from 'react-redux';
import { getTranslations } from '../../store/slices/languageSlice';

const P = ({ children, translate, ...props }) => {
  const language = useSelector(state => state.language.language);
  const translations = getTranslations(language);

  const translatedText = translate ? translations[children] || children : children;

  return <p {...props}>{translatedText}</p>;
};

export default P;
