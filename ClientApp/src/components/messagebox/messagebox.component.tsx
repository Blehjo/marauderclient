import { ChangeEvent, Component, Dispatch, FormEvent, ReactNode } from "react";
import { ContainerBox, FixedBox, OpenedBox } from "../../styles/messagebox/messagebox.styles";
import { ChevronDown, ChevronUp, PencilSquare, Search, ThreeDots, XCircle } from "react-bootstrap-icons";
import { ConnectedProps, connect } from "react-redux";
import { RootState } from "../../store/store";
import { MessageCreateStart, MessageDeleteStart, MessageFetchUserMessagesStart, MessageSetID, messageCreateStart, messageDeleteStart, messageFetchUserMessagesStart, messageSetId } from "../../store/message/message.action";
import { MessageCommentCreateStart, MessageCommentFetchSingleStart, MessageCommentSetID, messageCommentSetId, messagecommentCreateStart, messagecommentFetchSingleStart } from "../../store/messagecomment/messagecomment.action";
import { Card, Col, Image, Row } from "react-bootstrap";
import { SetIsMessagesOpen, setIsMessagesOpen } from "../../store/messagebox/messagebox.action";
import { XContainer } from "../../styles/devices/devices.styles";
import { MessageComment } from "../../store/messagecomment/messagecomment.types";
import { TextContainer, UserTextContainer } from "../../styles/messages/messages.styles";
import { CheckUserSession, checkUserSession } from "../../store/user/user.action";
import { MessageState } from "../../store/message/message.reducer";
import { MessageCommentState } from "../../store/messagecomment/messagecomment.reducer";
import { HubConnectionBuilder } from "@microsoft/signalr";
import { User } from "../../store/user/user.types";
import { Marauder } from "../../store/marauder/marauder.types";
import { ArtificialIntelligenceState } from "../../store/artificialintelligence/artificialintelligence.reducer";
import { ArtificialIntelligenceChatState } from "../../store/artificialIntelligencechat/artificialintelligencechat.reducer";
import { ChatState } from "../../store/chat/chat.reducer";
import { ArtificialIntelligenceFetchUsersStart, artificialIntelligenceFetchUsersStart } from "../../store/artificialintelligence/artificialintelligence.action";
import { ChatFetchUserChatsStart, chatFetchUserChatsStart } from "../../store/chat/chat.action";
import { ChatComment } from "../../store/chatcomment/chatcomment.types";
import { AContainer } from "../../styles/poststab/poststab.styles";

type MessageBoxProps = ConnectedProps<typeof connector>;

interface IMessageBox {
    result: boolean;
    socket: boolean;
    messageValue: string;
    messages: Array<ReactNode>;
    imageSource: string | ArrayBuffer | null | undefined;
    imageFile: any;
    connection: any;
}

class MessageBox extends Component<MessageBoxProps, IMessageBox> {
    constructor(props: MessageBoxProps) {
        super(props);
        this.state = {
            result: this.props.messagebox,
            socket: false,
            messageValue: "",
            imageSource: "",
            messages: [],
            imageFile: null,
            connection: null
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.showPreview = this.showPreview.bind(this);
    }

    handleMessage(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const { messageValue, imageFile } = this.state;
        this.props.createMessageComment(this.props.messages.messageId!, messageValue, imageFile);
        this.state.connection.send("newMessage", "foo", messageValue);
        this.state.connection.on('messageReceived', (message: any) => {
            this.props.setMessageCommentId(message.messageCommentId);
        })
        this.setState({
            ...this.state, messageValue: ""
        })
    }

    sendMessage(event: FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        this.handleMessage(event);
    }

    handleOpen(): void {
        const { result } = this.state;
        this.setState({
            ...this.state, result: !result
        });
        this.props.openMessages(!result);
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
        this.props.getChats();
        this.props.getCrew();
        this.props.checkUserSession();
    }

    componentDidUpdate(prevProps: Readonly<{ user: User | null; crew: ArtificialIntelligenceState; crewMessages: ChatState; chatcomments: ChatComment[]; messages: MessageState; messagecomments: MessageCommentState; messagebox: boolean; } & { openMessages: (boolean: boolean) => void; getMessages: () => void; getMessageComments: (messageId: number) => void; createMessage: (messageValue: string, receiverId: string, marauder: Marauder) => void; deleteMessage: (messageId: number) => void; createMessageComment: (messageId: number, messageValue: string, imageFile: File) => void; setId: (messageId: number) => void; setMessageCommentId: (messageCommentId: number) => void; checkUserSession: () => void; getCrew: () => void; getChats: () => void; }>, prevState: Readonly<IMessageBox>, snapshot?: any): void {
        if (prevProps.messages.messageId != this.props.messages.messageId) {
            this.setState({
                connection: new HubConnectionBuilder()
                .withUrl(`https://localhost:7144/hub/${this.props.messages.messageId}`)
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
    render() {
        const { user, messagebox, messages, crewMessages } = this.props;
        return (
            <>
            {
            user &&
            <>
            { 
                messagebox ? 
                <OpenedBox>
                    <div style={{ margin: '.5rem', borderRadius: '.5rem', border: 'white solid 1px' }} >
                    <ContainerBox>
                        <Row xs={2}>
                        <Col xs={6}>
                        <Image style={{ width: '2rem', height: '2rem', borderRadius: '1rem',  objectFit: 'fill' }} fluid src={user?.imageLink ? user?.imageSource! : ""}/>
                        </Col>
                        <Col>
                            <div style={{ paddingTop: '.3rem' }}>Comms</div>
                        </Col>
                        </Row>
                    </ContainerBox> 
                    <ContainerBox>
                        <div style={{ position: 'absolute', right: '1rem' }}>
                            <ThreeDots size={20} style={{ cursor: 'pointer' }}/>
                            <Search size={28} style={{ padding: '0rem .4rem 0rem .4rem', cursor: 'pointer' }}/>
                            <PencilSquare size={30} style={{ padding: '0rem .4rem 0rem .4rem', cursor: 'pointer' }}/>
                            <ChevronDown onClick={this.handleOpen} size={20} style={{ cursor: 'pointer' }}/>
                        </div>
                    </ContainerBox>
                    </div>
                    {
                        messages.userMessages?.map(({ messageValue, messageId, dateCreated, receiver }) => (
                            <Card onClick={() => this.handleClick(messageId)} style={{ verticalAlign: 'middle', justifyContent: 'center', borderRadius: '.3rem', border: 'solid 1px white', color: 'white', backgroundColor: 'black', margin: '1rem 1rem 1rem 1rem', cursor: 'pointer', padding: '.5rem' }} key={messageId}>
                                <AContainer >
                                <Row xs={2}>
                                    <Col xs={2}>
                                    <Card.Img src={`https://localhost:7144/images/${receiver?.imageLink!}`}/>
                                    </Col>
                                    <Col>
                                    <Card.Text>{messageValue}</Card.Text>
                                    </Col>
                                </Row>
                                </AContainer>
                                <XContainer style={{ position: 'absolute', top: '0.5rem', right: '0.5rem' }}>
                                    <XCircle onClick={() => this.handleDelete(messageId)} />
                                </XContainer>
                            </Card>
                        ))
                    }
                    {
                        crewMessages.userChats?.map(({ title, chatId, dateCreated, artificialIntelligences }) => (
                            <Card onClick={() => this.handleClick(chatId)} style={{ verticalAlign: 'middle', justifyContent: 'center', borderRadius: '.3rem', border: 'solid 1px white', color: 'white', backgroundColor: 'black', margin: '1rem 1rem 1rem 1rem', cursor: 'pointer', padding: '.5rem' }} key={chatId}>
                                <AContainer >
                                <Row xs={2}>
                                    <Col xs={2}>
                                    <Card.Img src={`https://localhost:7144/images/${artificialIntelligences?.imageLink!}`}/>
                                    </Col>
                                    <Col>
                                    <Card.Text>{title}</Card.Text>
                                    </Col>
                                </Row>
                                </AContainer>
                                <XContainer style={{ position: 'absolute', top: '0.5rem', right: '0.5rem' }}>
                                    <XCircle onClick={() => this.handleDelete(chatId)} />
                                </XContainer>
                            </Card>
                        ))
                    }
                </OpenedBox> :
                <FixedBox>
                    <div style={{  borderRadius: '.5rem', border: 'white solid 1px' }} >
                    <ContainerBox>
                        <Row xs={2}>
                        <Col xs={6}>
                            <Image style={{ width: '2rem', height: '2rem', borderRadius: '1rem',  objectFit: 'fill' }} fluid src={user?.imageLink ? user?.imageSource! : ""}/>
                        </Col>
                        <Col>
                            <div style={{ paddingTop: '.3rem' }}>Comms</div>
                        </Col>
                        </Row>
                    </ContainerBox> 
                    <ContainerBox>
                        <div style={{ position: 'absolute', right: '1rem' }}>
                            <ThreeDots size={20} style={{ cursor: 'pointer' }}/>
                            <Search size={28} style={{ padding: '0rem .4rem 0rem .4rem', cursor: 'pointer' }}/>
                            <PencilSquare size={30} style={{ padding: '0rem .4rem 0rem .4rem', cursor: 'pointer' }}/>
                            <ChevronUp onClick={this.handleOpen} size={20} style={{ cursor: 'pointer' }}/>
                        </div>
                    </ContainerBox>
                    </div>
                </FixedBox>
            }
            </>
            }
            </>
        )
    }
}

const mapStateToProps = (state: RootState) => {
    return { 
        user: state.user.currentUser,
        crew: state.artificialIntelligence,
        crewMessages: state.chat,
        chatcomments: state.chatcomment.userChatcomments,
        messages: state.message,
        messagecomments: state.messagecomment,
        messagebox: state.messagebox.isMessagesOpen
    };
};

const mapDispatchToProps = (dispatch: Dispatch<ArtificialIntelligenceFetchUsersStart | ChatFetchUserChatsStart | CheckUserSession | SetIsMessagesOpen | MessageCreateStart | MessageDeleteStart | MessageCommentCreateStart | MessageFetchUserMessagesStart | MessageCommentFetchSingleStart | MessageSetID | MessageCommentSetID>) => ({
    openMessages: (boolean: boolean) => dispatch(setIsMessagesOpen(boolean)),
    getMessages: () => dispatch(messageFetchUserMessagesStart()),
    getMessageComments: (messageId: number) => dispatch(messagecommentFetchSingleStart(messageId)),
    createMessage: (messageValue: string, receiverId: string, marauder: Marauder) => dispatch(messageCreateStart(messageValue, receiverId, marauder)),
    deleteMessage: (messageId: number) => dispatch(messageDeleteStart(messageId)),
    createMessageComment: (messageId: number, messageValue: string, imageFile: File) => dispatch(messagecommentCreateStart(messageId, messageValue, imageFile)),
    setId: (messageId: number) => dispatch(messageSetId(messageId)),
    setMessageCommentId: (messageCommentId: number) => dispatch(messageCommentSetId(messageCommentId)),
    checkUserSession: () => dispatch(checkUserSession()),
    getCrew: () => dispatch(artificialIntelligenceFetchUsersStart()),
    getChats: () => dispatch(chatFetchUserChatsStart()),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(MessageBox);