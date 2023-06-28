import { Layout, LayoutProps } from 'react-admin';
import ElemAppBar from './elem-app-bar';

const ElemLayoutApp = (props: LayoutProps) => (
  <Layout {...props} appBar={ElemAppBar} />
);

export default ElemLayoutApp;
