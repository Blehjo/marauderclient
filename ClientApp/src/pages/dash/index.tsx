import { ChangeEvent, Component, Dispatch, FormEvent } from "react";
import { Badge, Card, Col, Form, Image, Modal, Row } from "react-bootstrap";
import { ArrowRight, Chat, Rocket, Send } from "react-bootstrap-icons";
import { ConnectedProps, connect } from "react-redux";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { ChatFetchAllStart, ChatFetchSingleStart, chatFetchAllStart, chatFetchSingleStart } from "../../store/chat/chat.action";
import { Chat as ChatContent } from "../../store/chat/chat.types";
import { ChatCommentFetchSingleStart, chatcommentFetchSingleStart } from "../../store/chatcomment/chatcomment.action";
import { ChatCommentState } from "../../store/chatcomment/chatcomment.reducer";
import { CommentCreateStart, CommentFetchSingleStart, commentCreateStart, commentFetchSingleStart } from "../../store/comment/comment.action";
import { CommentState } from "../../store/comment/comment.reducer";
import { FavoriteCreateStart, favoriteCreateStart } from "../../store/favorite/favorite.action";
import { Favorite } from "../../store/favorite/favorite.types";
import { GltfFetchAllStart, GltfFetchSingleStart, gltfFetchAllStart, gltfFetchSingleStart } from "../../store/gltf/gltf.action";
import { Gltf } from "../../store/gltf/gltf.types";
import { CommentCreateStart as GltfCommentCreateStart, GltfCommentFetchSingleStart, commentCreateStart as gltfCommentCreateStart, gltfcommentFetchSingleStart } from "../../store/gltfcomment/gltfcomment.action";
import { GltfCommentState } from "../../store/gltfcomment/gltfcomment.reducer";
import { PostFetchAllStart, PostFetchSingleStart, postFetchAllStart, postFetchSingleStart } from "../../store/post/post.action";
import { Post } from "../../store/post/post.types";
import { RootState } from "../../store/store";
import { User } from "../../store/user/user.types";
import { CommentCreateStart as UserChatCommentCreateStart, CommentFetchSingleStart as UserChatCommentFetchSingleStart, commentCreateStart as userChatCommentCreateStart } from "../../store/userchatcomment/userchatcomment.action";
import { CommentContainer, ModalContainer, TextContainer } from "../../styles/modal/modal.styles";
import { AContainer, BadgeContainer } from "../../styles/poststab/poststab.styles";
import { ContentContainer, ResponsiveMemoryContainer } from "../../styles/responsivememory/responsivememory.styles";

export type DashData = {
    id: number;
    postValue: string;
    mediaLink?: string;
    imageSource?: string;
    comments?: Array<any>;
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
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(event: FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        const { commentValue, imageFile } = this.state;
        if (this.state.singleContent?.type === "post") {
            this.props.createComment(commentValue, imageFile!, this.state.singleContent?.id!);
        }
        if (this.state.singleContent?.type === "gltf") {
            this.props.gltfCreateComment(commentValue, imageFile!, this.state.singleContent?.id!);
        }
        if (this.state.singleContent?.type === "chat") {
            this.props.createComment(commentValue, imageFile!, this.state.singleContent?.id!);
        }
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
            comments: comments!,
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
            comments: comments!,
            user: user,
            favorites: favorites,
            type: type,
        }
        return content;
    }

    gltfFunction(prop: Gltf): DashData {
        const { gltfId, fileInformation, mediaLink, gltfComments, favorites, type, imageSource, user } = prop;
        const content: DashData = {
            id: gltfId,
            postValue: fileInformation ? fileInformation : "",
            mediaLink: mediaLink ? mediaLink : "",
            imageSource: imageSource,
            comments: gltfComments,
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

    componentDidUpdate(prevProps: Readonly<{ posts: Post[]; singlePost: Post | null; comments: CommentState; chats: ChatContent[]; singleChat: ChatContent | null; chatcomments: ChatCommentState; gltfs: Gltf[]; singleGltf: Gltf | null; gltfcomments: GltfCommentState; currentUser: User | null; } & { getPosts: () => void; getChats: () => void; getGltfs: () => void; getPost: (postId: number) => void; getChat: (chatId: number) => void; getGltf: (gltfId: number) => void; getPostComments: (postId: number) => void; getChatComments: (chatId: number) => void; getGltfComments: (gltfId: number) => void; likePost: (postId: number, contentType: string) => void; createComment: (commentValue: string, imageFile: File, postId: number) => void; gltfCreateComment: (commentValue: string, imageFile: File, gltfId: number) => void; chatCreateComment: (commentValue: string, imageFile: File, gltfId: number) => void; }>, prevState: Readonly<IDash>, snapshot?: any): void {
        if (this.props.posts.length != prevProps.posts.length) {
            this.checkType();
        }
        if (this.props.gltfs.length != prevProps.gltfs.length) {
            this.checkType();
        }
        if (this.props.chats.length != prevProps.chats.length) {
            this.checkType();
        }

        if (this.props.comments.comments?.length != prevProps.comments.comments?.length) {
            this.props.getPostComments(this.props.singlePost?.postId!);
            this.setState({
                commentValue: ""
            })
        }

        if (this.props.gltfcomments.comments?.length != prevProps.gltfcomments.comments?.length) {
            this.props.getGltfComments(this.props.singleGltf?.gltfId!);
            this.setState({
                commentValue: ""
            })
        }
    }
    render() {
        const { content, singleContent } = this.state;
        return (
            <>
            <Row xs={1}>
                {
                    content.length > 0 ?
                <>
                <ContentContainer>
                {
                    content.map((element, index) => (
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
                            <Card.Img src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/images/${element.user.imageLink!}`}/>
                            </Col>
                            <Col>
                            <Card.Text>{element.user.username!}</Card.Text>
                            </Col>
                        </Row>
                    </Card.Body>
                    </Card>
                    </Col>     
                ))}
                </ContentContainer> 
                </> :
                <ResponsiveMemoryContainer>
                <ResponsiveMasonry columnsCountBreakPoints={{ 350: 2, 750: 3, 900: 3, 1050: 4 }}>
                <Masonry>
                <Card key="default" bg="dark" style={{ margin: '.3rem', textAlign: 'center', color: 'white'}} >
                <Card.Body>
                    <Card.Text>Currently no content</Card.Text>
                </Card.Body>
                </Card>
                </Masonry>
                </ResponsiveMasonry>
                </ResponsiveMemoryContainer>
                }
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
                                    <Card.Img style={{ width: '2rem', height: '2rem', marginBottom: '1rem' }} src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/images/${singleContent?.user.imageLink!}`}/>
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
                            {
                                singleContent?.comments?.map(({ commentValue, mediaLink, dateCreated, user }, index) => {
                                    return <Card border="light" className="bg-dark mt-2" key={index}>
                                        <TextContainer>
                                            <AContainer href={`/profile/${user.userId}`}>
                                                <Row xs={2}>
                                                    <Col xs={2}>
                                                    <Card.Img src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/images/${user.imageLink!}`}/>
                                                    </Col>
                                                    <Col>
                                                    <Card.Text>{user.username!}</Card.Text>
                                                    </Col>
                                                </Row>
                                            </AContainer>
                                        <Card.Text style={{ color: 'white' }}>{commentValue}</Card.Text>
                                        </TextContainer>
                                    </Card>
                                })
                            }
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
            </>
        )
    }
}

const mapStateToProps = (state: RootState) => {
    return { 
        posts: state.post.posts,
        singlePost: state.post.singlePost,
        comments: state.comment,
        chats: state.chat.chats,
        singleChat: state.chat.singleChat,
        chatcomments: state.chatcomment,
        gltfs: state.gltf.gltfs,
        singleGltf: state.gltf.singleGltf,
        gltfcomments: state.gltfcomment,
        currentUser: state.user.currentUser
    };
};

const mapDispatchToProps = (dispatch: Dispatch<FavoriteCreateStart | PostFetchAllStart | PostFetchSingleStart | CommentCreateStart | UserChatCommentCreateStart | UserChatCommentFetchSingleStart | GltfCommentCreateStart | CommentFetchSingleStart | ChatFetchAllStart | ChatFetchSingleStart | ChatCommentFetchSingleStart | GltfFetchAllStart | GltfFetchSingleStart | GltfCommentFetchSingleStart>) => ({
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
    gltfCreateComment: (commentValue: string, imageFile: File, gltfId: number) => dispatch(gltfCommentCreateStart(commentValue, imageFile, gltfId)),
    chatCreateComment: (commentValue: string, imageFile: File, gltfId: number) => dispatch(userChatCommentCreateStart(commentValue, imageFile, gltfId)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(Dash);