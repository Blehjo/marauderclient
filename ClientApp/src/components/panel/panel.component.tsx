import { ChangeEvent, Component, FormEvent, ReactNode } from "react";
import { PanelContainer } from "../../styles/panel/panel.styles";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { ButtonContainer, CardContainer, FormContainer } from "../../styles/devices/devices.styles";
import { Form, Modal } from "react-bootstrap";
import { Plus } from "react-bootstrap-icons";
import { Note } from "../../store/note/note.types";

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
    width: 250
});

type PanelProps = {
    children: ReactNode[] | ReactNode;
}

type Item = {
    id: string;
    content: string;
}
interface IPanel {
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
            mediaLink: "",
            imageSource: "",
            imageFile: null,
            noteValue: "",
            show: false,
            items: getItems(10),
            notes: this.props.panels?.panelId != null ? this.props.notes.notes : []
        }
        this.onDragEnd = this.onDragEnd.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.showPreview = this.showPreview.bind(this);
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
        const { noteValue } = this.state;
        this.props.addNote(this.props.panels?.panelId, noteValue);
        console.log("HANDLESUBMIT:: ", this.props.panels?.panelId);
        this.setState({
            ...this.state, show: !this.state.show, noteValue: ""
        });
    }

    handleDelete(noteId: number): void {
        this.props.deleteNote(noteId);
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

    componentDidMount(): void {
        if (this.props.panels?.panelId != null) {
            this.props.getNotes(this.props.panels.panelId);
        }
    }

    componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<IPanel>, snapshot?: any): void {
        if (prevProps.panels?.panelId != this.props.panels?.panelId) {
            this.props.getNotes(this.props.panels.panelId);
            this.setState({
                notes:  this.props.notes.notes
            }, () => console.log(this.state.notes));
        }
    }
    
    render() {
        const { show, noteValue, notes } = this.state;
        console.log(this.state.notes);
        return (
            <PanelContainer>
                <CardContainer onClick={this.handleClick} style={{ backgroundColor: 'black', borderRadius: '.3rem', border: 'solid 1px white', margin: '.2rem .2rem 1rem .2rem', cursor: 'pointer', color: 'white', textAlign: 'center' }}>
                    New Note +
                </CardContainer>
                <DragDropContext onDragEnd={this.onDragEnd}>
                    <Droppable droppableId="droppable">
                    {(provided, snapshot) => (
                        <div 
                        ref={provided.innerRef} 
                        style={getListStyle(snapshot.isDraggingOver)}
                        {...provided.droppableProps}
                        >
                        {notes?.map(({noteId, panelId, noteValue}: Note, index: number) => (
                            <Draggable
                            key={`${noteId}`}
                            draggableId={`${noteId}`}
                            index={index}
                            >
                            {(provided, snapshot) => (
                                <div>
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
                <Modal show={show} onHide={this.handleClick}>
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
            </PanelContainer>
        );
    }
}

export default Panel;