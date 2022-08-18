import { useRender } from '../../hooks';
import tempHeader from './header.html';

export default Header = () => {
  useRender.append("#root", tempHeader);
}