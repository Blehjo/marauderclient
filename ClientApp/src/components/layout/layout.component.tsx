import { Component, Dispatch, ReactNode } from "react";
import { Container } from 'reactstrap';
import { AdjustedContainer, LayoutContainer } from "../../styles/layout/layout.styles";
import NavMenu from "../navmenu/navmenu.component";
import Sidebar from "../sidebar/sidebar.component";
import MessageBox from "../messagebox/messagebox.component";
import { ConnectedProps, connect } from "react-redux";
import { RootState } from "../../store/store";
import { CheckUserSession, checkUserSession } from "../../store/user/user.action";

type SidebarMenuProps = ConnectedProps<typeof connector>;

type Props  = SidebarMenuProps & {
  children: ReactNode
}

export class Layout extends Component<Props> {
  static displayName = Layout.name;

  render() {
    const { sidemenu } = this.props;
    return (
      <>
        {
          sidemenu ?
          <LayoutContainer>
            <NavMenu />
            <Sidebar />
            <Container style={{ height: '100vh' }} tag="main">
              {this.props.children}
            </Container>
            <MessageBox/>
          </LayoutContainer> : 
          <AdjustedContainer>
            <NavMenu />
            <Sidebar />
            <Container style={{ height: '100vh' }} tag="main">
              {this.props.children}
            </Container>
            <MessageBox/>
          </AdjustedContainer>
        }
      </>
    );
  }
};

const mapStateToProps = (state: RootState) => ({
  sidemenu: state.messagebox.isMaraudersOpen
});

const mapDispatchToProps = (dispatch: Dispatch<CheckUserSession>) => ({
  checkUserSession: () => dispatch(checkUserSession())
});

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(Layout);