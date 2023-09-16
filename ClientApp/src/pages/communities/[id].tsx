import { Dispatch } from "react";
import { ConnectedProps, connect } from "react-redux";

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

export type SingleCommunityProps = ConnectedProps<typeof connector>;


function SingleCommunity(props: SingleCommunityProps) {
    const router = useRouter();
    const { id } = router.query;

    return (
        <CrewContainer>
            <CommunityChannels communityId={id} {...props} />
            <FormChannel communityId={id} {...props} />
            <MembersChannel communityId={id} {...props} />
        </CrewContainer>
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
    getUserPosts: (userId: number) => dispatch(postFetchUserPostsStart(userId)),
    getComments: (channelId: number) => dispatch(channelcommentFetchSingleStart(channelId)),
    getChannels: (communityId: number) => dispatch(channelFetchAllStart(communityId)),
    createChannel: (description: string, communityId: number) => dispatch(channelCreateStart(description, communityId)),
    createChannelComment: (commentValue: string, channelId: number, imageFile: File) => dispatch(channelcommentCreateStart(commentValue, channelId, imageFile)),
    setChannelId: (channelId: number) => dispatch(channelSetIdStart(channelId)),
    setChannelCommentId: (channelCommentId: number) => dispatch(channelcommentSetIdStart(channelCommentId)),
    deleteChannel: (channelId: number) => dispatch(channelDeleteStart(channelId)),
    fetchGltfFiles: (userId: string) => dispatch(gltfFetchOtherUserStart(userId)),
    fetchCommunities: (userId: number) => dispatch(communityFetchOtherUsercommunitiesStart(userId)),
    fetchSingleCommunity: (communityId: number) => dispatch(communityFetchSingleStart(communityId)),
    getMembers: (communityId: number) => dispatch(memberFetchSingleStart(communityId)),
    deleteMember: (memberId: number) => dispatch(memberDeleteStart(memberId))
});

export const connector = connect(mapToStateProps, mapDispatchToProps);

export default connector(SingleCommunity);