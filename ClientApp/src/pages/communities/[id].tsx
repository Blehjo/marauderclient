import { Dispatch } from "react";
import { ConnectedProps, connect, useDispatch, useSelector } from "react-redux";

import { useRouter } from "next/router";
import { CommunityChannels } from "../../components/community/channels.components";
import { FormChannel } from "../../components/community/form.component";
import { MembersChannel } from "../../components/community/members.component";
import { ChannelCreateStart, ChannelDeleteStart, ChannelFetchAllStart, ChannelSetIdStart, channelCreateStart, channelDeleteStart, channelFetchAllStart, channelSetIdStart } from "../../store/channel/channel.action";
import { ChannelCommentCreateStart, ChannelCommentFetchSingleStart, ChannelCommentSetIdStart, channelcommentCreateStart, channelcommentFetchSingleStart, channelcommentSetIdStart } from "../../store/channelcomment/channelcomment.action";
import { CommunityFetchOtherUsercommunitiesStart, CommunityFetchSingleStart, communityFetchOtherUsercommunitiesStart, communityFetchSingleStart } from "../../store/community/community.action";
import { GltfFetchOtherUserStart, gltfFetchOtherUserStart } from "../../store/gltf/gltf.action";
import { MarauderFetchSingleStart, marauderFetchSingleStart } from "../../store/marauder/marauder.action";
import { MemberDeleteStart, MemberFetchSingleStart, memberDeleteStart, memberFetchSingleStart } from "../../store/member/member.action";
import { PostFetchUserPostsStart, postFetchUserPostsStart } from "../../store/post/post.action";
import { RootState } from "../../store/store";
import { CrewContainer } from "../../styles/crew/crew.styles";
import { Card, Image } from "react-bootstrap";
import { selectSingleCommunity } from "../../store/community/community.selector";

export type SingleCommunityProps = ConnectedProps<typeof connector>;


function SingleCommunity(props: SingleCommunityProps) {
    const router = useRouter();
    const { id } = router.query;
    const dispatch = useDispatch();
    const community = useSelector(selectSingleCommunity);

    return (
        <>
        <Card style={{ position: 'relative'}}>
        <Card.Img style={{ position: 'absolute', top: '4.5rem', borderRadius: '.2rem', width: '100%', height: '5rem', objectFit: 'cover'}} src={ community?.mediaLink ? community.imageSource : "https://www.artlog.net/sites/default/files/styles/al_colorbox_rules/public/turrell_cregis_golay_federal_studio.jpg?itok=2M4Pyn0A"}/>
        <Card.ImgOverlay>
        <div style={{ position: "absolute", top: '7rem', left: '50%', transform: 'translate(-50%, -50%)', color: 'white', alignItems: 'center', fontSize: '200%'}}>
            {community?.communityName ? community?.communityName : 'Marauders'}
        </div>
        </Card.ImgOverlay>
        </Card>
        <CrewContainer>
            <CommunityChannels communityId={id} {...props} />
            <MembersChannel communityId={id} {...props} />
            <FormChannel communityId={id} {...props} />
        </CrewContainer>
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