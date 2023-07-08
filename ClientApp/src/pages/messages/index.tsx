import { ChangeEvent, Component, Dispatch } from "react";
import { Card, Col, Form, Image, Row } from 'react-bootstrap';
import { Send, XCircle } from "react-bootstrap-icons";
import { InputContainer, ListContainer, MessageContainer, MessageForm, TextContainer } from "../../styles/messages/messages.styles";
import { RootState } from "../../store/store";
import { MessageCreateStart, MessageFetchUserMessagesStart, messageCreateStart, messageFetchUserMessagesStart } from "../../store/message/message.action";
import { MessageCommentCreateStart, MessageCommentFetchSingleStart, messagecommentCreateStart, messagecommentFetchSingleStart } from "../../store/messagecomment/messagecomment.action";
import { ConnectedProps, connect } from "react-redux";

type User = {
    name: string;
    avatarUrl: string;
}

interface IMessage {
    socket: boolean;
    messageValue: string;
    messages: Array<string>;
    imageSource: string | ArrayBuffer | null | undefined;
    imageFile: any;
}

type MessageProps = ConnectedProps<typeof connector>;

class Messages extends Component<MessageProps, IMessage> {
    constructor(props: any) {
        super(props);
        this.state = {
            socket: false,
            messageValue: "",
            imageSource: "",
            messages: [],
            imageFile: null
        }
        this.handleChange = this.handleChange.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }
    

    sendMessage(event): void {
        event.preventDefault();
        const { messageValue } = this.state;
        let webSocket = new WebSocket("wss://localhost:7144/ws/1");

        webSocket.onopen = (event) => {
            webSocket.send(messageValue);
            this.setState({
                ...this.state, messageValue: ""
            })
        };

        webSocket.onmessage = (event) => {
            if (event.data) {
                this.setState({
                    ...this.state, messages: this.state.messages.concat([event.data])
                })
                webSocket.close();
            }
        }
    }

    handleClick(messageId: number): void {
        const { messagecomments } = this.props;
        this.props.getMessageComments(messageId);
        messagecomments.messagecomments.map(({ messageValue }) => (
            this.setState({
                ...this.state, messages: this.state.messages.concat([messageValue])
            })
        ))
        console.log("Messages: ", this.state.messages)
    }

    handleDelete(messageId: number): void {

    }

    handleChange(event: ChangeEvent<HTMLInputElement>): void {
        const { name, value } = event.target;
        this.setState({ ...this.state, [name]: value });
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
        this.props.getMessages();
    }

    render() {
        const { messageValue, messages } = this.state;
        return (
            <MessageContainer>
                <ListContainer>
                    <Card style={{ backgroundColor: 'black', borderRadius: '.3rem', border: 'solid 1px white', margin: '.2rem .2rem 1rem .2rem', cursor: 'pointer', color: 'white', textAlign: 'center' }}>
                        New Message +
                    </Card>
                    {
                        this.props.messages.userMessages.map(({ messageValue, messageId, dateCreated }) => (
                            <Card onClick={() => this.handleClick(messageId)} style={{ verticalAlign: 'middle', justifyContent: 'center', borderRadius: '.3rem', border: 'solid 1px white', color: 'white', backgroundColor: 'black', margin: '.2rem .2rem 1rem .2rem', cursor: 'pointer', padding: '.5rem' }} key={messageId}>
                                <Row key={messageId} xs={2}>
                                    {/* <Col xs={4}>
                                        <Image style={{ borderRadius: '.4rem', margin: '.5rem', width: '2rem', height: '2rem', objectFit: 'cover' }} fluid src={} />
                                    </Col> */}
                                    <Col xs={10}>
                                        <div style={{ alignItems: 'center' }}>
                                            {messageValue}
                                        </div>
                                    </Col>
                                    <Col xs={2}>
                                        <XCircle onClick={() => this.handleDelete(messageId)} />
                                    </Col>
                                </Row>
                            </Card>
                        ))
                    }
                </ListContainer>
                <MessageForm>
                    <Form>
                        {
                            messages.map((message, index) => (
                                <TextContainer key={index}>
                                    {message}
                                </TextContainer>
                            ))
                        }
                        <InputContainer>
                        <Row xs={2}>
                            <Col xs={10}>
                            <Form.Group className="mb-3" controlId="request">
                                <Form.Control style={{ height: '.5rem' }} as="textarea" onChange={this.handleChange} value={messageValue} name="messageValue" placeholder="Write a message" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formMedia">
                                <Form.Control onChange={this.showPreview} name="mediaLink" as="input" accept="image/*" type="file" placeholder="Media" />
                            </Form.Group>
                            </Col>
                            <Col xs={2}>
                            <button className="btn btn-outline-light" onClick={this.sendMessage}><Send/></button>
                            </Col>
                        </Row>
                        </InputContainer>
                    </Form>
                </MessageForm>
            </MessageContainer>
        );
    }
}

const mapStateToProps = (state: RootState) => {
    return {
        messages: state.message,
        messagecomments: state.messagecomment
    }
}

const mapDispatchToProps = (dispatch: Dispatch<MessageCreateStart | MessageCommentCreateStart | MessageFetchUserMessagesStart | MessageCommentFetchSingleStart>) => ({
    getMessages: () => dispatch(messageFetchUserMessagesStart()),
    getMessageComments: (messageId: number) => dispatch(messagecommentFetchSingleStart(messageId)),
    createMessage: (messageValue: string) => dispatch(messageCreateStart(messageValue)),
    createMessageComment: (messageId: number, messageValue: string, imageFile: File) => dispatch(messagecommentCreateStart(messageId, messageValue, imageFile)),
})

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(Messages);