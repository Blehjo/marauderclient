import { ChangeEvent, Component, Dispatch, FormEvent, ReactNode } from "react";
import { Badge, Card, Col, Form, Image, Modal, Row } from "react-bootstrap";
import { ArrowRight, Chat, Rocket, Send } from "react-bootstrap-icons";
import { ConnectedProps, connect } from "react-redux";
import { ChatFetchAllStart, ChatFetchSingleStart, chatFetchAllStart, chatFetchSingleStart } from "../../store/chat/chat.action";
import { ChatCommentFetchSingleStart, chatcommentFetchSingleStart } from "../../store/chatcomment/chatcomment.action";
import { CommentCreateStart, CommentFetchSingleStart, commentCreateStart, commentFetchSingleStart } from "../../store/comment/comment.action";
import { FavoriteCreateStart, favoriteCreateStart } from "../../store/favorite/favorite.action";
import { GltfFetchAllStart, GltfFetchSingleStart, gltfFetchAllStart, gltfFetchSingleStart } from "../../store/gltf/gltf.action";
import { GltfCommentFetchSingleStart, gltfcommentFetchSingleStart } from "../../store/gltfcomment/gltfcomment.action";
import { PostFetchAllStart, PostFetchSingleStart, postFetchAllStart, postFetchSingleStart } from "../../store/post/post.action";
import { RootState } from "../../store/store";
import { AContainer, BadgeContainer } from "../../styles/poststab/poststab.styles";
import { User } from "../../store/user/user.types";
import { Favorite } from "../../store/favorite/favorite.types";
import { Post } from "../../store/post/post.types";
import { Gltf } from "../../store/gltf/gltf.types";
import { Chat as ChatContent } from "../../store/chat/chat.types";
import { ChatCommentState } from "../../store/chatcomment/chatcomment.reducer";
import { CommentState } from "../../store/comment/comment.reducer";
import { GltfCommentState } from "../../store/gltfcomment/gltfcomment.reducer";
import { ContentContainer, ResponsiveMemoryContainer } from "../../styles/responsivememory/responsivememory.styles";
import { CommentContainer, ModalContainer, TextContainer } from "../../styles/modal/modal.styles";

type DashData = {
    id: number;
    postValue: string;
    mediaLink?: string;
    imageSource?: string;
    comments?: Array<string>;
    user: User;
    favorites: Array<Favorite>;
    type: string;
}

interface IDash {
    content: Array<DashData>;
    singleContent: DashData | null;
    show: boolean;
    commentValue: string;
    mediaLink: string;
    imageSource: string | ArrayBuffer | null | undefined;
    imageFile: File | null;
}

type DashProps = ConnectedProps<typeof connector>;

class Dash extends Component<DashProps, IDash> {
    constructor(props: DashProps) {
        super(props);
        this.state = {
            content: [],
            singleContent: null,
            show: false,
            commentValue: "",
            mediaLink: "",
            imageSource: null,
            imageFile: null
        }
        this.showPreview = this.showPreview.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event: FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        const { commentValue, imageFile } = this.state;
        this.props.createComment(commentValue, imageFile!, this.state.singleContent?.id!);
        this.setState({
            ...this.state, commentValue: "", imageFile: null
        })
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

    handleLike(postId: number, type: string): void {
        this.props.likePost(postId, type);
    }

    handleClick(id: number, type?: string): void {
        if (type === "chat") {
            this.props.getChat(id);
            this.props.getChatComments(id);
        } else if (type === "post") {
            this.props.getPost(id);
            this.props.getPostComments(id);
        } else {
            this.props.getGltf(id);
            this.props.getGltfComments(id);
        }
    }

    openModal(content: any, id: number, type?: string): void {
        if (type === "chat") {
            this.props.getChat(id);
            this.props.getChatComments(id);
        } else if (type === "post") {
            this.props.getPost(id);
            this.props.getPostComments(id);
        } else {
            this.props.getGltf(id);
            this.props.getGltfComments(id);
        }
        this.setState({
            ...this.state, show: !this.state.show, singleContent: content
        });
    }

    handleClose(): void {
        this.setState({
            show: !this.state.show
        });
    }

    postFunction(prop: Post): DashData {
        const { postId, postValue, mediaLink, comments, favorites, type, imageSource, user } = prop;
        const content: DashData = {
            id: postId,
            postValue: postValue ? postValue : "",
            mediaLink: mediaLink ? mediaLink : "",
            imageSource: imageSource,
            // comments: comments,
            user: user,
            favorites: favorites,
            type: type,
        }
        return content;
    }

    chatFunction(prop: ChatContent): DashData {
        const { chatId, title, comments, favorites, type, user } = prop;
        const content: DashData = {
            id: chatId,
            postValue: title ? title : "",
            mediaLink: "",
            imageSource: "",
            // comments: comments,
            user: user,
            favorites: favorites,
            type: type,
        }
        return content;
    }

    gltfFunction(prop: Gltf): DashData {
        const { gltfId, fileInformation, mediaLink, comments, favorites, type, imageSource, user } = prop;
        const content: DashData = {
            id: gltfId,
            postValue: fileInformation ? fileInformation : "",
            mediaLink: mediaLink ? mediaLink : "",
            imageSource: imageSource,
            // comments: comments,
            user: user,
            favorites: favorites,
            type: type,
        }
        return content;
    }

    checkType(): Array<DashData> {
        const { content } = this.state;
        const { posts, chats, gltfs } = this.props;

        for (let i = 0; i < posts.length; i++) {
            content.push(this.postFunction(posts[i]));
        }

        for (let i = 0; i < chats.length; i++) {
            content.push(this.chatFunction(chats[i]));
        }
        
        for (let i = 0; i < gltfs.length; i++) {
            content.push(this.gltfFunction(gltfs[i]));
        }

        return content;
    }

    componentDidMount(): void {
        this.props.getPosts();
        this.props.getChats();
        this.props.getGltfs();
    }
    
    componentDidUpdate(prevProps: Readonly<{ posts: Post[]; comments: CommentState; chats: ChatContent[]; chatcomments: ChatCommentState; gltfs: Gltf[]; gltfcomments: GltfCommentState; currentUser: User | null; } & { getPosts: () => void; getChats: () => void; getGltfs: () => void; getPost: (postId: number) => void; getChat: (chatId: number) => void; getGltf: (gltfId: number) => void; getPostComments: (postId: number) => void; getChatComments: (chatId: number) => void; getGltfComments: (gltfId: number) => void; likePost: (postId: number, contentType: string) => void; createComment: (commentValue: string, imageFile: File, postId: number) => void; }>, prevState: Readonly<IDash>, snapshot?: any): void {
        if (this.props.posts.length != prevProps.posts.length) {
            console.log('Content has changed');
            this.checkType();
        }
        if (this.props.gltfs.length != prevProps.gltfs.length) {
            console.log('Content has changed');
            this.checkType();
        }
        if (this.props.chats.length != prevProps.chats.length) {
            console.log('Content has changed');
            this.checkType();
        }
    }
    render() {
        const { content, singleContent } = this.state;
        console.log("singleContent", singleContent);
        return (
            <ContentContainer>
            <Row xs={1}>
                {
                    content.map((element, index) => (
                        // <div style={{ margin: 'auto', width: '50%' }} >
                    <Col xs={12} key={element.id}>
                    <Card key={element.id} style={{ background: 'black', border: 'solid 1px white', padding: '.5rem', margin: '.3rem', color: 'white'}}>
                    <Card.Img src={element.mediaLink ? element.imageSource : "https://i.pinimg.com/originals/8e/47/2a/8e472a9d5d7d25f4a88281952aed110e.png"}/>
                    <Card.ImgOverlay>
                        <div style={{ cursor: "pointer", position: "absolute", left: "0", top: "0" }}>
                            <BadgeContainer>
                                <AContainer href={`/${element.type}s/${element.id}`}>
                                <Badge style={{ color: 'black' }} bg="light"><ArrowRight style={{ cursor: 'pointer' }} onClick={() => this.handleClick(element.id, element.type)} size={15}/></Badge>
                                </AContainer>
                            </BadgeContainer>
                            {
                                <BadgeContainer><Badge style={{ color: 'black' }} bg="light" onClick={() => this.openModal(element, element.id, element.type)}>
                                    <Chat size={15}/>
                                    {` ${element.comments != undefined && element.comments?.length > 0 ? element.comments?.length : ""}`}
                                    </Badge>
                                </BadgeContainer>
                            }
                            {
                                <BadgeContainer>
                                    <Badge style={{ color: 'black' }} bg="light">
                                    <Rocket style={{ cursor: 'pointer' }} onClick={() => this.handleLike(element.id, element.type)} size={15}/>
                                    {` ${element.favorites?.length > 0 ? element.favorites?.length : ""}`}
                                    </Badge>
                                </BadgeContainer>
                            }
                        </div>
                    </Card.ImgOverlay>
                    <Card.Body>
                    <Card.Text>{element.postValue}</Card.Text>
                        <Row xs={2}>
                            <Col xs={2}>
                            <Card.Img src={`https://localhost:7144/images/${element.user.imageLink!}`}/>
                            </Col>
                            <Col>
                            <Card.Text>{element.user.username!}</Card.Text>
                            </Col>
                        </Row>
                    </Card.Body>
                    </Card>
                    </Col>    
                // </div>   
                ))}
            </Row>
            <Modal
                    size="lg"
                    show={this.state.show} 
                    onHide={() => this.handleClose()}
            >
                <ModalContainer>
                    <Modal.Header closeButton>
                        <Modal.Title >Marauder Log</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col md={8}>
                            <Image
                                fluid
                                style={{ borderRadius: '.2rem', objectFit: 'cover', width: '30rem', height: '30rem' }}
                                src={singleContent?.mediaLink ? singleContent?.imageSource : "https://i.pinimg.com/originals/8e/47/2a/8e472a9d5d7d25f4a88281952aed110e.png"} 
                            />
                            <Card style={{ marginTop: "1rem", color: 'white' }} className="bg-dark" key={singleContent?.id}>
                                <TextContainer>
                                <Row xs={2}>
                                    <Col xs={2}>
                                    <Card.Img style={{ width: '2rem', height: '2rem', marginBottom: '1rem' }} src={`https://localhost:7144/images/${singleContent?.user.imageLink!}`}/>
                                    </Col>
                                    <Col>
                                    <Card.Text>{singleContent?.user.username}</Card.Text>
                                    </Col>
                                </Row>
                                <Card.Text>{singleContent?.postValue}</Card.Text>
                                </TextContainer>
                            </Card>
                            </Col>
                            <Col>
                            <div>Comments</div>
                            <CommentContainer>
                            <div style={{ height: "65%", overflowY: "auto" }}>
                            {/* {
                                singleContent?.comments?.map(({ commentId, commentValue, mediaLink, dateCreated, user }: Comment) => {
                                    return <Card border="light" className="bg-dark mt-2" key={commentId}>
                                        <TextContainer>
                                            <Card.Text>{commentValue}</Card.Text>
                                            <AContainer href={`/profile/${user.userId}`}>{user.username}</AContainer>
                                        </TextContainer>
                                    </Card>
                                })
                            } */}
                            </div>
                            <Form style={{ margin: 'auto', position: "absolute", bottom: "0" }} key={singleContent?.id} onSubmit={this.handleSubmit}>
                            <Row style={{ marginBottom: '3rem', justifyContent: 'center' }} xs={1}>
                                <Col xs={12}>
                                    <Row style={{ marginBottom: '1rem', justifyContent: 'center' }}>
                                        <Col xs={12}>
                                            <Form.Group>
                                                <Form.Control style={{ height: '.5rem' }} name="commentValue" as="textarea" onChange={this.handleChange} placeholder=" Write your comment here" />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row style={{ justifyContent: 'center' }}>
                                        <Col xs={12}>
                                            <Form.Group className="mb-3" controlId="formMedia">
                                                <Form.Control onChange={this.showPreview} name="mediaLink" as="input" accept="image/*" type="file" placeholder="Media" />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col xs={12}>
                                    <button style={{ textAlign: 'center', width: '100%', height: '100%'}} className="btn btn-light" type="submit">
                                        <Send/>
                                    </button>
                                </Col>                
                            </Row>
                        </Form>
                        </CommentContainer>
                        </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                    <button className="btn btn-dark" onClick={() => this.handleClose()}>
                        Close
                    </button>
                    <button className="btn btn-dark" >
                        <a style={{ textDecoration: 'none', color: 'white' }} href={`/${singleContent?.type}s/${singleContent?.id}`}>
                        {`See ${singleContent?.type}`}
                        </a>
                    </button>
                    </Modal.Footer>
                    </ModalContainer>
            </Modal>
            </ContentContainer>
        )
    }
}

const mapStateToProps = (state: RootState) => {
    return { 
        posts: state.post.posts,
        comments: state.comment,
        chats: state.chat.chats,
        chatcomments: state.chatcomment,
        gltfs: state.gltf.gltfs,
        gltfcomments: state.gltfcomment,
        currentUser: state.user.currentUser
    };
};

const mapDispatchToProps = (dispatch: Dispatch<FavoriteCreateStart | PostFetchAllStart | PostFetchSingleStart | CommentCreateStart | CommentFetchSingleStart | ChatFetchAllStart | ChatFetchSingleStart | ChatCommentFetchSingleStart | GltfFetchAllStart | GltfFetchSingleStart | GltfCommentFetchSingleStart>) => ({
    getPosts: () => dispatch(postFetchAllStart()),
    getChats: () => dispatch(chatFetchAllStart()),
    getGltfs: () => dispatch(gltfFetchAllStart()),
    getPost: (postId: number) => dispatch(postFetchSingleStart(postId)),
    getChat: (chatId: number) => dispatch(chatFetchSingleStart(chatId)),
    getGltf: (gltfId: number) => dispatch(gltfFetchSingleStart(gltfId)),
    getPostComments: (postId: number) => dispatch(commentFetchSingleStart(postId)),
    getChatComments: (chatId: number) => dispatch(chatcommentFetchSingleStart(chatId)),
    getGltfComments: (gltfId: number) => dispatch(gltfcommentFetchSingleStart(gltfId)),
    likePost: (postId: number, contentType: string) => dispatch(favoriteCreateStart(postId, contentType)),
    createComment: (commentValue: string, imageFile: File, postId: number) => dispatch(commentCreateStart(commentValue, imageFile, postId)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(Dash);