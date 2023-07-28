import { Component } from "react";
import { Dropdown } from "react-bootstrap";
import { DivContainer, DropDownContainer, UiContainer } from "../../styles/editor/editor.styles";

export type SelectorProps = {
  show: boolean;
  deleteMode: boolean;
}

const options: Array<string> = [
  "box", "sphere", "cone", "cylinder", "tube", "torus", "torus knot", "tetrahedron", "polyhedron", "icosahedron", "octahedron", "dodecahedron", "extrude", "lathe"
]

export class Selectors extends Component<any, SelectorProps> {
  constructor(props: any) {
    super(props);
    this.state = {
      show: false,
      deleteMode: false
    }
    this.openDropwDown = this.openDropwDown.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.openDelete = this.openDelete.bind(this);
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

  handleSelect(value: string) {
    this.props.addShape(value);
    this.openDropwDown();
  }

  handleDelete(shapeId: number) {
    this.props.deleteShape(shapeId);
    this.openDelete();
  }

  componentDidMount(): void {
    this.props.fetchShapes();
  }

  componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<SelectorProps>, snapshot?: any): void {
    if (prevProps.shapes.length != this.props.shapes.length) {
      this.props.fetchShapes();
    }
  }

  render() {
    const { shapes, shape } = this.props;
    const { show, deleteMode } = this.state;
    return (
      <UiContainer>
        <DivContainer key={"+"} onClick={this.openDropwDown}>+</DivContainer>
        <DivContainer key={"-"} onClick={this.openDelete}>-</DivContainer>
        <DivContainer key={"|"}>|</DivContainer>
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
                    <DropDownContainer key={option} onClick={() => this.handleSelect(option)}>{option}</DropDownContainer>
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
                  shapes.map(({ shapeId, shapeName }) => (
                    <DropDownContainer key={shapeId} onClick={() => this.handleDelete(shapeId)}>{shapes.length > 0 ? shapeName : "Nothing to delete"}</DropDownContainer>
                  ))
                }
              </Dropdown.Menu>
            </Dropdown>
          }
      </UiContainer>
    );
  }
}