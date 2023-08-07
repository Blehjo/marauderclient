import { Dispatch, useEffect } from "react";
import { Col, Row, Tab, Tabs } from "react-bootstrap";
import { ConnectedProps, connect, useDispatch } from "react-redux";
import { useRouter } from "next/router";

import { UserChatsTab } from "../../components/chatstab/userchatstab.component";
import { UserDevicesTab } from "../../components/devicestab/userdevicestab.component";
import UserGltfsTab from "../../components/gltfstab/usergltfstab.component";
import UserPostsTab from "../../components/poststab/userpoststab.component";
import { UserProfileCard } from "../../components/profilecard/userprofilecard.component";
import { ChatDeleteStart, ChatFetchSingleStart, ChatFetchUserChatsStart, chatFetchSingleStart, chatFetchUserChatsStart } from "../../store/chat/chat.action";
import { CommentCreateStart, CommentFetchSingleStart, commentCreateStart, commentFetchSingleStart } from "../../store/comment/comment.action";
import { DeviceDeleteStart, DeviceFetchAllStart, DeviceFetchSingleStart, deviceFetchAllStart, deviceFetchSingleStart } from "../../store/device/device.action";
import { EditorFetchAllStart, editorFetchAllStart } from "../../store/editor/editor.action";
import { FavoriteCreateStart, favoriteCreateStart } from "../../store/favorite/favorite.action";
import { GltfCreateStart, GltfFetchOtherUserStart, GltfFetchSingleStart, GltfFetchUserStart, gltfFetchOtherUserStart, gltfFetchSingleStart, gltfFetchUserStart } from "../../store/gltf/gltf.action";
import { MarauderFetchSingleStart, marauderFetchSingleStart } from "../../store/marauder/marauder.action";
import { PostCreateStart, PostDeleteStart, PostFetchAllStart, PostFetchSingleStart, PostFetchUserPostsStart, postFetchAllStart, postFetchSingleStart, postFetchUserPostsStart } from "../../store/post/post.action";
import { RootState } from "../../store/store";
import { CheckUserSession } from "../../store/user/user.action";
import { UserprofileFetchSingleStart, userprofileFetchSingleStart } from "../../store/userprofile/userprofile.action";
import { ProfileContainer } from "../../styles/profile/profile.styles";

export type SingleProfileProps = ConnectedProps<typeof connector>;

function SingleProfile(props: SingleProfileProps) {
    const router = useRouter();
    const { id } = router.query;

    return (
        <ProfileContainer>
            <Row lg={2}>
                <Col style={{ marginBottom: '2rem' }}lg={4}>
                    <UserProfileCard marauderId={id} { ...props }/>
                </Col>
                <Col lg={8}>                
                <Tabs
                    defaultActiveKey="posts"
                    justify
                    className='mb-5'
                    variant='pills'
                    >
                    <Tab eventKey="posts" title="Posts">
                        <UserPostsTab marauderId={id} { ...props } />
                    </Tab>
                    <Tab eventKey="chats" title="Chats">
                        <UserChatsTab marauderId={id} { ...props } />
                    </Tab>
                    <Tab eventKey="devices" title="Devices">
                        <UserDevicesTab marauderId={id} { ...props } />
                    </Tab>
                    <Tab eventKey="gltfs" title="Gltfs">
                        <UserGltfsTab marauderId={id} { ...props } />
                    </Tab>
                </Tabs>
                </Col>
            </Row>
        </ProfileContainer>
    );
}

const mapToStateProps = (state: RootState) => {
    return { 
        userprofile: state.userprofile.userprofile,
        marauder: state.marauder,
        posts: state.post,
        comments: state.comment,
        chats: state.chat,
        chatComments: state.chatcomment,
        devices: state.device,
        gltfs: state.gltf,
        shapes: state.editor
    };
};

const mapDispatchToProps = (dispatch: Dispatch<GltfFetchOtherUserStart | DeviceDeleteStart | DeviceFetchSingleStart | DeviceFetchAllStart | GltfFetchSingleStart | CheckUserSession | UserprofileFetchSingleStart | MarauderFetchSingleStart | PostFetchAllStart | PostFetchUserPostsStart | PostCreateStart | PostFetchSingleStart | PostDeleteStart | ChatFetchUserChatsStart | ChatFetchSingleStart | ChatDeleteStart | CommentFetchSingleStart | CommentCreateStart | FavoriteCreateStart | EditorFetchAllStart | GltfCreateStart>) => ({
    getUserProfile: (userId: number) => dispatch(userprofileFetchSingleStart(userId)),
    getMarauder: (userId: string) => dispatch(marauderFetchSingleStart(userId)),
    getAllPosts: () => dispatch(postFetchAllStart()),
    getUserPosts: (userId: number) => dispatch(postFetchUserPostsStart(userId)),
    getPost: (postId: number) => dispatch(postFetchSingleStart(postId)),
    likePost: (postId: number, contentType: string) => dispatch(favoriteCreateStart(postId, contentType)),
    createComment: (commentValue: string, imageFile: File, postId: number) => dispatch(commentCreateStart(commentValue, imageFile, postId)),
    getComments: (planetId: number) => dispatch(commentFetchSingleStart(planetId)),
    getChats: () => dispatch(chatFetchUserChatsStart()),
    getChat: (chatId: number) => dispatch(chatFetchSingleStart(chatId)),
    fetchShapes: () => dispatch(editorFetchAllStart()),
    fetchGltfFiles: (userId: string) => dispatch(gltfFetchOtherUserStart(userId)),
    fetchSingleGltf: (gltfId: number) => dispatch(gltfFetchSingleStart(gltfId)),
    fetchDevices: () => dispatch(deviceFetchAllStart()),
    fetchSingleDevice: (deviceId: number) => dispatch(deviceFetchSingleStart(deviceId)),
});

export const connector = connect(mapToStateProps, mapDispatchToProps);

export default connector(SingleProfile);