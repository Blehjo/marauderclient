import { ChangeEvent, Component, Dispatch, FormEvent, ReactNode } from "react";
import { Badge, Card, Col, Form, Modal } from "react-bootstrap";
import { ArrowsFullscreen, Chat, Plus, Rocket, Send, XCircle } from "react-bootstrap-icons";
import { ConnectedProps, connect } from "react-redux";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

import World from "../../components/world/world.component";
import { EditorFetchAllStart, editorFetchAllStart } from "../../store/editor/editor.action";
import { GltfCreateStart, GltfDeleteStart, GltfFetchSingleStart, GltfFetchUserStart, gltfCreateStart, gltfDeleteStart, gltfFetchSingleStart, gltfFetchUserStart } from "../../store/gltf/gltf.action";
import { RootState } from "../../store/store";
import { CardContainer, CardsContainer, InfoContainer, OptionsContainer, VitalsContainer } from "../../styles/vitals/vitals.styles";
import Builder from "../../components/builder/builder.component";
import Editor from "../editor";
import { Gltf } from "../../store/gltf/gltf.types";
import { BadgeContainer } from "../../styles/poststab/poststab.styles";
import { Plane } from "@react-three/drei";
import FlexDisplay from "../../components/builder/flex.component";
import { EditorState } from "../../store/editor/editor.reducer";
import { GltfState } from "../../store/gltf/gltf.reducer";
import { ButtonContainer, FormContainer, XContainer } from "../../styles/devices/devices.styles";
import { SetIsBuilderOpen, SetIsEditorOpen, SetIsMaraudersOpen, setIsBuilderOpen, setIsEditorOpen, setIsMaraudersOpen } from "../../store/messagebox/messagebox.action";

interface IBuilder {
    showNewFileDialogue: boolean;
    showNewTeam: boolean;
    showShapes: boolean;
    fileInformation: string;
    builder: boolean;
    editor: boolean;
}

type BuilderProps = ConnectedProps<typeof connector>;

class Vitals extends Component<BuilderProps, IBuilder> {
    constructor(props: BuilderProps) {
        super(props);
        this.state = {
            showNewFileDialogue: false,
            showNewTeam: false,
            showShapes: false,
            fileInformation: "",
            builder: false,
            editor: false
        }
        this.handleFileClick = this.handleFileClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleNewTeamClick = this.handleNewTeamClick.bind(this);
        this.handleViewShapes = this.handleViewShapes.bind(this);
        this.handleBuilderClick = this.handleBuilderClick.bind(this);
        this.submitGltfFile = this.submitGltfFile.bind(this);
        this.handleEditorClick = this.handleEditorClick.bind(this);
    }

    handleChange(event: ChangeEvent<HTMLInputElement>): void {
        const { name, value } = event.target;
        this.setState({ ...this.state, [name]: value });
    }

    handleBuilderClick(): void {
        if (this.props.marauders == true) {
            this.props.closeMarauders(!this.props.marauders)
        }
    }

    handleEditorClick(): void {
        if (this.props.marauders == true) {
            this.props.closeMarauders(!this.props.marauders)
        }
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

    submitGltfFile(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const { fileInformation } = this.state;
        this.props.createGltfFile(fileInformation);
        this.setState({
            showNewFileDialogue: !this.state.showNewFileDialogue
        })
        const fileId = this.props.gltfs.gltfs.pop();
        this.getFile(fileId?.gltfId!)
    }
    
    handleNewFile(): ReactNode {
        const { showNewFileDialogue } = this.state;
        return (
            <Modal className="deviceModal" show={showNewFileDialogue} onHide={this.handleFileClick}>
                <Modal.Header>New GLTF File</Modal.Header>
                <Form onSubmit={this.submitGltfFile}>
                    <Modal.Body>
                        <FormContainer>
                            <ButtonContainer className="btn btn-outline-light" type="submit">
                                <Plus style={{ cursor: 'pointer' }} size={15}/>
                            </ButtonContainer>
                        </FormContainer>
                        <Form.Group className="mb-3" controlId="formMedia">
                            <Form.Control style={{ height: '.5rem' }} name="fileInformation" as="textarea" onChange={this.handleChange} placeholder=" Write your gltf project title here" />
                        </Form.Group>
                    </Modal.Body>
                </Form>
            </Modal>
        )
    }

    handleDelete(gltfId: number): void {
        this.props.deleteFile(gltfId);
    }

    handleTeamClick(): ReactNode {
        const { showNewTeam } = this.state;
        return (
            <Modal className="deviceModal" show={showNewTeam} onHide={this.handleNewTeamClick}>
                <Modal.Header>Create Community</Modal.Header>
                <Modal.Body>
                        <FormContainer>
                            <ButtonContainer className="btn btn-outline-light" type="submit">
                                <Plus style={{ cursor: 'pointer' }} size={15}/>
                            </ButtonContainer>
                        </FormContainer>
                    <Form>
                        <Form.Group className="mb-3" controlId="formMedia">
                            <Form.Control style={{ height: '.5rem' }} name="fileInformation" as="textarea" onChange={this.handleChange} placeholder=" Write your gltf project title here" />
                        </Form.Group>
                    </Form>
                </Modal.Body>
            </Modal>
        )
    }

    handleViewCommunities(): ReactNode {
        const { showShapes } = this.state;
        return (
            <Modal className="deviceModal" show={showShapes} onHide={this.handleViewShapes}>
                <Modal.Header >View Communities</Modal.Header>
                <Modal.Body>
                    <FormContainer>
                        <ButtonContainer className="btn btn-outline-light" type="submit">
                            <Plus style={{ cursor: 'pointer' }} size={15}/>
                        </ButtonContainer>
                    </FormContainer>
                    <Form>
                        <Form.Group className="mb-3" controlId="formMedia">
                            <Form.Control style={{ height: '.5rem' }} name="fileInformation" as="textarea" onChange={this.handleChange} placeholder=" Write your gltf project title here" />
                        </Form.Group>
                    </Form>
                </Modal.Body>
            </Modal>
        )
    }

    handleGltfFiles(gltf: Gltf): ReactNode {
        const { gltfId, fileInformation, userId, shapes } = gltf;
        return (
            <Card key={gltfId} style={{ background: 'black', border: 'solid 1px white', padding: '.5rem', margin: '.3rem', color: 'white'}}>
                <Card.Img src="https://i.pinimg.com/originals/8e/47/2a/8e472a9d5d7d25f4a88281952aed110e.png"/>
                <Card.ImgOverlay>
                    <div style={{ cursor: "pointer", position: "absolute", left: "0", top: "0" }}>
                        <BadgeContainer>
                            <Badge style={{ color: 'black' }} bg="light"><ArrowsFullscreen style={{ cursor: 'pointer' }} onClick={() => this.getFile(gltfId!)} size={15} /></Badge>
                        </BadgeContainer>
                        {
                            <BadgeContainer><Badge style={{ color: 'black' }} bg="light">
                                <Chat size={15}/>
                                {/* {` ${comments?.length > 0 ? comments?.length : ""}`} */}
                                </Badge>
                            </BadgeContainer>
                        }
                        {
                            <BadgeContainer>
                                <Badge style={{ color: 'black' }} bg="light">
                                <Rocket style={{ cursor: 'pointer' }} /* onClick={() => this.handleLike(gltfId, type)} size={15} */ />
                                {/* {` ${favorites?.length > 0 ? favorites?.length : ""}`} */}
                                </Badge>
                            </BadgeContainer>
                        }
                    </div>
                    <Col xs={3}>
                        <XContainer>
                            <XCircle onClick={() => this.handleDelete(gltfId!)} key={gltfId} style={{ borderRadius: ".5rem", cursor: "pointer", position: "absolute", right: "5", top: "5" }}/>
                        </XContainer>
                    </Col>
                </Card.ImgOverlay>
                <Card.Body>
                    <Card.Text>{fileInformation}</Card.Text>
                </Card.Body>
            </Card>
        )
    }

    userGltfFiles(): Array<ReactNode> {
        const content: Array<ReactNode> = [];
        const { gltfs } = this.props;
        for (let i = 0; i < gltfs.gltfs.length; i++) {
            content.push(this.handleGltfFiles(gltfs.gltfs[i]));
        }
        return content;
    }

    getFile(gltfId: number): void {
        this.props.fetchSingleFile(gltfId);
        this.handleEditorClick();
    }

    componentDidMount(): void {
        this.props.fetchShapes();
        this.props.fetchGltfFiles();
        if (this.props.builder == true) {
            this.props.toggleBuilder(false);
            this.props.toggleEditor(false);
        }
    }

    // componentDidUpdate(prevProps: Readonly<{ gltfs: GltfState; shapes: EditorState; } & { fetchShapes: () => void; fetchGltfFiles: () => void; fetchSingleFile: (gltfId: number) => void; createGltfFile: (fileInformation: string) => void; deleteFile: (gltfId: number) => void; }>, prevState: Readonly<IBuilder>, snapshot?: any): void {
    //     if (prevProps.gltfs.gltfs.length != this.props.gltfs.gltfs.length) {
    //         this.props.fetchGltfFiles();
    //         this.props.fetchSingleFile(this.props.gltfs.gltfs.pop()?.gltfId!)
    //     }
    // }

    render() {
        // const { builder, editor } = this.state;
        const { shapes, gltfs, builder, editor } = this.props;
        return (
            <div style={{ paddingBottom: '5rem'}}>
                <VitalsContainer>
                    <InfoContainer>Get Started</InfoContainer>
                    <div className="subtitle">Create a new file and start building your imagination!</div>
                    <OptionsContainer>
                        <CardContainer onClick={this.handleFileClick} style={{ cursor: 'pointer' }}><div>New File</div></CardContainer>
                        <CardContainer onClick={this.handleNewTeamClick} style={{ cursor: 'pointer' }}><div>Create Team</div></CardContainer>
                        <CardContainer onClick={this.handleViewShapes} style={{ cursor: 'pointer' }}><div>View Community</div></CardContainer>
                        <CardContainer href="/designer" onClick={this.handleBuilderClick} style={{ cursor: 'pointer' }}><div>Go To Builder</div></CardContainer>
                        <CardContainer href="/editor" onClick={this.handleEditorClick} style={{ cursor: 'pointer' }}><div>Go To Editor</div></CardContainer>
                    </OptionsContainer>
                    {this.handleNewFile()}
                    {this.handleTeamClick()}
                    {this.handleViewCommunities()}
                </VitalsContainer> 
                {gltfs.gltfs?.length > 0 && <CardsContainer>
                    <ResponsiveMasonry columnsCountBreakPoints={{ 350: 2, 750: 3, 900: 3, 1050: 4 }}>
                        <Masonry>
                            {this.userGltfFiles()}
                        </Masonry>
                    </ResponsiveMasonry>
                </CardsContainer>}
                {shapes.shapes?.length > 0 && <CardsContainer>
                    <ResponsiveMasonry columnsCountBreakPoints={{ 350: 2, 750: 3, 900: 3, 1050: 4 }}>
                        <Masonry>
                        {shapes.shapes.map(({ shapeId, shapeName }) => (
                            <Card key={shapeId} style={{ background: 'black', border: 'solid 1px white', padding: '.5rem', margin: '.3rem', color: 'white'}}>{shapeName}</Card>
                        ))}
                        </Masonry>
                    </ResponsiveMasonry>
                </CardsContainer>}
            {/* <CardsContainer style={{ marginBottom: '5rem' }}>
                <ResponsiveMasonry columnsCountBreakPoints={{ 350: 2, 750: 3, 900: 3, 1050: 4 }}>
                    <Masonry>
                        <FlexDisplay/>
                    </Masonry>
                </ResponsiveMasonry>
            </CardsContainer> */}
            </div>
        );
    }
}

const mapStateToProps = (state: RootState) => {
    return {
        gltfs: state.gltf,
        shapes: state.editor,
        marauders: state.messagebox.isMaraudersOpen,
        builder: state.messagebox.isBuilderOpen,
        editor: state.messagebox.isEditorOpen
    }
}

const mapDispatchToProps = (dispatch: Dispatch<EditorFetchAllStart | GltfFetchUserStart | GltfCreateStart | GltfFetchSingleStart | GltfDeleteStart | SetIsMaraudersOpen | SetIsBuilderOpen | SetIsEditorOpen>) => ({
    fetchShapes: () => dispatch(editorFetchAllStart()),
    fetchGltfFiles: () => dispatch(gltfFetchUserStart()),
    fetchSingleFile: (gltfId: number) => dispatch(gltfFetchSingleStart(gltfId)),
    createGltfFile: (fileInformation: string) => dispatch(gltfCreateStart(fileInformation)),
    deleteFile: (gltfId: number) => dispatch(gltfDeleteStart(gltfId)),
    closeMarauders: (boolean: boolean) => dispatch(setIsMaraudersOpen(boolean)),
    toggleBuilder: (boolean: boolean) => dispatch(setIsBuilderOpen(boolean)),
    toggleEditor: (boolean: boolean) => dispatch(setIsEditorOpen(boolean))
});

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(Vitals);