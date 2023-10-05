import { Component } from "react";
import { Dropdown } from "react-bootstrap";
import { ContainShapes, DivContainer, DropDownContainer, SelectShape, UiContainer } from "../../styles/editor/editor.styles";
import { Database, Download, File, Pentagon, SkipStartCircle, X } from "react-bootstrap-icons";
import { Editor } from "../../store/editor/editor.types";
import { Gltf } from "../../store/gltf/gltf.types";
import ShapesContainer from "./shapes.component";

export type SelectorProps = {
  show: boolean;
  deleteMode: boolean;
  fileMode: boolean;
  shapesMode: boolean;
}

const options: Array<string> = [
  "box", "sphere", "cone", "cylinder", "tube", "torus", "torus knot", "tetrahedron", "polyhedron", "icosahedron", "octahedron", "dodecahedron", "extrude", "lathe"
]

export class Selectors extends Component<any, SelectorProps> {
  constructor(props: any) {
    super(props);
    this.state = {
      show: false,
      deleteMode: false, 
      fileMode: false,
      shapesMode: false
    }
    this.openDropwDown = this.openDropwDown.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.openDelete = this.openDelete.bind(this);
    this.openFiles = this.openFiles.bind(this);
    this.openShapes = this.openShapes.bind(this);
  }

  openDropwDown() {
    this.setState({
      show: !this.state.show
    });
  }

  openDelete() {
    this.setState({
      deleteMode: !this.state.deleteMode
    })
  }

  openFiles() {
    this.setState({
      fileMode: !this.state.fileMode
    })
  }

  openShapes() {
    this.setState({
      shapesMode: !this.state.shapesMode
    })
  }

  handleSelect(value: string, gltfId: number): void {
    this.props.addShape(value, gltfId);
    this.openDropwDown();
  }

  handleDelete(shapeId: number): void {
    this.props.deleteShape(shapeId);
    this.openDelete();
  }

  getFile(gltfId: number): void {
    this.props.getFile(gltfId);
  }

  componentDidMount(): void {
    if (this.props.file?.gltfId != null) {
      this.props.fetchShapes(this.props.file.gltfId);
    }
    this.props.getAllFiles();
  }

  componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<SelectorProps>, snapshot?: any): void {
    if (prevProps.shapes.length != this.props.shapes.length) {
      this.props.fetchShapes(this.props.file.gltfId);
    }
    if (prevProps.file != this.props.file) {
      this.props.fetchShapes(this.props.file.gltfId);
    }
  }

  render() {
    const { shapes, shape, files, file, sidemenu } = this.props;
    const { show, deleteMode, fileMode, shapesMode } = this.state;
    // const fileName = file.fileInformation;
    return (
      <UiContainer style={sidemenu ? { marginLeft: '8rem' } : { visibility: 'visible' }}>
        <DivContainer key={"add"} onClick={this.openDropwDown}>+</DivContainer>
        <DivContainer key={"delete"} onClick={this.openDelete}><X/></DivContainer>
        <DivContainer key={"file"} onClick={this.openFiles}><Database/></DivContainer>
        <DivContainer key={"shapes"} onClick={this.openShapes}><Pentagon/></DivContainer>
        <DivContainer key={"download"}><Download/></DivContainer>
        <DivContainer key={"restart"}><SkipStartCircle/></DivContainer>
        {
          show &&
          <ContainShapes key="show" style={{ position: 'absolute', top: '125%', left: '13%' }}>
              {
                options.map((option) => (
                  <SelectShape key={option} onClick={() => this.handleSelect(option, file.gltfId)}>{option}</SelectShape>
                ))
              }
          </ContainShapes>
        }
        {
          deleteMode &&
          <ContainShapes key="deleteItem" style={{ position: 'absolute', left: '27%', top: '125%', marginBottom: '1rem' }}>
            <div>Delete</div>
            {
              shapes.map(({ shapeId, shapeName }: Editor) => (
                <SelectShape key={shapeId} onClick={() => this.handleDelete(shapeId)}>{shapes.length > 0 ? shapeName : "Nothing to delete"}</SelectShape>
              ))
            }
          </ContainShapes>
        }
        {
          fileMode &&
            <ContainShapes style={{ left: '41%' }}>
              <div>Files</div>
            {
              files.map(({ gltfId, fileInformation }: Gltf) => (
                <SelectShape style={file?.fileInformation == fileInformation ? {background: 'rgb(255,83,73)', borderRadius: '.2rem' } : {visibility: 'visible'}} key={gltfId} onClick={() => this.getFile(gltfId!)}>{files.length > 0 ? fileInformation : "Nothing to choose"}</SelectShape>
              ))
            }
            </ContainShapes>
        }
        {
          shapesMode && <ShapesContainer shapes={shapes}/>
        }
      </UiContainer>
    );
  }
}