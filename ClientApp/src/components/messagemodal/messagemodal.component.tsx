import { ChangeEvent, Component, Dispatch, FormEvent } from "react";
import { Col, Form, Modal, Row } from "react-bootstrap";
import { Send } from "react-bootstrap-icons";
import { ConnectedProps, connect } from "react-redux";
import { MarauderFetchSingleStart, marauderFetchSingleStart } from "../../store/marauder/marauder.action";
import { MessageSetID, messageSetId } from "../../store/message/message.action";
import { MessageCommentCreateStart, messagecommentCreateStart } from "../../store/messagecomment/messagecomment.action";
import { RootState } from "../../store/store";
import { ModalContainer } from "../../styles/poststab/poststab.styles";
import { addMessage } from "../../utils/api/message.api";

type MessageModalProps = ConnectedProps<typeof connector> | any;

interface IMessageModal {
    openModal: boolean;
    messageValue: string;
    imageFile: any;
    imageSource: string | ArrayBuffer | null | undefined;
}

class MessageModal extends Component<MessageModalProps, IMessageModal> {
    constructor(props: MessageModalProps) {
        super(props);
        this.state = {
            openModal: this.props.openModal,
            messageValue: "",
            imageFile: null,
            imageSource: null
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleMessage = this.handleMessage.bind(this);
        this.showPreview = this.showPreview.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleClose(): void {
        this.setState({
            openModal: !this.state.openModal
        });
    }
    
    handleChange(event: ChangeEvent<HTMLInputElement>): void {
        const { name, value } = event.target;
        this.setState({ ...this.state, [name]: value });
    }

    async handleMessage(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const { messageValue, imageFile } = this.state;
        const { singleMarauder } = this.props.marauders;

        await addMessage(singleMarauder?.username!)
        .then((response) => this.props.setId(response.messageId));

        this.props.createMessageComment(this.props.messages.messageId!, messageValue, imageFile);
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

    render() {
        return (
            <ModalContainer>
                <Modal.Header closeButton>
                    <Modal.Title style={{ color: 'black' }}>Send a message</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={this.handleMessage}>
                        <Row style={{ marginBottom: '1rem', justifyContent: 'center' }}>
                            <Col xs={12}>
                                <Form.Group>
                                    <Form.Control style={{ height: '.5rem' }} name="messageValue" as="textarea" onChange={this.handleChange} placeholder=" Write your message here" />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row style={{ justifyContent: 'center' }}>
                            <Col xs={9}>
                                <Form.Group className="mb-3" controlId="formMedia">
                                    <Form.Control onChange={this.showPreview} name="mediaLink" as="input" accept="image/*" type="file" placeholder="Media" />
                                </Form.Group>
                            </Col>
                            <Col xs={3}>
                                <button id={"post?.postId.toString()"} style={{ textAlign: 'center', width: '100%', height: 'auto'}} className="btn btn-light" type="submit">
                                    <Send/>
                                </button>
                            </Col>                
                        </Row>
                    </Form>
                </Modal.Body>
            </ModalContainer>
        );
    }
}

const mapStateToProps = (state: RootState) => {
    return {
        marauders: state.marauder,
        messages: state.message
    }
}

const mapDispatchToProps = (dispatch: Dispatch<MarauderFetchSingleStart | MessageSetID | MessageCommentCreateStart>) => ({
    getMarauder: (userId: number) => dispatch(marauderFetchSingleStart(userId)),
    setId: (messageId: number) => dispatch(messageSetId(messageId)),
    createMessageComment: (messageId: number, messageValue: string, imageFile: File) => dispatch(messagecommentCreateStart(messageId, messageValue, imageFile))
});

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(MessageModal);