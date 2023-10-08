import { Component } from "react";
import World from "../../components/world/world.component";
import { Dot } from "../../styles/editor/editor.styles";
import { ConnectedProps, connect } from "react-redux";
import { RootState } from "../../store/store";

type OdysseyProps = ConnectedProps<typeof connector>;

class Odyssey extends Component<OdysseyProps> {
    render() {
        const { sidemenu } = this.props;
        return (
            <div style={{ height: '100vh' }}>
                <World/>
                <Dot style={sidemenu ? { marginLeft: '8rem' } : { visibility: 'visible' }}/>
            </div>
        );
    }
}

const mapStateToProps = (state: RootState) => ({
    sidemenu: state.messagebox.isMaraudersOpen
});

const mapDispatchToProps = () => ({
});

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(Odyssey);