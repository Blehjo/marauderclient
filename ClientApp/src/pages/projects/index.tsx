import { ChangeEvent, Component, Dispatch, FormEvent } from "react";
import { Card, Col, Form, Modal, Row } from "react-bootstrap";
import { Plus, XCircle } from "react-bootstrap-icons";
import { ConnectedProps, connect } from "react-redux";
import { Textfit } from "react-textfit";
import Panel from "../../components/panel/panel.component";
import { DocFileCreateStart, DocFileDeleteStart, DocFileFetchAllStart, DocFileFetchSingleStart, docFileCreateStart, docFileDeleteStart, docFileFetchAllStart, docFileFetchSingleStart } from "../../store/docfile/docfile.action";
import { NoteCreateStart, NoteDeleteStart, NoteFetchAllStart, NoteFetchSingleStart, noteCreateStart, noteDeleteStart, noteFetchAllStart, noteFetchSingleStart } from "../../store/note/note.action";
import { PanelCreateStart, PanelDeleteStart, PanelFetchAllStart, PanelFetchSingleStart, PanelSetIdStart, panelCreateStart, panelDeleteStart, panelFetchAllStart, panelFetchSingleStart, panelSetIdStart } from "../../store/panel/panel.action";
import { RootState } from "../../store/store";
import { ButtonContainer, CardContainer, FormContainer, XContainer } from "../../styles/devices/devices.styles";
import { ListContainer } from "../../styles/messages/messages.styles";
import { ProjectContainer } from "../../styles/project/project.styles";
import { SelectShape } from "../../styles/editor/editor.styles";

interface IProject {
    title: string;
    showProject: boolean;
    showPanel: boolean;
}

type ProjectProps = ConnectedProps<typeof connector>;

class Projects extends Component<ProjectProps, IProject> {
    constructor(props: any) {
        super(props);
        this.state = {
            title: "",
            showProject: false,
            showPanel: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.newProject = this.newProject.bind(this);
        this.handleDocFile = this.handleDocFile.bind(this);
    }

    handleChange(event: ChangeEvent<HTMLInputElement>): void {
        const { name, value } = event.target;
        this.setState({ ...this.state, [name]: value });
    }

    handleClick(): void {
        this.setState({
            showPanel: !this.state.showPanel
        });
    }

    handleGetProject(docFileId: number): void {
        this.props.getSingleFile(docFileId);
    }

    newProject(): void {
        this.setState({
            showProject: !this.state.showProject
        })
    }

    handleDocFile(event: FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        const { title } = this.state;
        this.props.addProject(title);
        this.setState({
            ...this.state, showProject: !this.state.showProject, title: ""
        });
    }

    deleteDocFile(docFileId: number): void {
        this.props.deleteProject(docFileId);
        this.props.setId(null);
    }

    handleDelete(panelId: number): void {
        this.props.deletePanel(panelId);
    }

    getPanel(panelId: number): void {
        this.props.getPanel(panelId);
        this.props.setId(panelId);
    }

    componentDidMount(): void {
        this.props.getAllFiles();
    }

    render() {
        const { showPanel, showProject, title } = this.state;
        const { panels, docFiles } = this.props;
        return (
            <ProjectContainer>
                <Row xs={1} md={2}>
                    <Col xs={12} md={12} lg={4}>
                <ListContainer>
                    <SelectShape style={{ border: '1px solid white', borderRadius: '.5rem', marginBottom: '1rem', textAlign: 'center' }} onClick={this.newProject}>
                        New Project
                    </SelectShape>
                    {
                        docFiles.docFiles?.map(({ docFileId, title, notes }, index) => (
                            <SelectShape style={{ border: '1px solid white', borderRadius: '.2rem', marginBottom: '.5rem' }} key={docFileId} onClick={() => this.handleGetProject(docFileId!)}>
                                <Row style={{ lineHeight: '3rem' }} key={index} xs={2}>
                                    <Col key='col2' xs={10}>
                                        {title}
                                    </Col>
                                    <Col key='col3' xs={2}>
                                        <XContainer>
                                            <XCircle style={{ position: 'absolute', right: '10%', marginTop: '5%' }} onClick={() => this.deleteDocFile(docFileId!)} />
                                        </XContainer>
                                    </Col>
                                </Row>
                            </SelectShape>
                        ))
                    }
                </ListContainer>
                </Col>
                <Col xs={12}>
                <Panel {...this.props} />
                </Col>
                <Modal className="deviceModal" show={showProject} onHide={this.newProject}>
                    <Modal.Header>Create new project</Modal.Header>
                    <Modal.Body>
                    <Form onSubmit={this.handleDocFile}>
                        <FormContainer>
                            <ButtonContainer className="btn btn-outline-light" type="submit">
                                <Plus style={{ cursor: 'pointer' }} size={15}/>
                            </ButtonContainer>
                        </FormContainer>
                        <Form.Group className="mb-3" controlId="title">
                            <Form.Control style={{ height: '.5rem' }} as="textarea" onChange={this.handleChange} value={title} name="title" placeholder="Project name" />
                        </Form.Group>
                    </Form>
                    </Modal.Body>
                </Modal>
                </Row>
            </ProjectContainer>
        );
    }
}

const mapStateToProps = (state: RootState) => ({
    panels: state.panel,
    notes: state.note,
    docFiles: state.docFile
});

const mapDispatchToProps = (dispatch: Dispatch<DocFileFetchAllStart | DocFileFetchSingleStart | DocFileCreateStart | DocFileDeleteStart | PanelSetIdStart | PanelFetchAllStart | PanelCreateStart | PanelFetchSingleStart | PanelDeleteStart | NoteFetchAllStart | NoteFetchSingleStart | NoteCreateStart | NoteDeleteStart>) => ({
    addProject: (title: string) => dispatch(docFileCreateStart(title)),
    deleteProject: (docFileId: number) => dispatch(docFileDeleteStart(docFileId)),
    getAllFiles: () => dispatch(docFileFetchAllStart()),
    getSingleFile: (docFileId: number) => dispatch(docFileFetchSingleStart(docFileId)),
    addPanel: (docFileId: number, title: string) => dispatch(panelCreateStart(docFileId, title)),
    deletePanel: (panelId: number) => dispatch(panelDeleteStart(panelId)),
    setId: (panelId: number | null) => dispatch(panelSetIdStart(panelId)),
    getAllPanels: () => dispatch(panelFetchAllStart()),
    getPanel: (panelId: number) => dispatch(panelFetchSingleStart(panelId)),
    getNotes: (panelId: number) => dispatch(noteFetchAllStart(panelId)),
    getNote: (noteId: number) => dispatch(noteFetchSingleStart(noteId)),
    addNote: (panelId: number, noteValue: string) => dispatch(noteCreateStart(panelId, noteValue)),
    deleteNote: (noteId: number) => dispatch(noteDeleteStart(noteId))
});

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(Projects);