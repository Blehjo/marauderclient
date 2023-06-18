import { Component, ReactNode } from "react";
import { Container } from 'reactstrap';
import { LayoutContainer } from "../../styles/layout/layout.styles";
import NavMenu from "../navmenu/navmenu.component";
import Sidebar from "../sidebar/sidebar.component";

type Props = {
  children: ReactNode
}

export class Layout extends Component<Props> {
  static displayName = Layout.name;

  render() {
  return (
    <LayoutContainer>
      <NavMenu />
      <Sidebar />
      <Container tag="main">
        {this.props.children}
      </Container>
    </LayoutContainer>
  );
  }
};
export default Layout;