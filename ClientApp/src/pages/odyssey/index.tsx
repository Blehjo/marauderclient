import { Component } from "react";
import World from "../../components/world/world.component";
import { Dot } from "../../styles/editor/editor.styles";

class Odyssey extends Component {
    render() {
        return (
            <>
                <World/>
                <Dot/>
                    
            </>
        );
    }
}

export default Odyssey;