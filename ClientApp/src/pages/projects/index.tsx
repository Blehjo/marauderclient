import { ChangeEvent, Component, Dispatch, FormEvent } from "react";
import { ListContainer } from "../../styles/messages/messages.styles";
import { Card, Col, Form, Image, Modal, Row } from "react-bootstrap";
import { ProjectContainer } from "../../styles/project/project.styles";
import { ButtonContainer, CardContainer, FormContainer, XContainer } from "../../styles/devices/devices.styles";
import { Plus, XCircle } from "react-bootstrap-icons";
import { ConnectedProps, connect } from "react-redux";
import { RootState } from "../../store/store";
import { PanelCreateStart, PanelDeleteStart, PanelFetchAllStart, PanelFetchSingleStart, PanelSetIdStart, panelCreateStart, panelDeleteStart, panelFetchAllStart, panelFetchSingleStart, panelSetIdStart } from "../../store/panel/panel.action";
import { Textfit } from "react-textfit";
import Panel from "../../components/panel/panel.component";
import { NoteCreateStart, NoteDeleteStart, NoteFetchAllStart, NoteFetchSingleStart, noteCreateStart, noteDeleteStart, noteFetchAllStart, noteFetchSingleStart } from "../../store/note/note.action";

interface IProject {
    title: string;
    show: boolean;
}

type ProjectProps = ConnectedProps<typeof connector>;

class Projects extends Component<ProjectProps, IProject> {
    constructor(props: any) {
        super(props);
        this.state = {
            title: "",
            show: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event: ChangeEvent<HTMLInputElement>): void {
        const { name, value } = event.target;
        this.setState({ ...this.state, [name]: value });
    }

    handleClick(): void {
        this.setState({
            show: !this.state.show
        });
    }

    handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const { title } = this.state;
        this.props.addPanel(title);
        this.setState({
            ...this.state, show: !this.state.show, title: ""
        });
    }

    handleDelete(panelId: number): void {
        this.props.deletePanel(panelId);
    }

    getPanel(panelId: number): void {
        this.props.getPanel(panelId);
        this.props.setId(panelId);
    }

    componentDidMount(): void {
        this.props.getAllPanels();
    }

    render() {
        const { show, title } = this.state;
        const { panels } = this.props;
        return (
            <ProjectContainer>
                <ListContainer>
                    <CardContainer onClick={this.handleClick} style={{ backgroundColor: 'black', borderRadius: '.3rem', border: 'solid 1px white', margin: '.2rem .2rem 1rem .2rem', cursor: 'pointer', color: 'white', textAlign: 'center' }}>
                        New Project +
                    </CardContainer>
                    {
                        panels.panels?.map(({ panelId, title, notes }, index) => (
                            <Card key={panelId} onClick={() => this.getPanel(panelId!)} style={{ verticalAlign: 'middle', justifyContent: 'center', borderRadius: '.3rem', border: 'solid 1px white', color: 'white', backgroundColor: 'black', margin: '.2rem .2rem 1rem .2rem', cursor: 'pointer' }}>
                                <Row style={{ lineHeight: '3rem' }} key={index} xs={2}>
                                    <Col key='col2' xs={6}>
                                        <Textfit style={{ width: "100px" }}>
                                        {title}
                                        </Textfit>
                                    </Col>
                                    <Col key='col3' xs={1}>
                                        <XContainer>
                                            <XCircle onClick={() => this.handleDelete(panelId!)} />
                                        </XContainer>
                                    </Col>
                                </Row>
                            </Card>
                        ))
                    }
                </ListContainer>
                <Panel {...this.props} />
                <Modal show={show} onHide={this.handleClick}>
                    <Modal.Header closeButton>Create new project</Modal.Header>
                    <Modal.Body>
                    <Form onSubmit={this.handleSubmit}>
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
    notes: state.note
});

const mapDispatchToProps = (dispatch: Dispatch<PanelSetIdStart | PanelFetchAllStart | PanelCreateStart | PanelFetchSingleStart | PanelDeleteStart | NoteFetchAllStart | NoteFetchSingleStart | NoteCreateStart | NoteDeleteStart>) => ({
    addPanel: (title: string) => dispatch(panelCreateStart(title)),
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