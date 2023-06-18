import { Component } from "react";
import { Row } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import { ContentContainer, SidebarContainer } from "../../styles/sidebar/sidebar.styles";
import { SidebarMenu } from "../sidebarmenu/sidebarmenu.component";

class Sidebar extends Component {
    render() {
        return (
            <Row style={{ marginLeft: "2rem", zIndex: 2 }}>
                <SidebarContainer >
                    <SidebarMenu/>
                </SidebarContainer>
                <ContentContainer>
                    <Outlet />
                </ContentContainer> 
            </Row>
        );
    }
}

export default Sidebar;