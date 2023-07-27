import { Component, Dispatch } from "react";
import { DivContainer, UiContainer } from "../../styles/editor/editor.styles";
import { ConnectedProps, connect } from "react-redux";
import { Dropdown } from "react-bootstrap";
import { SetColor, SetShape, setColor, setShape } from "../../store/editor/editor.action";
import { RootState } from "../../store/store";

export type SelectorProps = {
  show: boolean;
}

const options: Array<string> = [
  "box", "sphere", "cone", "cylinder", "tube", "cone", "torus", "torus knot", "tetrahedron", "polyhedron", "icosahedron", "octahedron", "dodecahedron", "extrude", "lathe"
]

export class Selectors extends Component<any, SelectorProps> {
  constructor(props: any) {
    super(props);
    this.state = {
      show: false
    }
    this.openModal = this.openModal.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  openModal() {
    this.setState({
      show: !this.state.show
    });
  }

  handleSelect(value: string) {
    this.props.handleShape(value);
  }

  render() {
    const { shape } = this.props;
    const { show } = this.state;

    return (
      <UiContainer>
        <DivContainer onClick={this.openModal}>+</DivContainer>
        <DivContainer>-</DivContainer>
        <DivContainer>|</DivContainer>
        <DivContainer>#</DivContainer>
        <DivContainer>@</DivContainer>
        <DivContainer>O</DivContainer>
          {
            show &&
            <Dropdown style={{ position: 'absolute', left: '2%', marginBottom: '1rem' }}>
              <Dropdown.Toggle variant="dark" id="dropdown-autoclose-true">{shape}</Dropdown.Toggle>
              <Dropdown.Menu>
                {
                  options.map((option) => (
                    <div onClick={() => this.handleSelect(option)}>{option}</div>
                  ))
                }
              </Dropdown.Menu>
            </Dropdown>
          }
      </UiContainer>
    );
  }
}