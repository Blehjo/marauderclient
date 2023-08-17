import { ChangeEvent, Component, FormEvent, ReactNode } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Card, Col, Form, Modal, Row } from "react-bootstrap";
import { Plus, XCircle } from "react-bootstrap-icons";
import { Textfit } from "react-textfit";
import { Note } from "../../store/note/note.types";
import { Panel as PanelType } from "../../store/panel/panel.types";
import { ButtonContainer, CardContainer, FormContainer, XContainer } from "../../styles/devices/devices.styles";
import { PanelContainer } from "../../styles/panel/panel.styles";

const getItems = (count: number) => Array.from({length: count}, (v, k) => k).map(k => ({
    id: `item-${k}`,
    content: `item ${k}`
}));

const reorder =  (list: Array<Item>, startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

const grid = 8;

const getItemStyle = (draggableStyle: any, isDragging: boolean) => ({
    userSelect: 'none',
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,
    border: '1px solid #E6C487',
    borderRadius: '.2rem',
    background: isDragging ? '#E6C487' : 'black',
    ...draggableStyle
});

const getListStyle = (isDraggingOver: boolean) => ({
    border: '1px solid white',
    borderRadius: '1rem',
    background: isDraggingOver ? 'lightgrey' : 'black',
    padding: grid,
    width: '100%',
    position: 'relative'
});

type PanelProps = {
    children: ReactNode[] | ReactNode;
}

type Item = {
    id: string;
    content: string;
}
interface IPanel {
    panelId: number | null;
    showPanel: boolean;
    title: string;
    noteValue: string;
    mediaLink: string;
    imageSource: string | ArrayBuffer | null | undefined;
    imageFile: any;
    show: boolean;
    items: Array<Item>;
    notes: Array<Note>;
}

class Panel extends Component<any, IPanel> {
    constructor(props: any) {
        super(props);
        this.state = {
            panelId: null,
            title: "",
            mediaLink: "",
            imageSource: "",
            imageFile: null,
            noteValue: "",
            show: false,
            showPanel: false,
            items: getItems(10),
            notes: this.props.panels?.panelId != null ? this.props.notes.notes : []
        }
        this.onDragEnd = this.onDragEnd.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.showPreview = this.showPreview.bind(this);
        this.handleNewPanel = this.handleNewPanel.bind(this);
        this.handlePanel = this.handlePanel.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    closeModal(): void {
        this.setState({ show: !this.state.show });
    }

    handlePanel(event: FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        const { title } = this.state;
        this.props.addPanel(this.props.docFiles.singleDocFile?.docFileId, title);
        this.setState({
            ...this.state, showPanel: !this.state.showPanel, title: ""
        });
    }

    getPanel(panelId: number): void {
        this.props.getPanel(panelId);
        this.props.setId(panelId);
    }

    handleChange(event: ChangeEvent<HTMLInputElement>): void {
        const { name, value } = event.target;
        this.setState({ ...this.state, [name]: value });
    }

    handleClick(panelId: number): void {
        this.setState({
            ...this.state, show: !this.state.show, panelId: panelId
        });
    }

    handleNewPanel(): void {
        this.setState({
            showPanel: !this.state.showPanel
        });
    }

    handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const { noteValue } = this.state;
        this.props.addNote(this.state.panelId!, noteValue);
        this.setState({
            ...this.state, show: !this.state.show, noteValue: ""
        });
    }

    handleDelete(noteId: number): void {
        this.props.deletePanel(noteId);
    }

    getNote(noteId: number): void {
        this.props.getNote(noteId);
    }

    onDragEnd (result: any) {
        // dropped outside the list
        if(!result.destination) {
           return; 
        }
        
        const items = reorder(
          this.state.items, 
          result.source.index, 
          result.destination.index
        );
        
        this.setState({
          items
        });
    }

    showPreview(event: ChangeEvent<HTMLInputElement>) {
        if (event.target.files && event.target.files[0]) {
          const { files } = event.target;
          const selectedFiles = files as FileList;
          let imageFile = selectedFiles[0];
          const reader = new FileReader();
          reader.onload = x => {
            this.setState({
              ...this.state,
              imageFile,
              imageSource: x.target?.result
            });
          }
          reader.readAsDataURL(imageFile);
        } else {
          this.setState({
              ...this.state,
              imageFile: null,
              imageSource: null
          });
        }
    }

    // componentDidMount(): void {

    // }

    componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<IPanel>, snapshot?: any): void {
        // if (prevProps.panels.panels?.length != this.props.panels.panels?.length) {
        //     this.props.getPanel(this.props.docFIles.singleDocFile.docFileId);
        //     console.log("PANELS:: ", this.props.panels.panels);
        // }

        if (prevProps.docFiles.singleDocFile?.docFileId != this.props.docFiles.singleDocFile?.docFileId) {
            this.props.getPanel(this.props.docFiles.singleDocFile?.docFileId);
            console.log("FETCHED::: ", this.props.panels.panels);
        }

        // if (prevProps.)
    }
    
    render() {
        const { show, noteValue, notes, showPanel, title } = this.state;
        const { panels } = this.props;
        return (
            <PanelContainer>
                {this.props.docFiles.singleDocFile?.docFileId && <CardContainer onClick={this.handleNewPanel} style={{ backgroundColor: 'black', borderRadius: '.3rem', border: 'solid 1px white', margin: '.2rem .2rem 1rem .2rem', cursor: 'pointer', color: 'white', textAlign: 'center' }}>
                    New Panel +
                </CardContainer>}
                <Row xs={3}>
                {
                    panels.panels?.map(({ panelId, title, notes }: PanelType, index: number) => (
                        <Col>
                        <Card key={panelId} onClick={() => this.getPanel(panelId!)} style={{ border: '1px solid white', borderRadius: '1rem', background: 'black', padding: grid, width: '250', verticalAlign: 'middle', justifyContent: 'center', color: 'white', backgroundColor: 'black', margin: '.2rem .2rem 1rem .2rem', cursor: 'pointer' }}>
                            <Row style={{ lineHeight: '3rem' }} key={index} xs={2}>
                                <Col key='col2' xs={10}>
                                    {title}
                                </Col>
                                <Col key='col3' xs={2}>
                                    <XContainer>
                                        <XCircle style={{ position: 'absolute', right: '.5rem' }} onClick={() => this.handleDelete(panelId!)} />
                                    </XContainer>
                                </Col>
                            </Row>
                        </Card>
                        <DragDropContext onDragEnd={this.onDragEnd}>
                            <Droppable droppableId="droppable">
                            {(provided, snapshot) => (
                                <div 
                                ref={provided.innerRef} 
                                style={getListStyle(snapshot.isDraggingOver)}
                                {...provided.droppableProps}
                                >
                                <CardContainer onClick={() => this.handleClick(panelId!)} style={{ backgroundColor: 'black', borderRadius: '.3rem', border: 'solid 1px white', margin: '.2rem .2rem 1rem .2rem', cursor: 'pointer', color: 'white', textAlign: 'center' }}>
                                    New Note +
                                </CardContainer>
                                {notes?.map(({noteId, panelId, noteValue}: Note, index: number) => (
                                    <Draggable
                                    key={`${noteId}`}
                                    draggableId={`${noteId}`}
                                    index={index}
                                    >
                                    {(provided, snapshot) => (
                                        <div>
                                            <XContainer>
                                                <XCircle style={{ position: 'absolute', right: '1rem', marginTop: '.5rem' }} onClick={() => this.props.deleteNote(noteId)} />
                                            </XContainer>
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.dragHandleProps}
                                            {...provided.draggableProps}
                                            style={getItemStyle(
                                            provided.draggableProps.style,
                                            snapshot.isDragging
                                            )}
                                        >
                                            {noteValue}
                                        </div>
                                        {/* {provided.placeholder} */}
                                        </div>
                                    )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                                </div>
                            )}
                            </Droppable>
                        </DragDropContext>
                        </Col>
                    ))
                }
                </Row>
                <Modal show={show} onHide={this.closeModal}>
                    <Modal.Header closeButton>Add note</Modal.Header>
                    <Modal.Body>
                    <Form onSubmit={this.handleSubmit}>
                        <FormContainer>
                            <ButtonContainer className="btn btn-outline-dark" type="submit">
                                <Plus style={{ cursor: 'pointer' }} size={15}/>
                            </ButtonContainer>
                        </FormContainer>
                        <Form.Group className="mb-3" controlId="noteValue">
                            <Form.Control style={{ height: '.5rem' }} as="textarea" onChange={this.handleChange} value={noteValue} name="noteValue" placeholder="Write note here" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formMedia">
                            <Form.Control onChange={this.showPreview} name="mediaLink" as="input" accept="image/*" type="file" placeholder="Media" />
                        </Form.Group>
                    </Form>
                    </Modal.Body>
                </Modal>
                <Modal show={showPanel} onHide={this.handleNewPanel}>
                    <Modal.Header closeButton>Create new panel</Modal.Header>
                    <Modal.Body>
                    <Form onSubmit={this.handlePanel}>
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
            </PanelContainer>
        );
    }
}

export default Panel;