import { ChangeEvent, Component } from "react";
import { Card, Col, Form, Image, Row } from 'react-bootstrap';
import { Send, XCircle } from "react-bootstrap-icons";
import { InputContainer, ListContainer, MessageContainer, MessageForm, TextContainer } from "../../styles/messages/messages.styles";

const userMessages = [
    "hello",
    "hi there",
    "what's new",
    "nothing much. just bored. hby?",
    "same ol' my boy",
    "wya?",
    "you already know..."
]

const userArray = [
    {"name": "James", "avatarUrl":"https://via.placeholder.com/1"},
    {"name": "Jomana", "avatarUrl":"https://via.placeholder.com/1"},
    {"name": "Jeda", "avatarUrl":"https://via.placeholder.com/1"}
]
type User = {
    name: string;
    avatarUrl: string;
}
interface IMessage {
    socket: boolean;
    messageValue: string;
    messages: Array<string>;
    users: Array<User>;
    imageSource: string | ArrayBuffer | null | undefined;
    imageFile: any;
}

interface IProps {
    messages?: any[];
}

class Messages extends Component<IProps, IMessage> {
    constructor(props: any) {
        super(props);
        this.state = {
            socket: false,
            messageValue: "",
            imageSource: "",
            messages: [],
            users: [],
            imageFile: null
        }
        this.handleChange = this.handleChange.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
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

    handleClick(): void {

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
        this.setState({
            ...this.state, messages: userMessages, users: userArray 
        });
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
                        userArray.map(({ name, avatarUrl }, index) => (
                            <Card onClick={() => this.handleClick()} style={{ verticalAlign: 'middle', justifyContent: 'center', borderRadius: '.3rem', border: 'solid 1px white', color: 'white', backgroundColor: 'black', margin: '.2rem .2rem 1rem .2rem', cursor: 'pointer' }} key={index}>
                                <Row key={index} xs={3}>
                                    <Col xs={4}>
                                        <Image style={{ borderRadius: '.4rem', margin: '.5rem', width: '2rem', height: '2rem', objectFit: 'cover' }} fluid src={avatarUrl} />
                                    </Col>
                                    <Col xs={5}>
                                        <div style={{ alignItems: 'center' }}>
                                            <div>
                                                {name}
                                            </div>
                                        </div>
                                    </Col>
                                    <Col xs={1}>
                                        <XCircle onClick={() => this.handleDelete(index)} />
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

export default Messages;