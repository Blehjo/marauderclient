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
                <ListContainer>
                    <CardContainer onClick={this.newProject} style={{ backgroundColor: 'black', borderRadius: '.3rem', border: 'solid 1px white', margin: '.2rem .2rem 1rem .2rem', cursor: 'pointer', color: 'white', textAlign: 'center' }}>
                        New Project +
                    </CardContainer>
                    {
                        docFiles.docFiles?.map(({ docFileId, title, notes }, index) => (
                            <Card key={docFileId} onClick={() => this.handleGetProject(docFileId!)} style={{ verticalAlign: 'middle', justifyContent: 'center', borderRadius: '.3rem', border: 'solid 1px white', color: 'white', backgroundColor: 'black', margin: '.2rem .2rem 1rem .2rem', cursor: 'pointer' }}>
                                <Row style={{ lineHeight: '3rem' }} key={index} xs={2}>
                                    <Col key='col2' xs={10}>
                                        {title}
                                    </Col>
                                    <Col key='col3' xs={2}>
                                        <XContainer>
                                            <XCircle style={{ position: 'absolute', right: '.5rem', marginTop: '.5rem' }} onClick={() => this.deleteDocFile(docFileId!)} />
                                        </XContainer>
                                    </Col>
                                </Row>
                            </Card>
                        ))
                    }
                </ListContainer>
                <Panel {...this.props} />
                <Modal show={showProject} onHide={this.newProject}>
                    <Modal.Header closeButton>Create new project</Modal.Header>
                    <Modal.Body>
                    <Form onSubmit={this.handleDocFile}>
                        <FormContainer>
                            <ButtonContainer className="btn btn-outline-dark" type="submit">
                                <Plus style={{ cursor: 'pointer' }} size={15}/>
                            </ButtonContainer>
                        </FormContainer>
                        <Form.Group className="mb-3" controlId="title">
                            <Form.Control style={{ height: '.5rem' }} as="textarea" onChange={this.handleChange} value={title} name="title" placeholder="Project name" />
                        </Form.Group>
                    </Form>
                    </Modal.Body>
                </Modal>
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
    setId: (panelId: number) => dispatch(panelSetIdStart(panelId)),
    getAllPanels: () => dispatch(panelFetchAllStart()),
    getPanel: (panelId: number) => dispatch(panelFetchSingleStart(panelId)),
    getNotes: (panelId: number) => dispatch(noteFetchAllStart(panelId)),
    getNote: (noteId: number) => dispatch(noteFetchSingleStart(noteId)),
    addNote: (panelId: number, noteValue: string) => dispatch(noteCreateStart(panelId, noteValue)),
    deleteNote: (noteId: number) => dispatch(noteDeleteStart(noteId))
});

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(Projects);