import { Component, Fragment } from 'react';
import { Badge, Card, Col, Image, Modal, Row } from 'react-bootstrap';

import { ArrowsFullscreen, Globe, Rocket } from 'react-bootstrap-icons';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { BadgeContainer, CardContainer, ChatContainer, ModalContainer, TextContainer } from "../../styles/poststab/poststab.styles";
import { utcConverter } from '../../utils/date/date.utils';

import { ChatState } from '../../store/chat/chat.reducer';
import { Chat } from '../../store/chat/chat.types';
import { ChatComment } from '../../store/chatcomment/chatcomment.types';

type ChatsTabProps = {
    show: boolean;
    showDelete: boolean;
    chatId: number | null;
}

export class UserChatsTab extends Component<any, ChatsTabProps> {
    constructor(props: any) {
        super(props);
        this.state = {
            show: false,
            showDelete: false,
            chatId: null
        }
    }

    handleClose(): void {
        this.setState({
            show: !this.state.show
        });
    }

    handleClick(chatId: number): void {
        this.props.getChat(chatId);
        this.props.getComments(chatId);
        this.setState({
            show: !this.state.show
        });
    }

    componentDidMount(): void {
        this.props.getChats();
    }

    componentDidUpdate(prevProps: Readonly<{ chats: ChatState; } & { getChats: () => void; }>, prevState: Readonly<ChatsTabProps>, snapshot?: any): void {
        if (this.props.chats.userChats?.length !== prevProps.chats.userChats?.length) {
            this.props.getChats();
        }
    }

    render() {
        const { chats, chatComments } = this.props;
        const { show } = this.state;
        return (
            <Fragment>
            {
            chats.userChats?.length ?
                <ResponsiveMasonry
                    columnsCountBreakPoints={{350: 1, 750: 2, 900: 3, 1050: 4}}
                >
                    <Masonry>
                    {chats.userChats?.map(({ chatId, title, userId, comments, chatComments, favorites, dateCreated }: Chat) => {
                    return <ChatContainer key={chatId}>
                            <Card style={{ background: 'black', border: '1px solid white', color: 'white' }} key={chatId}>
                            <Card.Img  src={"https://www.artlog.net/sites/default/files/styles/al_colorbox_rules/public/turrell_cregis_golay_federal_studio.jpg?itok=2M4Pyn0A"}/>
                            <Card.ImgOverlay>
                                <div style={{ cursor: "pointer", position: "absolute", left: "0", top: "0" }}>
                                <BadgeContainer>
                                    <Badge style={{ color: 'black' }} bg="light"><ArrowsFullscreen style={{ cursor: 'pointer' }} size={15} onClick={() => this.handleClick(chatId)}/></Badge>
                                </BadgeContainer>
                                {
                                    chatComments && <BadgeContainer><Badge style={{ color: 'black' }} bg="light">
                                        <Globe size={15}/>
                                        {` ${chatComments.length}`}
                                        </Badge>
                                    </BadgeContainer>
                                }
                                {
                                    favorites && <BadgeContainer>
                                        <Badge style={{ color: 'black' }} bg="light">
                                        <Rocket size={15}/>
                                        {` ${favorites.length}`}
                                        </Badge>
                                    </BadgeContainer>
                                }
                                </div>
                                </Card.ImgOverlay>
                                <Card.Body>
                                    <Card.Text>{title}</Card.Text>
                                    <Card.Text>{utcConverter(dateCreated)}</Card.Text>
                                </Card.Body>
                            </Card>
                        </ChatContainer>
                    })}
                    </Masonry>
                </ResponsiveMasonry> : 
                <Col xs={12}>
                <Card style={{ color: 'white', textAlign: 'center', background: 'black', border: '1px solid white', padding: '.5rem' }}>
                    <Card.Title>"Currently no chats... "</Card.Title>
                </Card>
                </Col>
                }
                <Modal 
                    size="lg"
                    show={show} 
                    onHide={() => this.handleClose()}
                >
                    <ModalContainer>
                    <Modal.Header closeButton>
                        <Modal.Title >{chats.singleChat?.title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col md={8}>
                            <Image
                                fluid
                                src="https://www.artlog.net/sites/default/files/styles/al_colorbox_rules/public/turrell_cregis_golay_federal_studio.jpg?itok=2M4Pyn0A"
                            />
                            </Col>
                            <Col>
                            <div>Comments</div>
                            {
                                chatComments.chatcomments?.map(({ chatCommentId, chatValue, mediaLink, dateCreated }: ChatComment) => {
                                    return <CardContainer>
                                        <Card className="bg-dark" key={chatCommentId}>
                                            <TextContainer>
                                                <Card.Text>{chatValue}</Card.Text>
                                                <Card.Text>{utcConverter(dateCreated)}</Card.Text>
                                            </TextContainer>
                                        </Card>
                                    </CardContainer>
                                })
                            }
                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                    <button className="btn btn-dark" onClick={() => this.handleClose()}>
                        Close
                    </button>
                    <a href={`/singlechat/${chats.singleChat?.chatId}`} style={{ textDecoration: 'none', color: 'white' }} className="btn btn-dark" >
                        Single View
                    </a>
                    </Modal.Footer>
                    </ModalContainer>
                </Modal>
            </Fragment>
        );
    }
}