import { Component, ReactNode } from "react";
import { SandlotContainer } from "../../styles/sandlot/sandlot.styles";

interface ISandlot {
    children: ReactNode[] | ReactNode;

}

class Sandlot extends Component<ISandlot> {
    render() {
        const { children } = this.props;
        return (
            <SandlotContainer>
                This is the sandlot. Have fun!
                {children}
            </SandlotContainer>
        );
    }
}

export default Sandlot;