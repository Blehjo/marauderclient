import { HubConnectionBuilder } from '@microsoft/signalr';
import { ChangeEvent, Component, Dispatch, FormEvent, ReactNode } from "react";
import { Card, Col, Form, Image, Modal, Row } from 'react-bootstrap';
import { Send, XCircle } from "react-bootstrap-icons";
import { ConnectedProps, connect } from "react-redux";

import { MessageList } from '../../components/searchbar/messagelist.component';
import { SearchBox } from '../../components/searchbar/searchbox.component';
import { Marauder } from '../../store/marauder/marauder.types';
import { MessageCreateStart, MessageDeleteStart, MessageFetchUserMessagesStart, MessageSetID, messageCreateStart, messageDeleteStart, messageFetchUserMessagesStart, messageSetId } from "../../store/message/message.action";
import { MessageState } from "../../store/message/message.reducer";
import { MessageCommentCreateStart, MessageCommentFetchSingleStart, MessageCommentSetID, messageCommentSetId, messagecommentCreateStart, messagecommentFetchSingleStart } from "../../store/messagecomment/messagecomment.action";
import { MessageCommentState } from "../../store/messagecomment/messagecomment.reducer";
import { MessageComment } from "../../store/messagecomment/messagecomment.types";
import { RootState } from "../../store/store";
import { CheckUserSession, checkUserSession } from "../../store/user/user.action";
import { User } from '../../store/user/user.types';
import { XContainer } from "../../styles/devices/devices.styles";
import { Container, InputContainer, ListContainer, MessageContainer, MessageForm, TextContainer, UserTextContainer } from "../../styles/messages/messages.styles";
import { AContainer } from '../../styles/poststab/poststab.styles';
import { SelectShape } from '../../styles/editor/editor.styles';

interface IMessage {
    users: User[];
    userMessages: MessageComment[];
    socket: boolean;
    messageValue: string;
    messages: Array<ReactNode>;
    imageSource: string | ArrayBuffer | null | undefined;
    imageFile: any;
    connection: any;
    show: boolean;
    searchField: string;
}

type MessageProps = ConnectedProps<typeof connector>;

class Messages extends Component<MessageProps, IMessage> {
    constructor(props: any) {
        super(props);
        this.state = {
            users: [],
            userMessages: [],
            socket: false,
            messageValue: "",
            imageSource: "",
            messages: [],
            imageFile: null,
            connection: null,
            show: false,
            searchField: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.showPreview = this.showPreview.bind(this);
        this.handleClickEvent = this.handleClickEvent.bind(this);
    }

    handleClickEvent() {
        this.setState({ show: !this.state.show });
    }
    
    handleMessage(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const { messageValue, imageFile } = this.state;
        this.props.createMessageComment(this.props.messages.messageId!, messageValue, imageFile);
        if (this.state.connection == null) {
            this.setState({
                connection: new HubConnectionBuilder()
                .withUrl(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/hub/${this.props.messages.messageId}`)
                .withAutomaticReconnect()
                .build()
            }, () => {
                this.state.connection.start().catch((err: string) => document.write(err));
            });
            this.state.connection.send("newMessage", "foo", messageValue);
            this.state.connection.on('messageReceived', (message: any) => {
                this.props.setMessageCommentId(message.messageCommentId);
            });
        } else {
            this.state.connection.send("newMessage", "foo", messageValue);
            this.state.connection.on('messageReceived', (message: any) => {
                this.props.setMessageCommentId(message.messageCommentId);
            });
        }
        this.setState({
            ...this.state, messageValue: ""
        })
    }

    sendMessage(event: FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        this.handleMessage(event);
    }

    handleClick(messageId: number): void {
        this.props.getMessageComments(messageId);
        this.props.setId(messageId)
    }

    handleDelete(messageId: number): void {
        this.props.deleteMessage(messageId);
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

    messageFunction(prop: MessageComment) {
        const { user } = this.props;
        const { messageCommentId, messageValue, mediaLink, favorites, type, imageSource, userId } = prop;
        if (user?.userId == userId) {
            return (
                <UserTextContainer style={{ position: 'relative' }} key={messageCommentId}>
                    {messageValue}
                </UserTextContainer>
            )
        } else {
            return (
                <TextContainer style={{ position: 'relative' }} key={messageCommentId}>
                    {messageValue}
                </TextContainer>
            )
        }
    }

    handleMessageComments(message?: ReactNode): Array<ReactNode> {
        const content: Array<ReactNode> = [];
        const { messagecomments } = this.props;
        for (let i = 0; i < messagecomments.userMessagecomments.length; i++) {
            content.push(this.messageFunction(messagecomments.userMessagecomments[i]));
        }
        if (message != undefined) {
            content.push(message);
        }
        return content;
    }
    
    componentDidMount(): void {
        this.props.getMessages();
        this.props.checkUserSession();

        fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/api/user`)
        .then(response => response.json())
        .then(users => this.setState({ users: users }));
       
        fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/api/messagecomment`)
        .then(response => response.json())
        .then(messages => this.setState({ userMessages: messages }));
    }

    componentDidUpdate(prevProps: Readonly<{ messages: MessageState; messagecomments: MessageCommentState; } & { getMessages: () => void; getMessageComments: (messageId: number) => void; createMessage: (messageValue: string, receiverId: string, marauder: Marauder) => void; deleteMessage: (messageId: number) => void; createMessageComment: (messageId: number, messageValue: string, imageFile: File) => void; setId: (messageId: number) => void; }>, prevState: Readonly<IMessage>, snapshot?: any): void {
        if (prevProps.messages.messageId != this.props.messages.messageId) {
            this.setState({
                connection: new HubConnectionBuilder()
                .withUrl(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/hub/${this.props.messages.messageId}`)
                .withAutomaticReconnect()
                .build()
            }, () => {
                this.state.connection.start().catch((err: string) => document.write(err));
            });
        }

        if (prevProps.messagecomments.messagecommentId != this.props.messagecomments.messagecommentId) {
            this.state.connection.on('messageReceived', (message: any) => {
                this.props.getMessageComments(this.props.messages.messageId!)
            });
        }
    }

    onSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
        this.setState({ searchField: event.target.value });
    };

    render() {
        const { messageValue, searchField, show, users, userMessages } = this.state;
        const filteredUsers = users.filter(user =>
            user.username?.toLowerCase().includes(searchField.toLowerCase()));
        const filteredMessages = userMessages.filter(message =>
            message.messageValue.toLowerCase().includes(searchField.toLowerCase()));
        return (
            <MessageContainer>
                <Row xs={1} md={2}>
                    <Col xs={12} md={12} lg={4}>
                <ListContainer>
                    <input style={{ borderRadius: ".3rem", width: "98%", border: 'white solid 1px', margin: '.2rem .2rem 1rem .2rem', background: 'black', textAlign: 'center' }} onClick={this.handleClickEvent} placeholder="Search" />
                    <SelectShape style={{ borderRadius: '.3rem', border: 'solid 1px white', margin: '.3rem .2rem 1rem .2rem', cursor: 'pointer', color: 'white', textAlign: 'center' }}>
                        New Message
                    </SelectShape>
                    <Modal className='deviceModal' show={show} onHide={this.handleClickEvent}>
                        <SearchBox onSearchChange={this.onSearchChange} />
                        <div>
                            {searchField.length > 0 && <MessageList users={filteredUsers} messages={filteredMessages}/>}
                        </div>
                    </Modal>
                    {
                        this.props.messages.userMessages?.map(({ messageValue, messageId, dateCreated, receiver, messageComments }) => (
                        <SelectShape onClick={() => this.handleClick(messageId)} style={{ display: 'flex', flexDirection: 'row', position: 'relative', border: '1px white solid', margin: '.25rem', padding: '.5rem', borderRadius: '.5rem' }} key={messageId}>
                            <Image style={{ width: '3rem', height: '3rem', objectFit: 'cover', borderRadius: '.5rem' }} src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/images/${receiver?.imageLink!}`}/>
                            <Row xs={1}>
                            <Col>
                            <div style={{ textAlign: 'left', marginLeft: '1rem' }}>
                                {messageValue != null && messageValue.charAt(0).toUpperCase() + messageValue.slice(1)} 
                            </div>
                            </Col>
                            <Col>
                            <div style={{ textAlign: 'left', marginLeft: '1rem' }}>
                                {messageComments[messageComments.length-1].messageValue.slice(0,25).length > 24 ? messageComments[0].messageValue.slice(0,25) + "..." : messageComments[0].messageValue.slice(0,25)}
                            </div>
                            </Col>
                            </Row>
                            <XContainer >
                                <XCircle style={{ position: 'absolute', right: '0%', margin: '0rem 1rem 0rem 0rem' }} size={20} onClick={() => this.handleDelete(messageId)} />
                            </XContainer>
                        </SelectShape>
                        ))
                    }
                </ListContainer>
                </Col>
                <Col xs={12}>
                <MessageForm>
                    <Form onSubmit={this.sendMessage}>
                        <Container style={{ height: 'fit-content', overflow: 'auto' }}>
                            {
                                this.handleMessageComments()
                            }
                        </Container>
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
                            <button className="btn btn-outline-light" type="submit" ><Send/></button>
                            </Col>
                        </Row>
                        </InputContainer>
                    </Form>
                </MessageForm>
                </Col>
                </Row>
            </MessageContainer>
        );
    }
}

const mapStateToProps = (state: RootState) => {
    return {
        user: state.user.currentUser,
        messages: state.message,
        messagecomments: state.messagecomment
    }
}

const mapDispatchToProps = (dispatch: Dispatch<CheckUserSession | MessageCreateStart | MessageDeleteStart | MessageCommentCreateStart | MessageFetchUserMessagesStart | MessageCommentFetchSingleStart | MessageSetID | MessageCommentSetID>) => ({
    getMessages: () => dispatch(messageFetchUserMessagesStart()),
    getMessageComments: (messageId: number) => dispatch(messagecommentFetchSingleStart(messageId)),
    createMessage: (messageValue: string, receiverId: string, marauder: Marauder) => dispatch(messageCreateStart(messageValue, receiverId, marauder)),
    deleteMessage: (messageId: number) => dispatch(messageDeleteStart(messageId)),
    createMessageComment: (messageId: number, messageValue: string, imageFile: File) => dispatch(messagecommentCreateStart(messageId, messageValue, imageFile)),
    setId: (messageId: number) => dispatch(messageSetId(messageId)),
    setMessageCommentId: (messageCommentId: number) => dispatch(messageCommentSetId(messageCommentId)),
    checkUserSession: () => dispatch(checkUserSession())
})

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(Messages);