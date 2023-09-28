import { ChangeEvent, Component, Dispatch, FormEvent, ReactNode } from "react";
import { Card, Col, Dropdown, Form, Image, Modal, Row } from "react-bootstrap";
import { Clipboard, PencilSquare, Plus, Send, XCircle } from "react-bootstrap-icons";
import { ConnectedProps, connect } from "react-redux";
import { Textfit } from 'react-textfit';

import { ArtificialIntelligenceChatCreateStart, artificialIntelligenceChatCreateStart } from "../../store/artificialIntelligencechat/artificialintelligencechat.action";
import {
    ArtificialIntelligenceCreateStart,
    ArtificialIntelligenceDeleteStart,
    ArtificialIntelligenceFetchSingleStart,
    ArtificialIntelligenceFetchUsersStart,
    artificialIntelligenceCreateStart,
    artificialIntelligenceDeleteStart,
    artificialIntelligenceFetchSingleStart,
    artificialIntelligenceFetchUsersStart
} from "../../store/artificialintelligence/artificialintelligence.action";
import { ArtificialIntelligenceState } from "../../store/artificialintelligence/artificialintelligence.reducer";
import { ArtificialIntelligence } from "../../store/artificialintelligence/artificialintelligence.types";
import { ChatCreateStart, ChatDeleteStart, ChatFetchUserChatsStart, ChatSetID, chatCreateStart, chatDeleteStart, chatFetchUserChatsStart, chatSetId } from "../../store/chat/chat.action";
import { ChatState } from "../../store/chat/chat.reducer";
import { Chat } from "../../store/chat/chat.types";
import { ChatCommentCreateStart, ChatCommentFetchSingleStart, chatcommentCreateStart, chatcommentFetchSingleStart } from "../../store/chatcomment/chatcomment.action";
import { ChatComment } from "../../store/chatcomment/chatcomment.types";
import { RootState } from "../../store/store";
import { ChatBox, ChatForm, ChatsContainer, Container, CrewContainer, CrewMemberContainer, HeaderContainer, PenContainer } from "../../styles/crew/crew.styles";
import { ButtonContainer, CardContainer, FormContainer, XContainer } from "../../styles/devices/devices.styles";
import { InputContainer, TextContainer } from "../../styles/messages/messages.styles";
import { addChat, getUsersChats } from "../../utils/api/chat.api";
import { callArtoo } from "../../utils/api/completion.api";
import { AContainer } from "../../styles/poststab/poststab.styles";
import { SearchBox } from "../../components/searchbar/searchbox.component";
import { AiList } from "../../components/searchbar/ailist.component";
import { getUsersArtificialIntelligences } from "../../utils/api/artificialintelligence.api";
import { getAllChatComments } from "../../utils/api/chatcomment.api";
import { getUsersArtificialIntelligenceChats } from "../../utils/api/artificialintelligencechat.api";

interface ICrew {
    artificialIntelligences: ArtificialIntelligence[];
    userchats: Chat[];
    userchatcomments: ChatComment[];
    name: string;
    role: string;
    imageSource: string | ArrayBuffer | null | undefined;
    imageFile: any;
    show: boolean;
    messageValue: string;
    messages: Array<string>;
    chatId: number | null;
    chats: Array<Chat>;
    artificialIntelligenceId: number | null;
    inputContainer: boolean;
    dropDownValue: string;
    showInput: boolean;
    searchField: string;
}

type CrewProps = ConnectedProps<typeof connector>;

class Crew extends Component<CrewProps, ICrew> {
    constructor(props: CrewProps) {
        super(props);
        this.state = {
            artificialIntelligences: [],
            userchats: [],
            userchatcomments: [],
            name: "",
            role: "",
            imageSource: "",
            imageFile: null,
            artificialIntelligenceId: null,
            chatId: null,
            chats: [],
            messages: [],
            show: false,
            inputContainer: false,
            messageValue: "",
            dropDownValue: "Choose Crew",
            showInput: false,
            searchField: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.showPreview = this.showPreview.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChatSelect = this.handleChatSelect.bind(this);
        this.createNewChat = this.createNewChat.bind(this);
        this.setDropDown = this.setDropDown.bind(this);
        this.getArtificialChat = this.getArtificialChat.bind(this);
        this.handleClickEvent = this.handleClickEvent.bind(this);
    }

    handleClickEvent() {
        this.setState({ showInput: !this.state.showInput });
    }

    createNewChat(): void {
        this.setState({
            inputContainer: true
        });
    }
    

    getArtificialChat(name: string, artificialIntelligenceId: number): void {
        this.props.getAiChats(artificialIntelligenceId);
        this.setDropDown(name, artificialIntelligenceId);
        this.setState({
            inputContainer: false
        });
    }

    handleChatSelect(chatId: number, artificialIntelligenceId: number, name: string): void {
        this.props.setId(chatId);
        this.props.getChatComments(chatId);
        this.setDropDown(name, artificialIntelligenceId)
        this.setState({
            ...this.state, inputContainer: true
        });
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

    handleChatDelete(chatId: number): void {
        this.props.deleteChat(chatId);
    }

    handleDelete(artificialIntelligenceId: number): void {
        this.props.deleteCrew(artificialIntelligenceId)
    }

    handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const { name, role, imageFile } = this.state;
        this.props.addCrew(name, role, imageFile);
        this.setState({
            ...this.state, show: !this.state.show, name: "", role: "", imageFile: null
        });
    }

    handleMessage(event: FormEvent<HTMLFormElement>, artoo?: string) {
        event.preventDefault();
        const { messageValue, imageFile } = this.state;
        const socket = new WebSocket(`wss://localhost:7144/ws/3`);
        
        if (artoo != undefined) {
            this.props.addChatComment(this.props.chats.chatId!, artoo, imageFile);
            socket.onopen = (event) => {
                socket.send(artoo);
            };
    
            socket.onmessage = (event) => {
                if (event.data) {
                    this.handleChatComments(
                        <TextContainer style={{ position: 'relative' }} key={event.data}>
                            {event.data}
                        </TextContainer>
                    )
                }
            }
        } else {
            this.props.addChatComment(this.props.chats.chatId!, messageValue, imageFile);
            socket.onopen = (event) => {
                socket.send(messageValue);
            };
            
            socket.onmessage = (event) => {
                if (event.data) {
                    this.handleChatComments(
                        <TextContainer style={{ position: 'relative' }} key={event.data}>
                        {event.data}
                    </TextContainer>
                    )
                }
            }
        }
    }

    async sendMessage(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const { messageValue, artificialIntelligenceId } = this.state;

        if (this.props.chats.chatId == null) {
            await addChat(messageValue, artificialIntelligenceId!)
            .then((response) => {
                this.props.setId(response.chatId);
                this.handleMessage(event);
                callArtoo(messageValue)
                .then((artoo) => {
                    this.handleMessage(event, artoo.data);
                    this.setState({
                        messageValue: ""
                    })
                })
            });
        } else {
            this.handleMessage(event);
            callArtoo(messageValue)
            .then((artoo) => {
                this.handleMessage(event, artoo.data);
                this.setState({
                    messageValue: ""
                })
            });
        }
    }

    // async speakWith(event: FormEvent<HTMLFormElement>) {
    //     event.preventDefault();
    //     const { artificialId, chatValue, chatId, imageFile } = this.state;
    //     const { chats } = this.props;
    //     try {
    //         if (chats.chatId == null) {
    //             await addChat(chatValue, artificialId)
    //             .then((response) => this.props.setId(response.chatId))
    //             .then((response) => this.props.createComment(this.props.chats.chatId!, chatValue, imageFile));

    //             await callArtoo(chatValue)
    //             .then((response) => this.props.createComment(this.props.chats.chatId!, response.data, imageFile));
    //         } else {
    //             this.props.createComment(this.props.chats.chatId!, chatValue, imageFile);

    //             await callArtoo(chatValue)
    //             .then((response) => this.props.createComment(this.props.chats.chatId!, response.data, imageFile));
    //         }
    //     } catch (error: any) {
    //         if (error) {
    //             alert(error)
    //         }
    //     }
    // }

    setDropDown(name: string, artificialIntelligenceId: number): void {
        this.setState({
            ...this.state, dropDownValue: name, artificialIntelligenceId: artificialIntelligenceId
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

    chatFunction(prop: ChatComment) {
        const { chatCommentId, chatValue, mediaLink, type } = prop;
        return (
            <TextContainer style={{ position: 'relative', height: 'auto' }} key={chatCommentId}>
                <Clipboard style={{ position: 'absolute', right: '2%', cursor: 'pointer' }} onClick={() => {navigator.clipboard.writeText(chatValue)}} size={15}/>
                {chatValue}
            </TextContainer>
        )
    }

    handleChatComments(chat?: ReactNode): Array<ReactNode> {
        const content: Array<ReactNode> = [];
        const { chatcomments } = this.props;
        for (let i = 0; i < chatcomments.length; i++) {
            content.push(this.chatFunction(chatcomments[i]));
        }
        if (chat != undefined) {
            content.push(chat);
            return content;
        }
        return content;
    }

    onSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
        this.setState({ searchField: event.target.value });
    };

    componentDidMount(): void {
        this.props.getCrew();
        this.props.getChats();
        getUsersArtificialIntelligences()
        .then(artificialIntelligences => this.setState({ artificialIntelligences: artificialIntelligences }));
       
        getUsersChats()
        .then(chats => this.setState({ userchats: chats }));

        getAllChatComments()
        .then(chatcomments => this.setState({ userchatcomments: chatcomments }));
    }

    render() {
        const { dropDownValue, show, role, name, messageValue, inputContainer, showInput, searchField, artificialIntelligences, userchats, userchatcomments } = this.state;
        const { artificialIntelligence, } = this.props;
        const filteredAis = artificialIntelligences.filter(artificialIntelligence =>
            artificialIntelligence.name?.toLowerCase().includes(searchField.toLowerCase()));
        const filteredChats = userchats.filter(chat =>
            chat.title.toLowerCase().includes(searchField.toLowerCase()));
        const filteredChatcomments = userchatcomments.filter(chat =>
            chat.chatValue.toLowerCase().includes(searchField.toLowerCase()));
        return (
            <CrewContainer>
                <Row xs={1} md={2} xl={3}>
                    <Col xs={12} md={12} lg={4}>
                <CrewMemberContainer>
                    <input style={{ borderRadius: ".3rem", width: "98%", border: 'white solid 1px', margin: '.2rem .2rem 1rem .2rem', background: 'black', textAlign: 'center' }} onClick={this.handleClickEvent} placeholder="Search" />
                    <CardContainer key='cardcontainer' onClick={this.handleClick}>New Crew +</CardContainer>
                    <Modal size="lg" style={{ color: 'white' }} show={showInput} onHide={this.handleClickEvent}>
                        <SearchBox onSearchChange={this.onSearchChange} />
                        <div style={{ background: 'black' }}>
                            {searchField.length > 0 && <AiList artificialIntelligences={filteredAis} chats={filteredChats} chatcomments={filteredChatcomments} />}
                        </div>
                    </Modal>
                    {
                        artificialIntelligence.userArtificialIntelligences?.map(({ artificialIntelligenceId, name, role, imageSource }, index) => (
                            <Card key={artificialIntelligenceId} onClick={() => this.getArtificialChat(name, artificialIntelligenceId)} style={{ backgroundColor: 'black', borderRadius: '.3rem', border: 'solid 1px white', margin: '.2rem .2rem 1rem .2rem', cursor: 'pointer', color: 'white', textAlign: 'center' }}>
                                <AContainer >
                                <Row xs={2}>
                                    <Col xs={3}>
                                    <Card.Img src={imageSource}/>
                                    </Col>
                                    <Col>
                                    <Card.Text>{name}</Card.Text>
                                    </Col>
                                </Row>
                                </AContainer>
                                <XContainer style={{ position: 'absolute', top: '0rem', right: '0.5rem' }}>
                                    <XCircle onClick={() => this.handleDelete(artificialIntelligenceId)} />
                                </XContainer>
                            </Card>
                        ))
                    }
                </CrewMemberContainer>
                </Col>
                <Col xs={12} md={12} lg={4}>
                <ChatsContainer>
                    <CardContainer>Chats</CardContainer>
                    {
                        this.props.chats.userChats?.map(({ artificialIntelligences, chatId, title }, index) => (
                            <Card onClick={() => this.handleChatSelect(chatId, artificialIntelligences?.artificialIntelligenceId, artificialIntelligences?.name)} style={{ verticalAlign: 'middle', justifyContent: 'center', borderRadius: '.3rem', border: 'solid 1px white', color: 'white', backgroundColor: 'black', margin: '.2rem .2rem 1rem .2rem', cursor: 'pointer', padding: '.5rem' }} key={index}>
                                <AContainer>
                                <Row xs={1}>
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
                </ChatsContainer>
                </Col>
                <Col xs={12}>
                <ChatForm>
                    <Form onSubmit={this.sendMessage}>
                        <HeaderContainer>
                        <Dropdown style={{ }}>
                            <Dropdown.Toggle variant="dark" id="dropdown-autoclose-true">{dropDownValue}</Dropdown.Toggle>
                            <Dropdown.Menu>
                                {/* {
                                artificialIntelligence.userArtificialIntelligences?.map(({ name, artificialIntelligenceId }) => (
                                    <Dropdown.Item onClick={() => this.setDropDown(name, artificialIntelligenceId )} eventKey="1">{name}</Dropdown.Item>
                                    ))
                                } */}
                            </Dropdown.Menu>
                        </Dropdown>
                        <PenContainer onClick={this.createNewChat}>
                            <PencilSquare size={30}/>
                        </PenContainer>
                        </HeaderContainer>
                        <Container>
                        {
                            inputContainer ? 
                            this.handleChatComments()
                            : 
                                artificialIntelligence.userArtificialIntelligences?.find(({artificialIntelligenceId}) => artificialIntelligenceId == this.state.artificialIntelligenceId)?.chats != null &&
                                artificialIntelligence.userArtificialIntelligences?.find(({artificialIntelligenceId}) => artificialIntelligenceId == this.state.artificialIntelligenceId)?.chats?.map(({ chatId, title, artificialIntelligences }) => (
                                    <ChatBox style={{ cursor: 'pointer' }} onClick={() => this.handleChatSelect(chatId, artificialIntelligences?.artificialIntelligenceId, artificialIntelligences?.name)} key={chatId}>
                                    {title}
                                    </ChatBox>
                                ))
                        }
                        </Container>
                        {
                            inputContainer &&
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
                                <button className="btn btn-outline-light"><Send/></button>
                                </Col>
                            </Row>
                            </InputContainer>
                        }
                    </Form>
                </ChatForm>
                </Col>
                </Row>
                <Modal show={show} onHide={this.handleClick}>
                    <Modal.Header closeButton>Add a crew member</Modal.Header>
                    <Modal.Body>
                    <Form onSubmit={this.handleSubmit}>
                        <FormContainer>
                            <ButtonContainer className="btn btn-outline-dark" type="submit">
                                <Plus style={{ cursor: 'pointer' }} size={15}/>
                            </ButtonContainer>
                        </FormContainer>
                        <Form.Group className="mb-3" controlId="name">
                            <Form.Control style={{ height: '.5rem' }} as="textarea" onChange={this.handleChange} value={name} name="name" placeholder="Crew name" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="role">
                            <Form.Control style={{ height: '.5rem' }} as="textarea" onChange={this.handleChange} value={role} name="role" placeholder="Crew role" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formMedia">
                            <Form.Control onChange={this.showPreview} name="mediaLink" as="input" accept="image/*" type="file" placeholder="Media" />
                        </Form.Group>
                    </Form>
                    </Modal.Body>
                </Modal>
            </CrewContainer>
        );
    }
}

const mapStateToProps = (state: RootState) => ({
    artificialIntelligence: state.artificialIntelligence,
    chats: state.chat,
    chatcomments: state.chatcomment.userChatcomments
});

const mapDispatchToProps = (dispatch: Dispatch<ArtificialIntelligenceCreateStart | ArtificialIntelligenceDeleteStart | ArtificialIntelligenceFetchUsersStart | ArtificialIntelligenceFetchSingleStart | ArtificialIntelligenceChatCreateStart | ChatCreateStart | ChatDeleteStart | ChatCommentCreateStart | ChatFetchUserChatsStart | ChatCommentFetchSingleStart | ChatSetID>) => ({
    addCrew: (name: string, role: string, imageFile: File) => dispatch(artificialIntelligenceCreateStart(name, role, imageFile)),
    deleteCrew: (artificialIntelligenceId: number) => dispatch(artificialIntelligenceDeleteStart(artificialIntelligenceId)),
    getCrew: () => dispatch(artificialIntelligenceFetchUsersStart()),
    getChats: () => dispatch(chatFetchUserChatsStart()),
    getAiChats: (artificialIntelligenceId: number) => dispatch(artificialIntelligenceFetchSingleStart(artificialIntelligenceId)),
    addChat: async (title: string, artificialIntelligenceId: number) => dispatch(chatCreateStart(title, artificialIntelligenceId)),
    deleteChat: (chatId: number) => dispatch(chatDeleteStart(chatId)),
    getChatComments: (chatId: number) => dispatch(chatcommentFetchSingleStart(chatId)),
    addChatComment: (chatId: number, chatValue: string, mediaLink: File) => dispatch(chatcommentCreateStart(chatId, chatValue, mediaLink)),
    addArtificialChat: (artificialIntelligenceId: number, artificialIntelligence: ArtificialIntelligence, chatId: number, chat: Chat) => dispatch(artificialIntelligenceChatCreateStart(artificialIntelligenceId, artificialIntelligence, chatId, chat)),
    setId: (chatId: number) => dispatch(chatSetId(chatId))
});

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(Crew);