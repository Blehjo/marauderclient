import { Component } from "react";
import { Dropdown } from "react-bootstrap";
import { DivContainer, DropDownContainer, UiContainer } from "../../styles/editor/editor.styles";
import { File } from "react-bootstrap-icons";
import { Editor } from "../../store/editor/editor.types";
import { Gltf } from "../../store/gltf/gltf.types";

export type SelectorProps = {
  show: boolean;
  deleteMode: boolean;
  fileMode: boolean;
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
      fileMode: false
    }
    this.openDropwDown = this.openDropwDown.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.openDelete = this.openDelete.bind(this);
    this.openFiles = this.openFiles.bind(this);
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
      console.log("FILE::: ", this.props.file)
      console.log("SHAPES::: ", this.props.shapes)
    }
  }

  render() {
    const { shapes, shape, files, file } = this.props;
    const { show, deleteMode, fileMode } = this.state;
    return (
      <UiContainer>
        <DivContainer key={"+"} onClick={this.openDropwDown}>+</DivContainer>
        <DivContainer key={"-"} onClick={this.openDelete}>-</DivContainer>
        <DivContainer key={"file"} onClick={this.openFiles}><File/></DivContainer>
        <DivContainer key={"#"}>#</DivContainer>
        <DivContainer key={"@"}>@</DivContainer>
        <DivContainer key={"0"}>O</DivContainer>
          {
            show &&
            <Dropdown key="show" autoClose style={{ position: 'fixed', left: '34%', top: '15%', marginBottom: '1rem' }}>
              <Dropdown.Toggle key="toggleshow" variant="dark" id="dropdown-autoclose-true">{shape}</Dropdown.Toggle>
              <Dropdown.Menu key="showmenu" variant="dark">
                {
                  options.map((option) => (
                    <DropDownContainer key={option} onClick={() => this.handleSelect(option, file.gltfId)}>{option}</DropDownContainer>
                  ))
                }
              </Dropdown.Menu>
            </Dropdown>
          }
          {
            deleteMode &&
            <Dropdown key="delete" autoClose style={{ position: 'fixed', left: '41%', top: '15%', marginBottom: '1rem' }}>
              <Dropdown.Toggle key="toggledelete" variant="dark" id="dropdown-autoclose-true">Delete</Dropdown.Toggle>
              <Dropdown.Menu key="deletemenu" variant="dark">
                {
                  shapes.map(({ shapeId, shapeName }: Editor) => (
                    <DropDownContainer key={shapeId} onClick={() => this.handleDelete(shapeId)}>{shapes.length > 0 ? shapeName : "Nothing to delete"}</DropDownContainer>
                  ))
                }
              </Dropdown.Menu>
            </Dropdown>
          }
          {
            fileMode &&
            <Dropdown key="fiile" autoClose style={{ position: 'fixed', left: '48%', top: '15%', marginBottom: '1rem' }}>
              <Dropdown.Toggle key="toggleFiles" variant="dark" id="dropdown-autoclose-true">Files</Dropdown.Toggle>
              <Dropdown.Menu key="filemenu" variant="dark">
                {
                  files.map(({ gltfId, fileInformation }: Gltf) => (
                    <DropDownContainer key={gltfId} onClick={() => this.getFile(gltfId!)}>{files.length > 0 ? fileInformation : "Nothing to delete"}</DropDownContainer>
                  ))
                }
              </Dropdown.Menu>
            </Dropdown>
          }
      </UiContainer>
    );
  }
}