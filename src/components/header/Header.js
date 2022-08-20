import { useRender, useReferences } from '../../hooks';
import tempHeader from './header.html';
import logoUrl from "../../../imgs/logo.png";

export default Header = () => {
  useRender.append("#root", tempHeader);
  useReferences.attr.set("#header-logo", "src", logoUrl);
}