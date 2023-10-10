import { Dispatch, ReactNode, useState } from "react";
import { ConnectedProps, connect, useDispatch, useSelector } from "react-redux";

import { useRouter } from "next/router";
import { Badge, Card, Col, Modal, Row, Tab, Tabs } from "react-bootstrap";
import { CommunityChannels } from "../../components/community/channels.components";
import { FormChannel } from "../../components/community/form.component";
import { MembersChannel } from "../../components/community/members.component";
import { ChannelCreateStart, ChannelDeleteStart, ChannelFetchAllStart, ChannelSetIdStart, channelCreateStart, channelDeleteStart, channelFetchAllStart, channelSetIdStart } from "../../store/channel/channel.action";
import { ChannelCommentCreateStart, ChannelCommentFetchSingleStart, ChannelCommentSetIdStart, channelcommentCreateStart, channelcommentFetchSingleStart, channelcommentSetIdStart } from "../../store/channelcomment/channelcomment.action";
import { CommunityFetchOtherUsercommunitiesStart, CommunityFetchSingleStart, communityFetchOtherUsercommunitiesStart, communityFetchSingleStart } from "../../store/community/community.action";
import { selectSingleCommunity } from "../../store/community/community.selector";
import { GltfFetchOtherUserStart, gltfFetchOtherUserStart } from "../../store/gltf/gltf.action";
import { MarauderFetchSingleStart, marauderFetchSingleStart } from "../../store/marauder/marauder.action";
import { MemberDeleteStart, MemberFetchSingleStart, memberDeleteStart, memberFetchSingleStart } from "../../store/member/member.action";
import { PostFetchUserPostsStart, postFetchUserPostsStart } from "../../store/post/post.action";
import { RootState } from "../../store/store";
import { CrewContainer } from "../../styles/crew/crew.styles";
import { CommunityPost } from "../../store/communitypost/communitypost.types";
import { BadgeContainer, ResponsiveMemoryContainer } from "../../styles/responsivememory/responsivememory.styles";
import { ArrowsFullscreen, Chat, Rocket } from "react-bootstrap-icons";
import { AContainer } from "../../styles/poststab/poststab.styles";
import { favoriteCreateStart } from "../../store/favorite/favorite.action";
import { communityPostFetchSingleStart } from "../../store/communitypost/communitypost.action";
import { communityCommentFetchSingleStart } from "../../store/communitycomment/communitycomment.action";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import ModalContent from "../../components/modal/modal.component";
import { selectAllPosts, selectSinglePost } from "../../store/communitypost/communitypost.selector";

export type SingleCommunityProps = ConnectedProps<typeof connector>;


function SingleCommunity(props: SingleCommunityProps) {
    const [show, setShow] = useState<boolean>(false);
    const router = useRouter();
    const { id } = router.query;
    const dispatch = useDispatch();
    const post = useSelector(selectSinglePost);
    const posts = useSelector(selectAllPosts);
    const community = useSelector(selectSingleCommunity);

    function handleLike(postId: number, type: string): void {
        dispatch(favoriteCreateStart(postId, type));
    }

    function handleClick(id: number, type?: string): void {
        dispatch(communityPostFetchSingleStart(id));
        dispatch(communityCommentFetchSingleStart(id));
        setShow(!show);
    }
    
    function handleClose() {
        setShow(false);
    }

    function postFunction(prop: CommunityPost) {
        const { communityPostId, postValue, mediaLink, communityComments, favorites, type, imageSource, user } = prop;
        return (
            <Card key={communityPostId} style={{ background: 'black', border: 'solid 1px white', padding: '.5rem', margin: '.3rem', color: 'white'}}>
                <Card.Img src={mediaLink ? imageSource : "https://i.pinimg.com/originals/8e/47/2a/8e472a9d5d7d25f4a88281952aed110e.png"}/>
                <Card.ImgOverlay>
                    <div style={{ cursor: "pointer", position: "absolute", left: "0", top: "0" }}>
                        <BadgeContainer>
                            <Badge style={{ color: 'black' }} bg="light"><ArrowsFullscreen style={{ cursor: 'pointer' }} onClick={() => handleClick(communityPostId, type)} size={15}/></Badge>
                        </BadgeContainer>
                        {
                            <BadgeContainer><Badge style={{ color: 'black' }} bg="light">
                                <Chat size={15}/>
                                {` ${communityComments?.length > 0 ? communityComments?.length : ""}`}
                                </Badge>
                            </BadgeContainer>
                        }
                        {
                            <BadgeContainer>
                                <Badge style={{ color: 'black' }} bg="light">
                                <Rocket style={{ cursor: 'pointer' }} onClick={() => handleLike(communityPostId, type)} size={15}/>
                                {` ${favorites?.length > 0 ? favorites?.length : ""}`}
                                </Badge>
                            </BadgeContainer>
                        }
                    </div>
                </Card.ImgOverlay>
                <Card.Body>
                    <Row style={{ position: 'relative' }} xs={2}>
                        <Col xs={3}>
                        <Card.Img style={{ width: '2rem', height: '2rem', objectFit: 'cover' }} src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/images/${user.imageLink!}`}/>
                        </Col>
                        <Col>
                        <AContainer href={`/profile/${user.userId}`} style={{ marginBottom: '.5rem', marginLeft: '-1rem' }}>{user.username}</AContainer>
                        </Col>
                    </Row>
                    <Card.Text style={{ cursor: 'pointer'}}>{postValue}</Card.Text>
                </Card.Body>
            </Card>
        )
    }

    function getPosts(): Array<ReactNode> {
        const content: any = [];
        if (posts && posts.length > 0) {
            for (let i = 0; i < posts.length; i++) {
                content.push(postFunction(posts[i]));
            }
        } else {
            content.push(
                <Card key="default" bg="dark" style={{ margin: '.3rem', textAlign: 'center', color: 'white'}} >
                    <Card.Body>
                        <Card.Text>Currently no content</Card.Text>
                    </Card.Body>
                </Card>
            )
        }

        console.log("CONTENT::: ", content)
        return content;
    }

    return (
        <>
        <Card style={{ position: 'relative', color: 'white'}}>
        <Tabs
            defaultActiveKey="messages"
            justify
            className='tabscolor'
            variant='pills'
            style={{ zIndex: '100', position: 'absolute', top: '4rem', right: '0%' }}
        >
            <Tab eventKey="messages" title="Messages">
                <CrewContainer style={{  }}>
                <CommunityChannels communityId={id} {...props} />
                <MembersChannel communityId={id} {...props} />
                <FormChannel communityId={id} {...props} />
                </CrewContainer>
            </Tab>
            <Tab eventKey="posts" title="Posts">
            <ResponsiveMemoryContainer style={{ position: 'fixed', top: '5rem', width: '100%'}}>
                <ResponsiveMasonry columnsCountBreakPoints={{ 350: 2, 750: 3, 900: 3, 1050: 4 }}>
                    <Masonry>
                        {getPosts()}
                    </Masonry>
                </ResponsiveMasonry>
            </ResponsiveMemoryContainer>
            <Modal
                    size="lg"
                    show={show} 
                    onHide={() => handleClose}
                    variant={'dark'}
                    className="deviceModal"
                >
                    <ModalContent show={show} handleClose={handleClose} { ...props }/>
                    <Modal.Footer style={{ background: 'black', border: 'white solid 1px' }} >
                    <button className="btn btn-dark" onClick={() => handleClose()}>
                        Close
                    </button>
                    <button className="btn btn-dark" >
                        <a style={{ textDecoration: 'none', color: 'white', cursor: 'pointer' }} href={`/communitypost/${post?.communityPostId!}`}>
                        {`See post`}
                        </a>
                    </button>
                    </Modal.Footer>
                </Modal>
            </Tab>
        </Tabs>
        <Card.Img style={{ position: 'absolute', top: '4.5rem', borderRadius: '.2rem', width: '100%', height: '5rem', objectFit: 'cover'}} src={ community?.mediaLink ? community.imageSource : "https://www.artlog.net/sites/default/files/styles/al_colorbox_rules/public/turrell_cregis_golay_federal_studio.jpg?itok=2M4Pyn0A"}/>
        <Card.ImgOverlay>
        <div style={{ position: "absolute", top: '7rem', left: '50%', transform: 'translate(-50%, -50%)', color: 'white', alignItems: 'center', fontSize: '200%'}}>
            {community?.communityName ? community?.communityName : 'Marauders'}
        </div>
        </Card.ImgOverlay>
        </Card>
        </>
    );
}

const mapToStateProps = (state: RootState) => {
    return { 
        user: state.user.currentUser,
        main: state.user.currentUser,
        channels: state.channel,
        channelcomments: state.channelcomment,
        chats: state.chat,
        communities: state.community,
        gltfs: state.gltf,
        marauder: state.marauder,
        members: state.member,
        posts: state.post,
        userprofile: state.userprofile.userprofile
    };
};

const mapDispatchToProps = (dispatch: Dispatch<ChannelCommentSetIdStart | ChannelSetIdStart | ChannelCommentCreateStart | MemberFetchSingleStart | MemberDeleteStart | ChannelCreateStart | ChannelDeleteStart | MarauderFetchSingleStart | PostFetchUserPostsStart | ChannelCommentFetchSingleStart | ChannelFetchAllStart | GltfFetchOtherUserStart | CommunityFetchOtherUsercommunitiesStart | CommunityFetchSingleStart | ChannelCommentCreateStart>) => ({
    getMarauder: (userId: string) => dispatch(marauderFetchSingleStart(userId)),
    getUserPosts: (userId: string) => dispatch(postFetchUserPostsStart(userId)),
    getComments: (channelId: number) => dispatch(channelcommentFetchSingleStart(channelId)),
    getChannels: (communityId: number) => dispatch(channelFetchAllStart(communityId)),
    createChannel: (description: string, communityId: number) => dispatch(channelCreateStart(description, communityId)),
    createChannelComment: (commentValue: string, channelId: number, imageFile: File) => dispatch(channelcommentCreateStart(commentValue, channelId, imageFile)),
    setChannelId: (channelId: number) => dispatch(channelSetIdStart(channelId)),
    setChannelCommentId: (channelCommentId: number) => dispatch(channelcommentSetIdStart(channelCommentId)),
    deleteChannel: (channelId: number) => dispatch(channelDeleteStart(channelId)),
    fetchGltfFiles: (userId: string) => dispatch(gltfFetchOtherUserStart(userId)),
    fetchCommunities: (userId: string) => dispatch(communityFetchOtherUsercommunitiesStart(userId)),
    fetchSingleCommunity: (communityId: number) => dispatch(communityFetchSingleStart(communityId)),
    getMembers: (communityId: number) => dispatch(memberFetchSingleStart(communityId)),
    deleteMember: (memberId: number) => dispatch(memberDeleteStart(memberId))
});

export const connector = connect(mapToStateProps, mapDispatchToProps);

export default connector(SingleCommunity);