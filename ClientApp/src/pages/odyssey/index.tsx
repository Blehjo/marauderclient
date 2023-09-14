import { Component } from "react";
import World from "../../components/world/world.component";
import { Dot } from "../../styles/editor/editor.styles";

class Odyssey extends Component {
    render() {
        return (
            <div style={{ height: '100vh' }}>
                <World/>
                <Dot/>
            </div>
        );
    }
}

export default Odyssey;