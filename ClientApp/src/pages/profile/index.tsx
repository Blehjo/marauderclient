import { Component, Dispatch } from "react";
import { Col, Row, Tab, Tabs } from "react-bootstrap";
import { ConnectedProps, connect } from "react-redux";

import { ChatsTab } from "../../components/chatstab/chatstab.component";
import PostsTab from "../../components/poststab/poststab.component";
import { ProfileCard } from "../../components/profilecard/profilecard.component";
import { ChatDeleteStart, ChatFetchSingleStart, ChatFetchUserChatsStart, chatDeleteStart, chatFetchSingleStart, chatFetchUserChatsStart } from "../../store/chat/chat.action";
import { CommentCreateStart, CommentFetchSingleStart, commentCreateStart, commentFetchSingleStart } from "../../store/comment/comment.action";
import { FavoriteCreateStart, favoriteCreateStart } from "../../store/favorite/favorite.action";
import { MarauderFetchSingleStart, marauderFetchSingleStart } from "../../store/marauder/marauder.action";
import { PostCreateStart, PostDeleteStart, PostFetchAllStart, PostFetchSingleStart, PostFetchUserPostsStart, postCreateStart, postDeleteStart, postFetchAllStart, postFetchSingleStart, postFetchUserPostsStart } from "../../store/post/post.action";
import { RootState } from "../../store/store";
import { CheckUserSession, checkUserSession } from "../../store/user/user.action";
import { UserprofileFetchSingleStart, userprofileFetchSingleStart } from "../../store/userprofile/userprofile.action";
import { ProfileContainer } from "../../styles/profile/profile.styles";
import Authentication from "../authentication";
import GltfsTab from "../../components/gltfstab/gltfstab.component";
import { EditorFetchAllStart, editorFetchAllStart } from "../../store/editor/editor.action";
import { GltfCreateStart, GltfFetchSingleStart, GltfFetchUserStart, gltfCreateStart, gltfFetchSingleStart, gltfFetchUserStart } from "../../store/gltf/gltf.action";
import { DevicesTab } from "../../components/devicestab/devicestab.component";
import { DeviceDeleteStart, DeviceFetchAllStart, DeviceFetchSingleStart, deviceDeleteStart, deviceFetchAllStart, deviceFetchSingleStart } from "../../store/device/device.action";

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
        comments: state.comment,
        chats: state.chat,
        chatComments: state.chatcomment,
        devices: state.device,
        gltfs: state.gltf,
        shapes: state.editor
    };
};

const mapDispatchToProps = (dispatch: Dispatch<DeviceDeleteStart | DeviceFetchSingleStart | DeviceFetchAllStart | GltfFetchSingleStart | CheckUserSession | UserprofileFetchSingleStart | MarauderFetchSingleStart | PostFetchAllStart | PostFetchUserPostsStart | PostCreateStart | PostFetchSingleStart | PostDeleteStart | ChatFetchUserChatsStart | ChatFetchSingleStart | ChatDeleteStart | CommentFetchSingleStart | CommentCreateStart | FavoriteCreateStart | EditorFetchAllStart | GltfFetchUserStart | GltfCreateStart>) => ({
    getUserProfile: (userId: number) => dispatch(userprofileFetchSingleStart(userId)),
    checkSession: () => dispatch(checkUserSession()),
    getMarauder: (userId: string) => dispatch(marauderFetchSingleStart(userId)),
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
    fetchShapes: () => dispatch(editorFetchAllStart()),
    fetchGltfFiles: () => dispatch(gltfFetchUserStart()),
    fetchSingleGltf: (gltfId: number) => dispatch(gltfFetchSingleStart(gltfId)),
    createGltfFile: (fileInformation: string) => dispatch(gltfCreateStart(fileInformation)),
    fetchDevices: () => dispatch(deviceFetchAllStart()),
    fetchSingleDevice: (deviceId: number) => dispatch(deviceFetchSingleStart(deviceId)),
    deleteDevice: (deviceId: number) => dispatch(deviceDeleteStart(deviceId)) 
});

export const connector = connect(mapToStateProps, mapDispatchToProps);

export default connector(Profile);