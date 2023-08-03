import { ChangeEvent, Component, Dispatch, ReactNode } from "react";
import { CardContainer, InfoContainer, OptionsContainer, VitalsContainer } from "../../styles/vitals/vitals.styles";
import { Form, Modal } from "react-bootstrap";
import { Send } from "react-bootstrap-icons";
import { RootState } from "../../store/store";
import { ConnectedProps, connect } from "react-redux";
import { EditorFetchAllStart, editorFetchAllStart } from "../../store/editor/editor.action";
import { GltfFetchUserStart, gltfFetchUserStart } from "../../store/gltf/gltf.action";
import Builder from "../builder";

interface IVitals {
    showNewFileDialogue: boolean;
    showNewTeam: boolean;
    showShapes: boolean;
    fileInformation: string;
    builder: boolean
}

type VitalsProps = ConnectedProps<typeof connector>;

class Vitals extends Component<VitalsProps, IVitals> {
    constructor(props: VitalsProps) {
        super(props);
        this.state = {
            showNewFileDialogue: false,
            showNewTeam: false,
            showShapes: false,
            fileInformation: "",
            builder: false
        }
        this.handleFileClick = this.handleFileClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleNewTeamClick = this.handleNewTeamClick.bind(this);
        this.handleViewShapes = this.handleViewShapes.bind(this);
        this.handleBuilderClick = this.handleBuilderClick.bind(this);
    }

    handleChange(event: ChangeEvent<HTMLInputElement>): void {
        const { name, value } = event.target;
        this.setState({ ...this.state, [name]: value });
    }

    handleBuilderClick(): void {
        this.setState({
            ...this.state, builder: !this.state.builder
        })
    }

    handleFileClick(): void {
        this.setState({
            ...this.state, showNewFileDialogue: !this.state.showNewFileDialogue
        });
    }

    handleNewTeamClick(): void {
        this.setState({
            ...this.state, showNewTeam: !this.state.showNewTeam
        });
    }

    handleViewShapes(): void {
        this.setState({
            ...this.state, showShapes: !this.state.showShapes
        });
    }

    handleNewFile(): ReactNode {
        const { showNewFileDialogue } = this.state;
        return (
            <Modal show={showNewFileDialogue} onHide={this.handleFileClick}>
                <Modal.Header closeButton>New GLTF File</Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formMedia">
                            <Form.Control style={{ height: '.5rem' }} name="fileInformation" as="textarea" onChange={this.handleChange} placeholder=" Write your gltf project title here" />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                <button  style={{ textAlign: 'center', width: '100%', height: 'auto'}} className="btn btn-light" type="submit">
                    <Send/>
                </button>
                </Modal.Footer>
            </Modal>
        )
    }

    handleTeamClick(): ReactNode {
        const { showNewTeam } = this.state;
        return (
            <Modal show={showNewTeam} onHide={this.handleNewTeamClick}>
                <Modal.Header closeButton>Create Community</Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formMedia">
                            <Form.Control style={{ height: '.5rem' }} name="fileInformation" as="textarea" onChange={this.handleChange} placeholder=" Write your gltf project title here" />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                <button  style={{ textAlign: 'center', width: '100%', height: 'auto'}} className="btn btn-light" type="submit">
                    <Send/>
                </button>
                </Modal.Footer>
            </Modal>
        )
    }

    handleViewCommunities(): ReactNode {
        const { showShapes } = this.state;
        return (
            <Modal show={showShapes} onHide={this.handleViewShapes}>
                <Modal.Header closeButton>View Communities</Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formMedia">
                            <Form.Control style={{ height: '.5rem' }} name="fileInformation" as="textarea" onChange={this.handleChange} placeholder=" Write your gltf project title here" />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                <button  style={{ textAlign: 'center', width: '100%', height: 'auto'}} className="btn btn-light" type="submit">
                    <Send/>
                </button>
                </Modal.Footer>
            </Modal>
        )
    }

    componentDidMount(): void {
        this.props.fetchShapes();
    }

    render() {
        const { builder } = this.state;
        const { shapes } = this.props;
        return (
            <>
                {
                    builder ?
                    <Builder/> :
                    <VitalsContainer>
                    <InfoContainer>Get Started</InfoContainer>
                    <p>Create a new file and start building your imagination!</p>
                    <OptionsContainer>
                    <CardContainer onClick={this.handleFileClick} style={{ cursor: 'pointer' }}>New File</CardContainer>
                    <CardContainer onClick={this.handleNewTeamClick} style={{ cursor: 'pointer' }}>Create Team</CardContainer>
                    <CardContainer onClick={this.handleViewShapes} style={{ cursor: 'pointer' }}>View Community</CardContainer>
                    <CardContainer onClick={this.handleBuilderClick} style={{ cursor: 'pointer' }}>Go To Builder</CardContainer>
                    </OptionsContainer>
                    {this.handleNewFile()}
                    {this.handleTeamClick()}
                    {this.handleViewCommunities()}
                    <>
                        {shapes.shapes.map(({ shapeName }) => (
                            <CardContainer>{shapeName}</CardContainer>
                            ))}
                    </>
                    </VitalsContainer> 
                }
            </>
        );
    }
}

const mapStateToProps = (state: RootState) => {
    return {
        gltfs: state.gltf,
        shapes: state.editor 
    }
}

const mapDispatchToProps = (dispatch: Dispatch<EditorFetchAllStart | GltfFetchUserStart>) => ({
    fetchShapes: () => dispatch(editorFetchAllStart()),
    fetchGltfFiles: (userId: number) => dispatch(gltfFetchUserStart(userId))
});

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(Vitals);