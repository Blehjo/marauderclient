import { ChangeEvent, Component, Dispatch, FormEvent, ReactNode } from "react";
import { Card, Col, Dropdown, Form, Image, Modal, Row } from "react-bootstrap";
import { Clipboard, PencilSquare, Plus, Send, XCircle } from "react-bootstrap-icons";
import { ConnectedProps, connect } from "react-redux";

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
import { ChatCreateStart, ChatFetchUserChatsStart, ChatSetID, chatCreateStart, chatFetchUserChatsStart, chatSetId } from "../../store/chat/chat.action";
import { ChatState } from "../../store/chat/chat.reducer";
import { Chat } from "../../store/chat/chat.types";
import { ChatCommentCreateStart, ChatCommentFetchSingleStart, chatcommentCreateStart, chatcommentFetchSingleStart } from "../../store/chatcomment/chatcomment.action";
import { ChatComment } from "../../store/chatcomment/chatcomment.types";
import { RootState } from "../../store/store";
import { ChatBox, ChatForm, ChatsContainer, Container, CrewContainer, CrewMemberContainer, PenContainer } from "../../styles/crew/crew.styles";
import { ButtonContainer, CardContainer, FormContainer } from "../../styles/devices/devices.styles";
import { InputContainer, TextContainer } from "../../styles/messages/messages.styles";
import { addChat } from "../../utils/api/chat.api";
import { callArtoo } from "../../utils/api/completion.api";

type CrewProps = ConnectedProps<typeof connector>;

interface ICrew {
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
}

const chatArray: Array<ReactNode> = [];

class Crew extends Component<CrewProps, ICrew> {
    constructor(props: CrewProps) {
        super(props);
        this.state = {
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
            dropDownValue: this.props.artificialIntelligence[0]?.name
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.showPreview = this.showPreview.bind(this);
        this.handleChatSelect = this.handleChatSelect.bind(this);
        this.createNewChat = this.createNewChat.bind(this);
        this.setDropDown = this.setDropDown.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.getArtificialChat = this.getArtificialChat.bind(this);
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

    async handleMessage(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const { messageValue, imageFile } = this.state;
        this.props.addChatComment(2, messageValue, imageFile);
    }

    sendMessage(event) {
        event.preventDefault();
        const { messageValue, imageFile, artificialIntelligenceId } = this.state;
        const webSocket = new WebSocket(`wss://localhost:7144/ws/10`);
        // if (this.props.chats.chatId == null) {
            // addChat(messageValue, artificialIntelligenceId)
            // .then((response) => {
            //     this.props.setId(response.chatId);
            // });

            this.handleMessage(event);
            webSocket.onopen = (event) => {
                webSocket.send(messageValue);
                this.setState({
                    messageValue: ""
                })
            };
            
            webSocket.onmessage = (event) => {
                if (event.data) {
                    this.handleChatComments(
                        <TextContainer style={{ position: 'relative' }} key={event.data}>
                            {/* <Clipboard style={{ position: 'absolute', right: '2%', cursor: 'pointer' }} onClick={() => {navigator.clipboard.writeText(event.data)}} size={15}/> */}
                            {event.data}
                        </TextContainer>
                    )
                    webSocket.close();
                }
            }
            
            // callArtoo(messageValue)
            // .then((response) => {
            //     this.props.addChatComment(this.props.chats.chatId, response.data, imageFile)
            //     webSocket.onopen = (event) => {
            //         webSocket.send(response.data);
            //         this.setState({
            //             messageValue: ""
            //         })
            //     };

            //     webSocket.onmessage = (event) => {
            //         this.handleChatComments(
            //             <TextContainer style={{ position: 'relative' }}>
            //                 <Clipboard style={{ position: 'absolute', right: '2%', cursor: 'pointer' }} onClick={() => {navigator.clipboard.writeText(event.data)}} size={15}/>
            //                 {event.data}
            //             </TextContainer>
            //         )
            //         webSocket.close();
            //     }
            // });


        // } else {
        //     let webSocket = new WebSocket(`wss://localhost:7144/ws/1`);
        //     this.props.addChatComment(this.props.chats.chatId!, messageValue, imageFile);
        //     webSocket.onopen = (event) => {
        //         webSocket.send(messageValue);
        //         this.setState({
        //             messageValue: ""
        //         })
        //     };
    
        //     webSocket.onmessage = (event) => {
        //         if (event.data) {
        //             this.handleChatComments(
        //                 <TextContainer style={{ position: 'relative' }}>
        //                     <Clipboard style={{ position: 'absolute', right: '2%', cursor: 'pointer' }} onClick={() => {navigator.clipboard.writeText(event.data)}} size={15}/>
        //                     {event.data}
        //                 </TextContainer>
        //             )
        //             webSocket.close();
        //         }
        //     }

        //     await callArtoo(messageValue)
        //     .then((response) => {
        //         this.props.addChatComment(this.props.chats.chatId!, response.data, imageFile)

        //         webSocket.onopen = (event) => {
        //             webSocket.send(response.data);
        //             this.setState({
        //                 messageValue: ""
        //             })
        //         };

        //         webSocket.onmessage = (event) => {
        //             if (event.data) {
        //                 this.handleChatComments(
        //                     <TextContainer style={{ position: 'relative' }}>
        //                         <Clipboard style={{ position: 'absolute', right: '2%', cursor: 'pointer' }} onClick={() => {navigator.clipboard.writeText(event.data)}} size={15}/>
        //                         {event.data}
        //                     </TextContainer>
        //                 )
        //                 webSocket.close();
        //             }
        //         }
        //     });
        // }
    }

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
        }
        return content;
    }

    componentDidMount(): void {
        this.props.getCrew();
        this.props.getChats();
    }
    

    componentDidUpdate(prevProps: Readonly<{ artificialIntelligence: ArtificialIntelligenceState; chats: ChatState; chatcomments: ChatComment[]; } & { addCrew: (name: string, role: string, imageFile: File) => void; deleteCrew: (artificialIntelligenceId: number) => void; getCrew: () => void; getChats: () => void; getAiChats: (artificialIntelligenceId: number) => void; addChat: (title: string, artificialIntelligenceId: number) => void; getChatComments: (chatId: number) => void; addChatComment: (chatId: number, chatValue: string, mediaLink: File) => void; }>, prevState: Readonly<ICrew>, snapshot?: any): void {
        if (prevProps.chats.userChats.length != this.props.chats.userChats.length) {
            this.props.getChats();
            this.setState({
                chats: this.props.chats.userChats
            });
        }

        if (prevProps.artificialIntelligence.artificialIntelligences.length != this.props.artificialIntelligence.artificialIntelligences.length) {
            this.props.getCrew();
        }
        
        if (prevProps.chats.chatId != this.props.chats.chatId) {
            this.props.getChatComments(this.props.chats.chatId);
        }
    }

    render() {
        const { dropDownValue, show, role, name, messageValue, inputContainer, chats, messages } = this.state;
        const { artificialIntelligence, chatcomments } = this.props;
        return (
            <CrewContainer>
                <CrewMemberContainer>
                    <CardContainer key='cardcontainer' onClick={this.handleClick}>New Crew +</CardContainer>
                    {
                        artificialIntelligence.userArtificialIntelligences.map(({ artificialIntelligenceId, name, role, imageSource }, index) => (
                            <Card key={artificialIntelligenceId} onClick={() => this.getArtificialChat(name, artificialIntelligenceId)} style={{ verticalAlign: 'middle', justifyContent: 'center', borderRadius: '.3rem', border: 'solid 1px white', color: 'white', backgroundColor: 'black', margin: '.2rem .2rem 1rem .2rem', cursor: 'pointer' }}>
                                <Row key={index} xs={3}>
                                    <Col key='col1' xs={4}>
                                        <Image style={{ borderRadius: '.4rem', margin: '.5rem', width: '2rem', height: '2rem', objectFit: 'cover' }} fluid src={imageSource} />
                                    </Col>
                                    <Col key='col2' xs={5}>
                                        <div style={{ alignItems: 'center' }}>
                                                {name}
                                        </div>
                                    </Col>
                                    <Col key='col3' xs={1}>
                                        <XCircle onClick={() => this.handleDelete(artificialIntelligenceId)} />
                                    </Col>
                                </Row>
                            </Card>
                        ))
                    }
                </CrewMemberContainer>
                <ChatForm>
                    <Form onSubmit={this.sendMessage}>
                        <Dropdown style={{ position: 'absolute', left: '2%', marginBottom: '1rem' }}>
                            <Dropdown.Toggle variant="dark" id="dropdown-autoclose-true">{dropDownValue}</Dropdown.Toggle>
                            <Dropdown.Menu>
                                {
                                    artificialIntelligence.userArtificialIntelligences.map(({ name, artificialIntelligenceId }) => (
                                        <Dropdown.Item onClick={() => this.setDropDown(name, artificialIntelligenceId )} eventKey="1">{name}</Dropdown.Item>
                                    ))
                                }
                            </Dropdown.Menu>
                        </Dropdown>
                        <PenContainer onClick={this.createNewChat}>
                            <PencilSquare size={30}/>
                        </PenContainer>
                        <Container>
                        {
                            inputContainer ? 
                            this.handleChatComments()
                            : 
                                artificialIntelligence.userArtificialIntelligences.find(({artificialIntelligenceId}) => artificialIntelligenceId == this.state.artificialIntelligenceId)?.chats != null &&
                                artificialIntelligence.userArtificialIntelligences.find(({artificialIntelligenceId}) => artificialIntelligenceId == this.state.artificialIntelligenceId)?.chats.map(({ chatId, title, artificialIntelligence }) => (
                                    <ChatBox style={{ cursor: 'pointer' }} onClick={() => this.handleChatSelect(chatId, artificialIntelligence?.artificialIntelligenceId, artificialIntelligence?.name)} key={chatId}>
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
                                <button className="btn btn-outline-light" type="submit"><Send/></button>
                                </Col>
                            </Row>
                            </InputContainer>
                        }
                    </Form>
                </ChatForm>
                <ChatsContainer>
                    <CardContainer>Chats</CardContainer>
                    {
                        this.props.chats.userChats.map(({ artificialIntelligence, chatId, title }, index) => (
                            <Card onClick={() => this.handleChatSelect(chatId, artificialIntelligence?.artificialIntelligenceId, artificialIntelligence?.name)} style={{ verticalAlign: 'middle', justifyContent: 'center', borderRadius: '.3rem', border: 'solid 1px white', color: 'white', backgroundColor: 'black', margin: '.2rem .2rem 1rem .2rem', cursor: 'pointer', padding: '.5rem' }} key={index}>
                                <Row key={index} xs={2}>
                                    <Col xs={10}>
                                        <div style={{ alignItems: 'center' }}>
                                            {title}
                                        </div>
                                    </Col>
                                    <Col xs={2}>
                                        <XCircle onClick={() => this.handleDelete(chatId)} />
                                    </Col>
                                </Row>
                            </Card>
                        ))
                    }
                </ChatsContainer>
                <Modal show={show} onHide={this.handleClick}>
                    <Modal.Header closeButton>Add a crew member</Modal.Header>
                    <Modal.Body>
                    <Form onSubmit={this.handleSubmit}>
                        <FormContainer>
                            <Dropdown style={{ marginBottom: '1rem' }}>
                            <Dropdown.Toggle variant="dark" id="dropdown-autoclose-true">{dropDownValue}</Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item eventKey="1">Arduino Nano</Dropdown.Item>
                                    <Dropdown.Item eventKey="2">Esp 32</Dropdown.Item>
                                    <Dropdown.Item eventKey="3">Esp 32 Camera</Dropdown.Item>
                                    <Dropdown.Item eventKey="4">Raspberry Pi 4</Dropdown.Item>
                                    <Dropdown.Item eventKey="4">Raspberry Pi Zero W</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
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

const mapDispatchToProps = (dispatch: Dispatch<ArtificialIntelligenceCreateStart | ArtificialIntelligenceDeleteStart | ArtificialIntelligenceFetchUsersStart | ArtificialIntelligenceFetchSingleStart | ArtificialIntelligenceChatCreateStart | ChatCreateStart |ChatCommentCreateStart | ChatFetchUserChatsStart | ChatCommentFetchSingleStart | ChatSetID>) => ({
    addCrew: (name: string, role: string, imageFile: File) => dispatch(artificialIntelligenceCreateStart(name, role, imageFile)),
    deleteCrew: (artificialIntelligenceId: number) => dispatch(artificialIntelligenceDeleteStart(artificialIntelligenceId)),
    getCrew: () => dispatch(artificialIntelligenceFetchUsersStart()),
    getChats: () => dispatch(chatFetchUserChatsStart()),
    getAiChats: (artificialIntelligenceId: number) => dispatch(artificialIntelligenceFetchSingleStart(artificialIntelligenceId)),
    addChat: async (title: string, artificialIntelligenceId: number) => dispatch(chatCreateStart(title, artificialIntelligenceId)),
    getChatComments: (chatId: number) => dispatch(chatcommentFetchSingleStart(chatId)),
    addChatComment: (chatId: number, chatValue: string, mediaLink: File) => dispatch(chatcommentCreateStart(chatId, chatValue, mediaLink)),
    addArtificialChat: (artificialIntelligenceId: number, artificialIntelligence: ArtificialIntelligence, chatId: number, chat: Chat) => dispatch(artificialIntelligenceChatCreateStart(artificialIntelligenceId, artificialIntelligence, chatId, chat)),
    setId: (chatId: number) => dispatch(chatSetId(chatId))
});

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(Crew);