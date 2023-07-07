import { Component, Dispatch } from "react";
import { ConnectedProps, connect } from "react-redux";
import { Col, Row, Tab, Tabs } from "react-bootstrap";

import { ProfileContainer } from "../../styles/profile/profile.styles";
import Authentication from "../authentication";
import { RootState } from "../../store/store";
import { ProfileCard } from "../../components/profilecard/profilecard.component";
import { ChatDeleteStart, ChatFetchSingleStart, ChatFetchUserChatsStart, chatDeleteStart, chatFetchSingleStart, chatFetchUserChatsStart } from "../../store/chat/chat.action";
import { CommentCreateStart, CommentFetchSingleStart, commentCreateStart, commentFetchSingleStart } from "../../store/comment/comment.action";
import { PostCreateStart, PostDeleteStart, PostFetchAllStart, PostFetchSingleStart, PostFetchUserPostsStart, postCreateStart, postDeleteStart, postFetchAllStart, postFetchSingleStart, postFetchUserPostsStart } from "../../store/post/post.action";
import { UserprofileFetchSingleStart, userprofileFetchSingleStart } from "../../store/userprofile/userprofile.action";
import { MarauderFetchSingleStart, marauderFetchSingleStart } from "../../store/marauder/marauder.action";
import { FavoriteCreateStart, favoriteCreateStart } from "../../store/favorite/favorite.action";
import { CheckUserSession, checkUserSession } from "../../store/user/user.action";
import PostsTab from "../../components/poststab/poststab.component";
import { ChatsTab } from "../../components/chatstab/chatstab.component";

export type ProfileProps = ConnectedProps<typeof connector>;

class Profile extends Component<ProfileProps> {
    componentDidMount(): void {
        this.props.checkSession();
    }
    render() {
        const { currentUser } = this.props;
        return (
            <ProfileContainer>
                {
                currentUser == null ? 
                <Authentication/> :
                <Row lg={2}>
                    <Col style={{ marginBottom: '2rem' }}lg={4}>
                        <ProfileCard { ...this.props }/>
                    </Col>
                    <Col lg={8}>                
                    <Tabs
                        defaultActiveKey="posts"
                        justify
                        className='mb-5'
                        variant='pills'
                        >
                        <Tab eventKey="posts" title="Posts">
                            <PostsTab { ...this.props } />
                        </Tab>
                        <Tab eventKey="chats" title="Chats">
                            <ChatsTab { ...this.props } />
                        </Tab>
                        <Tab eventKey="planets" title="Devices">
                            {/* <PlanetsTab { ...this.props } /> */}
                        </Tab>
                        <Tab eventKey="moons" title="Gltfs">
                            {/* <MoonsTab { ...this.props } /> */}
                        </Tab>
                    </Tabs>
                    </Col>
                </Row>
            }
            </ProfileContainer>
        )
    }
}

const mapToStateProps = (state: RootState) => {
    return { 
        userprofile: state.userprofile,
        currentUser: state.user.currentUser,
        marauder: state.marauder.marauders,
        posts: state.post,
        comments: state.comment,
        chats: state.chat,
        chatComments: state.chatcomment,
        devices: state.device.userDevices
    };
};

const mapDispatchToProps = (dispatch: Dispatch<CheckUserSession | UserprofileFetchSingleStart | MarauderFetchSingleStart | PostFetchAllStart | PostFetchUserPostsStart | PostCreateStart | PostFetchSingleStart | PostDeleteStart | ChatFetchUserChatsStart | ChatFetchSingleStart | ChatDeleteStart | CommentFetchSingleStart | CommentCreateStart | FavoriteCreateStart>) => ({
    getUserProfile: (userId: number) => dispatch(userprofileFetchSingleStart(userId)),
    checkSession: () => dispatch(checkUserSession()),
    getPilot: (userId: number) => dispatch(marauderFetchSingleStart(userId)),
    getAllPosts: () => dispatch(postFetchAllStart()),
    getUserPosts: (userId: number | undefined) => dispatch(postFetchUserPostsStart(userId)),
    getPost: (postId: number) => dispatch(postFetchSingleStart(postId)),
    likePost: (postId: number, contentType: string) => dispatch(favoriteCreateStart(postId, contentType)),
    createComment: (commentValue: string, imageFile: File, postId: number) => dispatch(commentCreateStart(commentValue, imageFile, postId)),
    createPost: (postValue: string, mediaLink: string, imageFile: File) => dispatch(postCreateStart(postValue, mediaLink, imageFile)),
    deletePost: (postId: number) => dispatch(postDeleteStart(postId)),
    getComments: (planetId: number) => dispatch(commentFetchSingleStart(planetId)),
    getChats: () => dispatch(chatFetchUserChatsStart()),
    getChat: (chatId: number) => dispatch(chatFetchSingleStart(chatId)),
    deleteChat: (chatId: number) => dispatch(chatDeleteStart(chatId)),
});

export const connector = connect(mapToStateProps, mapDispatchToProps);

export default connector(Profile);