import { useRouter } from "next/router";
import { Dispatch } from "react";
import { Col, Row, Tab, Tabs } from "react-bootstrap";
import { ConnectedProps, connect } from "react-redux";

import { UserChatsTab } from "../../components/chatstab/userchatstab.component";
import { UserCommunitiesTab } from "../../components/devicestab/usercommunities.component";
import UserGltfsTab from "../../components/gltfstab/usergltfstab.component";
import UserPostsTab from "../../components/poststab/userpoststab.component";
import { UserProfileCard } from "../../components/profilecard/userprofilecard.component";
import { ChatDeleteStart, ChatFetchSingleStart, ChatFetchSingleUserChatsStart, ChatFetchUserChatsStart, chatFetchSingleStart, chatFetchSingleUserChatsStart } from "../../store/chat/chat.action";
import { CommentCreateStart, CommentFetchSingleStart, commentCreateStart, commentFetchSingleStart } from "../../store/comment/comment.action";
import { CommunityFetchOtherUsercommunitiesStart, CommunityFetchSingleStart, communityFetchOtherUsercommunitiesStart, communityFetchSingleStart } from "../../store/community/community.action";
import { EditorFetchAllStart, editorFetchAllStart } from "../../store/editor/editor.action";
import { FavoriteCreateStart, favoriteCreateStart } from "../../store/favorite/favorite.action";
import { GltfCreateStart, GltfFetchOtherUserStart, GltfFetchSingleStart, gltfFetchOtherUserStart, gltfFetchSingleStart } from "../../store/gltf/gltf.action";
import { CommentCreateStart as GltfCommentCreateStart, commentCreateStart as gltfCommentCreateStart } from "../../store/gltfcomment/gltfcomment.action";
import { MarauderFetchSingleStart, marauderFetchSingleStart } from "../../store/marauder/marauder.action";
import { PostCreateStart, PostDeleteStart, PostFetchAllStart, PostFetchSingleStart, PostFetchUserPostsStart, postFetchAllStart, postFetchSingleStart, postFetchUserPostsStart } from "../../store/post/post.action";
import { RootState } from "../../store/store";
import { CheckUserSession } from "../../store/user/user.action";
import { CommentCreateStart as UserCommentCreateStart, CommentFetchSingleStart as UserCommentFetchSingleStart, commentCreateStart as userCommentCreateStart, commentFetchSingleStart as userCommentFetchSingleStart } from "../../store/userchatcomment/userchatcomment.action";
import { UserprofileFetchSingleStart, userprofileFetchSingleStart } from "../../store/userprofile/userprofile.action";
import { ProfileContainer } from "../../styles/profile/profile.styles";

export type SingleProfileProps = ConnectedProps<typeof connector>;

// export const getServerSideProps = (async (context) => {
//     const res = await fetch('https://localhost:7144/api/user')
//     const marauders = await res.json()
//     return { props: { marauders } }
// }) satisfies GetServerSideProps<{
//     marauders: User[]
// }>;

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
                    <Tab eventKey="communities" title="Communities">
                        <UserCommunitiesTab marauderId={id} { ...props } />
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
        communities: state.community,
        devices: state.device,
        gltfs: state.gltf,
        shapes: state.editor,
        userComments: state.userchatcomment,
        gltfComments: state.gltfcomment
    };
};

const mapDispatchToProps = (dispatch: Dispatch<ChatFetchSingleUserChatsStart | GltfFetchSingleStart | GltfFetchOtherUserStart | UserCommentCreateStart | UserCommentFetchSingleStart | GltfCommentCreateStart | CommunityFetchOtherUsercommunitiesStart | CommunityFetchSingleStart | GltfFetchSingleStart | CheckUserSession | UserprofileFetchSingleStart | MarauderFetchSingleStart | PostFetchAllStart | PostFetchUserPostsStart | PostCreateStart | PostFetchSingleStart | PostDeleteStart | ChatFetchUserChatsStart | ChatFetchSingleStart | ChatDeleteStart | CommentFetchSingleStart | CommentCreateStart | FavoriteCreateStart | EditorFetchAllStart | GltfCreateStart>) => ({
    getUserProfile: (userId: string) => dispatch(userprofileFetchSingleStart(userId)),
    getMarauder: (userId: string) => dispatch(marauderFetchSingleStart(userId)),
    getAllPosts: () => dispatch(postFetchAllStart()),
    getUserPosts: (userId: string) => dispatch(postFetchUserPostsStart(userId)),
    getPost: (postId: number) => dispatch(postFetchSingleStart(postId)),
    likePost: (postId: number, contentType: string) => dispatch(favoriteCreateStart(postId, contentType)),
    createComment: (commentValue: string, imageFile: File, postId: number) => dispatch(commentCreateStart(commentValue, imageFile, postId)),
    getComments: (planetId: number) => dispatch(commentFetchSingleStart(planetId)),
    getChats: (userId: string) => dispatch(chatFetchSingleUserChatsStart(userId)),
    getChat: (chatId: number) => dispatch(chatFetchSingleStart(chatId)),
    fetchShapes: () => dispatch(editorFetchAllStart()),
    fetchGltfFiles: (userId: string) => dispatch(gltfFetchOtherUserStart(userId)),
    fetchSingleGltf: (gltfId: number) => dispatch(gltfFetchSingleStart(gltfId)),
    fetchCommunities: (userId: string) => dispatch(communityFetchOtherUsercommunitiesStart(userId)),
    fetchSingleCommunity: (communityId: number) => dispatch(communityFetchSingleStart(communityId)),
    createUserComment: (commentValue: string, imageFile: File, chatId: number ) => dispatch(userCommentCreateStart(commentValue, imageFile, chatId)),
    getUserComments: (chatId: number) => dispatch(userCommentFetchSingleStart(chatId)),
    gltfCreateComment: (commentValue: string, imageFile: File, gltfId: number) => dispatch(gltfCommentCreateStart(commentValue, imageFile, gltfId)),
    getGltfComments: (gltfId: number) => dispatch(gltfFetchSingleStart(gltfId))
});

export const connector = connect(mapToStateProps, mapDispatchToProps);

export default connector(SingleProfile);