import { Component, ReactNode } from "react";
import { PanelContainer } from "../../styles/panel/panel.styles";

type PanelProps = {
    children: ReactNode[] | ReactNode;
}

class Panel extends Component<PanelProps> {
    render() {
        const { children } = this.props;
        return (
            <PanelContainer>
                This is the panel component!
                {children}
            </PanelContainer>
        );
    }
}

export default Panel;