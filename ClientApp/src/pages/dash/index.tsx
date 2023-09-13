import { Component, Dispatch, ReactNode } from "react";
import { Badge, Card, Col, Row } from "react-bootstrap";
import { ArrowRight, Chat, Rocket } from "react-bootstrap-icons";
import { ConnectedProps, connect } from "react-redux";
import { ChatFetchAllStart, ChatFetchSingleStart, chatFetchAllStart, chatFetchSingleStart } from "../../store/chat/chat.action";
import { ChatCommentFetchSingleStart, chatcommentFetchSingleStart } from "../../store/chatcomment/chatcomment.action";
import { CommentFetchSingleStart, commentFetchSingleStart } from "../../store/comment/comment.action";
import { FavoriteCreateStart, favoriteCreateStart } from "../../store/favorite/favorite.action";
import { GltfFetchAllStart, GltfFetchSingleStart, gltfFetchAllStart, gltfFetchSingleStart } from "../../store/gltf/gltf.action";
import { GltfCommentFetchSingleStart, gltfcommentFetchSingleStart } from "../../store/gltfcomment/gltfcomment.action";
import { PostFetchAllStart, PostFetchSingleStart, postFetchAllStart, postFetchSingleStart } from "../../store/post/post.action";
import { RootState } from "../../store/store";
import { BadgeContainer } from "../../styles/poststab/poststab.styles";
import { User } from "../../store/user/user.types";
import { Favorite } from "../../store/favorite/favorite.types";
import { Post } from "../../store/post/post.types";
import { Gltf } from "../../store/gltf/gltf.types";
import { Chat as ChatContent } from "../../store/chat/chat.types";
import { ChatCommentState } from "../../store/chatcomment/chatcomment.reducer";
import { CommentState } from "../../store/comment/comment.reducer";
import { GltfCommentState } from "../../store/gltfcomment/gltfcomment.reducer";
import { ContentContainer, ResponsiveMemoryContainer } from "../../styles/responsivememory/responsivememory.styles";

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
    show: boolean;
}

type DashProps = ConnectedProps<typeof connector>;

class Dash extends Component<DashProps, IDash> {
    constructor(props: DashProps) {
        super(props);
        this.state = {
            content: [],
            show: false
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
        this.setState({
            show: !this.state.show
        });
    }

    postFunction(prop: Post): DashData {
        const { postId, postValue, mediaLink, comments, favorites, type, imageSource,user } = prop;
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

    componentDidUpdate(prevProps: Readonly<{ posts: Post[]; comments: CommentState; chats: ChatContent[]; chatcomments: ChatCommentState; gltfs: Gltf[]; gltfcomments: GltfCommentState; currentUser: User | null; } & { getPosts: () => void; getChats: () => void; getGltfs: () => void; getPost: (postId: number) => void; getChat: (chatId: number) => void; getGltf: (gltfId: number) => void; getPostComments: (postId: number) => void; getChatComments: (chatId: number) => void; getGltfComments: (gltfId: number) => void; likePost: (postId: number, contentType: string) => void; }>, prevState: Readonly<IDash>, snapshot?: any): void {
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
        const { content } = this.state;
        return (
            <ContentContainer>
            <Row xs={1}>
                {
                    content.map(({ id, postValue, mediaLink, imageSource, comments, user, favorites, type }) => (
                        // <div style={{ margin: 'auto', width: '50%' }} >
                    <Col xs={12} key={id}>
                    <Card key={id} style={{ background: 'black', border: 'solid 1px white', padding: '.5rem', margin: '.3rem', color: 'white'}}>
                    <Card.Img src={mediaLink ? imageSource : "https://i.pinimg.com/originals/8e/47/2a/8e472a9d5d7d25f4a88281952aed110e.png"}/>
                    <Card.ImgOverlay>
                        <div style={{ cursor: "pointer", position: "absolute", left: "0", top: "0" }}>
                            <BadgeContainer>
                                <Badge style={{ color: 'black' }} bg="light"><ArrowRight style={{ cursor: 'pointer' }} onClick={() => this.handleClick(id, type)} size={15}/></Badge>
                            </BadgeContainer>
                            {
                                <BadgeContainer><Badge style={{ color: 'black' }} bg="light">
                                    <Chat size={15}/>
                                    {` ${comments != undefined && comments?.length > 0 ? comments?.length : ""}`}
                                    </Badge>
                                </BadgeContainer>
                            }
                            {
                                <BadgeContainer>
                                    <Badge style={{ color: 'black' }} bg="light">
                                    <Rocket style={{ cursor: 'pointer' }} onClick={() => this.handleLike(id, type)} size={15}/>
                                    {` ${favorites?.length > 0 ? favorites?.length : ""}`}
                                    </Badge>
                                </BadgeContainer>
                            }
                        </div>
                    </Card.ImgOverlay>
                    <Card.Body>
                    <Card.Text>{postValue}</Card.Text>
                        <Row xs={2}>
                            <Col xs={2}>
                            <Card.Img src={`https://localhost:7144/images/${user.imageLink!}`}/>
                            </Col>
                            <Col>
                            <Card.Text>{user.username!}</Card.Text>
                            </Col>
                        </Row>
                    </Card.Body>
                    </Card>
                    </Col>    
                // </div>   
                ))}
            </Row>
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

const mapDispatchToProps = (dispatch: Dispatch<FavoriteCreateStart | PostFetchAllStart | PostFetchSingleStart | CommentFetchSingleStart | ChatFetchAllStart | ChatFetchSingleStart | ChatCommentFetchSingleStart | GltfFetchAllStart | GltfFetchSingleStart | GltfCommentFetchSingleStart>) => ({
    getPosts: () => dispatch(postFetchAllStart()),
    getChats: () => dispatch(chatFetchAllStart()),
    getGltfs: () => dispatch(gltfFetchAllStart()),
    getPost: (postId: number) => dispatch(postFetchSingleStart(postId)),
    getChat: (chatId: number) => dispatch(chatFetchSingleStart(chatId)),
    getGltf: (gltfId: number) => dispatch(gltfFetchSingleStart(gltfId)),
    getPostComments: (postId: number) => dispatch(commentFetchSingleStart(postId)),
    getChatComments: (chatId: number) => dispatch(chatcommentFetchSingleStart(chatId)),
    getGltfComments: (gltfId: number) => dispatch(gltfcommentFetchSingleStart(gltfId)),
    likePost: (postId: number, contentType: string) => dispatch(favoriteCreateStart(postId, contentType))
});

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(Dash);