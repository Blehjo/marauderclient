import { Component, Dispatch } from "react";
import { Col, Row, Tab, Tabs } from "react-bootstrap";
import { ConnectedProps, connect } from "react-redux";

import { ChatsTab } from "../../components/chatstab/chatstab.component";
import { DevicesTab } from "../../components/devicestab/devicestab.component";
import GltfsTab from "../../components/gltfstab/gltfstab.component";
import PostsTab from "../../components/poststab/poststab.component";
import { ProfileCard } from "../../components/profilecard/profilecard.component";
import { ChatDeleteStart, ChatFetchSingleStart, ChatFetchUserChatsStart, chatDeleteStart, chatFetchSingleStart, chatFetchUserChatsStart } from "../../store/chat/chat.action";
import { CommentCreateStart, CommentFetchSingleStart, commentCreateStart, commentFetchSingleStart } from "../../store/comment/comment.action";
import { CommunityFetchUsercommunitiesStart, communityFetchUsercommunitiesStart } from "../../store/community/community.action";
import { DeviceDeleteStart, DeviceFetchAllStart, DeviceFetchSingleStart, deviceDeleteStart, deviceFetchAllStart, deviceFetchSingleStart } from "../../store/device/device.action";
import { EditorFetchAllStart, editorFetchAllStart } from "../../store/editor/editor.action";
import { FavoriteCreateStart, FavoriteDeleteStart, favoriteCreateStart, favoriteDeleteStart } from "../../store/favorite/favorite.action";
import { GltfCreateStart, GltfFetchSingleStart, GltfFetchUserStart, gltfCreateStart, gltfFetchSingleStart, gltfFetchUserStart } from "../../store/gltf/gltf.action";
import { CommentCreateStart as GltfCommentCreateStart, commentCreateStart as gltfCommentCreateStart } from "../../store/gltfcomment/gltfcomment.action";
import { MarauderFetchSingleStart, marauderFetchSingleStart } from "../../store/marauder/marauder.action";
import { PostCreateStart, PostDeleteStart, PostFetchAllStart, PostFetchSingleStart, PostFetchUserPostsStart, postCreateStart, postDeleteStart, postFetchAllStart, postFetchSingleStart, postFetchUserPostsStart } from "../../store/post/post.action";
import { RootState } from "../../store/store";
import { CheckUserSession, checkUserSession } from "../../store/user/user.action";
import { CommentCreateStart as UserCommentCreateStart, CommentFetchSingleStart as UserCommentFetchSingleStart, commentCreateStart as userCommentCreateStart, commentFetchSingleStart as userCommentFetchSingleStart } from "../../store/userchatcomment/userchatcomment.action";
import { UserprofileFetchSingleStart, userprofileFetchSingleStart } from "../../store/userprofile/userprofile.action";
import { ProfileContainer } from "../../styles/profile/profile.styles";
import Authentication from "../authentication";

export type ProfileProps = ConnectedProps<typeof connector>;

class Profile extends Component<ProfileProps> {
    componentDidMount(): void {
        this.props.checkSession();
        this.props.getCommunity();
    }

    render() {
        const { currentUser } = this.props;
        return (
            <ProfileContainer>
                {
                currentUser == null ? 
                <Authentication/> :
                <Row lg={2}>
                    <Col style={{ marginBottom: '2rem' }} lg={4}>
                        <ProfileCard { ...this.props }/>
                    </Col>
                    <Col lg={8}>                
                    <Tabs
                        defaultActiveKey="posts"
                        justify
                        className='mb-5 tabscolor'
                        variant='pills'
                    >
                        <Tab eventKey="posts" title="Posts">
                            <PostsTab { ...this.props } />
                        </Tab>
                        <Tab eventKey="chats" title="Chats">
                            <ChatsTab { ...this.props } />
                        </Tab>
                        <Tab eventKey="devices" title="Devices">
                            <DevicesTab { ...this.props } />
                        </Tab>
                        <Tab eventKey="gltfs" title="Gltfs">
                            <GltfsTab { ...this.props } />
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
        communities: state.community,
        comments: state.comment,
        chats: state.chat,
        chatComments: state.chatcomment,
        userComments: state.userchatcomment,
        devices: state.device,
        gltfs: state.gltf,
        gltfComments: state.gltfcomment,
        favorites: state.favorite,
        shapes: state.editor
    };
};

const mapDispatchToProps = (dispatch: Dispatch<FavoriteDeleteStart | CommunityFetchUsercommunitiesStart | GltfFetchSingleStart | DeviceDeleteStart | GltfCommentCreateStart | DeviceFetchSingleStart | DeviceFetchAllStart | GltfFetchSingleStart | CheckUserSession | UserCommentCreateStart | UserCommentFetchSingleStart | UserprofileFetchSingleStart | MarauderFetchSingleStart | PostFetchAllStart | PostFetchUserPostsStart | PostCreateStart | PostFetchSingleStart | PostDeleteStart | ChatFetchUserChatsStart | ChatFetchSingleStart | ChatDeleteStart | CommentFetchSingleStart | CommentCreateStart | FavoriteCreateStart | EditorFetchAllStart | GltfFetchUserStart | GltfCreateStart>) => ({
    getUserProfile: (userId: string) => dispatch(userprofileFetchSingleStart(userId)),
    checkSession: () => dispatch(checkUserSession()),
    getMarauder: (userId: string) => dispatch(marauderFetchSingleStart(userId)),
    getAllPosts: () => dispatch(postFetchAllStart()),
    getUserPosts: (userId: string | undefined) => dispatch(postFetchUserPostsStart(userId)),
    getPost: (postId: number) => dispatch(postFetchSingleStart(postId)),
    likePost: (postId: number, contentType: string) => dispatch(favoriteCreateStart(postId, contentType)),
    unlikePost: (favoriteId: number) => dispatch(favoriteDeleteStart(favoriteId)),
    createComment: (commentValue: string, imageFile: File, postId: number) => dispatch(commentCreateStart(commentValue, imageFile, postId)),
    createPost: (postValue: string, mediaLink: string, imageFile: File) => dispatch(postCreateStart(postValue, mediaLink, imageFile)),
    deletePost: (postId: number) => dispatch(postDeleteStart(postId)),
    getComments: (planetId: number) => dispatch(commentFetchSingleStart(planetId)),
    getChats: () => dispatch(chatFetchUserChatsStart()),
    getChat: (chatId: number) => dispatch(chatFetchSingleStart(chatId)),
    deleteChat: (chatId: number) => dispatch(chatDeleteStart(chatId)),
    fetchShapes: () => dispatch(editorFetchAllStart()),
    fetchGltfFiles: () => dispatch(gltfFetchUserStart()),
    fetchSingleGltf: (gltfId: number) => dispatch(gltfFetchSingleStart(gltfId)),
    createGltfFile: (fileInformation: string) => dispatch(gltfCreateStart(fileInformation)),
    fetchDevices: () => dispatch(deviceFetchAllStart()),
    fetchSingleDevice: (deviceId: string) => dispatch(deviceFetchSingleStart(deviceId)),
    deleteDevice: (deviceId: string) => dispatch(deviceDeleteStart(deviceId)),
    getCommunity: () => dispatch(communityFetchUsercommunitiesStart()),
    createUserComment: (commentValue: string, imageFile: File, chatId: number ) => dispatch(userCommentCreateStart(commentValue, imageFile, chatId)),
    getUserComments: (chatId: number) => dispatch(userCommentFetchSingleStart(chatId)),
    gltfCreateComment: (commentValue: string, imageFile: File, gltfId: number) => dispatch(gltfCommentCreateStart(commentValue, imageFile, gltfId)),
    getGltfComments: (gltfId: number) => dispatch(gltfFetchSingleStart(gltfId))
});

export const connector = connect(mapToStateProps, mapDispatchToProps);

export default connector(Profile);