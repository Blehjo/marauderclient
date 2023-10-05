import { Component } from "react";
import { Editor } from "../../store/editor/editor.types";
import { ContainShapes, SelectShape } from "../../styles/editor/editor.styles";

interface IShapes {
    shapes: Editor[];
}

class ShapesContainer extends Component<IShapes> {
    constructor(props: IShapes) {
        super(props);
    }
    render() {
        const { shapes } = this.props;
        return (
            <ContainShapes>
                {shapes.length > 0 && <div>Select</div>}
                {
                    shapes.length > 0 ?
                    shapes.map(({ shapeId, shapeName }) => (
                        <SelectShape key={shapeId}>{shapeName}</SelectShape> 
                    )) : <div>Select a file</div>
                }
            </ContainShapes>
        )
    }
}

export default ShapesContainer;