import { Component } from "react";
import { DragAndDropContainer } from "../../styles/draganddrop/draganddrop.styles";
import Panel from "../../components/panel/panel.component";
import Note from "../../components/note/note.component";
import Sandlot from "../../components/sandlot/sandlot.component";
import ResponsiveMemory from "../../components/responsivememory/responsivememory.component";

class DragAndDrop extends Component {

    handlePanels() {
        const panels = [];
        const position = [1, 1];
        for (let i=0 ;i<=64; ++i) {
            panels.push(this.renderPanel(i, position));
        };
        return panels;
    }
    
    renderPanel(i: number, position: Array<number>) {
        const x = i % 8;
        const y = Math.floor(i/8);
        const hasNote = position[0] === x && position[1] === y;
        const note = hasNote ? <Note/> : null;
        return <Panel>{note}</Panel>
    }

    render() {
        return (
            <DragAndDropContainer>
                <Sandlot>
                    {this.handlePanels()} 
                </Sandlot>
            </DragAndDropContainer>
        );
    }
}

export default DragAndDrop;