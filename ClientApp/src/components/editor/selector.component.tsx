import { ChangeEvent, Component, FormEvent, ReactNode } from "react";
import { Dropdown, Form, Modal } from "react-bootstrap";
import { ContainShapes, DivContainer, DropDownContainer, SelectShape, UiContainer } from "../../styles/editor/editor.styles";
import { Database, Download, File, Pentagon, Send, SkipStartCircle, X } from "react-bootstrap-icons";
import { Editor } from "../../store/editor/editor.types";
import { Gltf } from "../../store/gltf/gltf.types";
import ShapesContainer from "./shapes.component";

export type SelectorProps = {
  show: boolean;
  deleteMode: boolean;
  fileMode: boolean;
  shapesMode: boolean;
  fileInformation: string;
  showNewFileDialogue: boolean;
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
      fileInformation: "",
      shapesMode: false,
      showNewFileDialogue: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleFileClick = this.handleFileClick.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.openDelete = this.openDelete.bind(this);
    this.openDropwDown = this.openDropwDown.bind(this);
    this.openFiles = this.openFiles.bind(this);
    this.openShapes = this.openShapes.bind(this);
    this.submitGltfFile = this.submitGltfFile.bind(this);
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

  handleChange(event: ChangeEvent<HTMLInputElement>): void {
    const { name, value } = event.target;
    this.setState({ ...this.state, [name]: value });
}

  handleFileClick(): void {
    this.setState({
      ...this.state, showNewFileDialogue: !this.state.showNewFileDialogue
    });
  }

  submitGltfFile(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const { fileInformation } = this.state;
    this.props.createGltfFile(fileInformation);
    this.setState({
      showNewFileDialogue: !this.state.showNewFileDialogue
    })
    // console.log("FILES:: ", this.props.files)
    const file = this.props.gltfs?.gltfs.pop();
    this.getFile(file?.gltfId!)
}

  handleNewFile(): ReactNode {
    const { showNewFileDialogue } = this.state;
    return (
        <Modal show={showNewFileDialogue} onHide={this.handleFileClick}>
            <Modal.Header closeButton>New GLTF File</Modal.Header>
            <Form onSubmit={this.submitGltfFile}>
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="formMedia">
                        <Form.Control style={{ height: '.5rem' }} name="fileInformation" as="textarea" onChange={this.handleChange} placeholder=" Write your gltf project title here" />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                <button  style={{ textAlign: 'center', width: '100%', height: 'auto'}} className="btn btn-light" type="submit">
                    <Send/>
                </button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
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
    return (
      <UiContainer style={sidemenu ? { marginLeft: '8rem' } : { visibility: 'visible' }}>
        <DivContainer key={"add"} onClick={this.openDropwDown}>+</DivContainer>
        <DivContainer key={"delete"} onClick={this.openDelete}><X/></DivContainer>
        <DivContainer key={"file"} onClick={this.openFiles}><Database/></DivContainer>
        <DivContainer key={"shapes"} onClick={this.openShapes}><Pentagon/></DivContainer>
        <DivContainer key={"download"}><Download/></DivContainer>
        <DivContainer key={"restart"}><SkipStartCircle/></DivContainer>
        {this.handleNewFile()}
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
              <SelectShape onClick={this.handleFileClick}>Create File</SelectShape>
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