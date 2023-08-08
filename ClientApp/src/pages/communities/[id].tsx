import { Dispatch } from "react";
import { Card, Col, Dropdown, Form, Modal, Row } from "react-bootstrap";
import { PencilSquare, Plus, Send, XCircle } from "react-bootstrap-icons";
import { ConnectedProps, connect } from "react-redux";

import { useRouter } from "next/router";
import { CommunityChannels } from "../../components/community/channels.components";
import { ChannelCreateStart, ChannelDeleteStart, ChannelFetchAllStart, channelCreateStart, channelDeleteStart, channelFetchAllStart } from "../../store/channel/channel.action";
import { ChannelCommentCreateStart, ChannelCommentFetchSingleStart, channelcommentFetchSingleStart } from "../../store/channelcomment/channelcomment.action";
import { CommunityFetchOtherUsercommunitiesStart, CommunityFetchSingleStart, communityFetchOtherUsercommunitiesStart, communityFetchSingleStart } from "../../store/community/community.action";
import { GltfFetchOtherUserStart, gltfFetchOtherUserStart } from "../../store/gltf/gltf.action";
import { MarauderFetchSingleStart, marauderFetchSingleStart } from "../../store/marauder/marauder.action";
import { PostFetchUserPostsStart, postFetchUserPostsStart } from "../../store/post/post.action";
import { RootState } from "../../store/store";
import { ChatBox, ChatForm, ChatsContainer, Container, CrewContainer, HeaderContainer, PenContainer } from "../../styles/crew/crew.styles";
import { ButtonContainer, CardContainer, FormContainer, XContainer } from "../../styles/devices/devices.styles";
import { InputContainer } from "../../styles/messages/messages.styles";
import { FormChannel } from "../../components/community/form.component";
import { MembersChannel } from "../../components/community/members.component";
import { MemberDeleteStart, MemberFetchAllStart, MemberFetchSingleStart, memberDeleteStart, memberFetchAllStart, memberFetchSingleStart } from "../../store/member/member.action";

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

const mapDispatchToProps = (dispatch: Dispatch<MemberFetchSingleStart | MemberDeleteStart | ChannelCreateStart | ChannelDeleteStart | MarauderFetchSingleStart | PostFetchUserPostsStart | ChannelCommentFetchSingleStart | ChannelFetchAllStart | GltfFetchOtherUserStart | CommunityFetchOtherUsercommunitiesStart | CommunityFetchSingleStart | ChannelCommentCreateStart>) => ({
    getMarauder: (userId: string) => dispatch(marauderFetchSingleStart(userId)),
    getUserPosts: (userId: number) => dispatch(postFetchUserPostsStart(userId)),
    getComments: (channelId: number) => dispatch(channelcommentFetchSingleStart(channelId)),
    getChannels: (communityId: number) => dispatch(channelFetchAllStart(communityId)),
    createChannel: (description: string, communityId: number) => dispatch(channelCreateStart(description, communityId)),
    deleteChannel: (channelId: number) => dispatch(channelDeleteStart(channelId)),
    fetchGltfFiles: (userId: string) => dispatch(gltfFetchOtherUserStart(userId)),
    fetchCommunities: (userId: number) => dispatch(communityFetchOtherUsercommunitiesStart(userId)),
    fetchSingleCommunity: (communityId: number) => dispatch(communityFetchSingleStart(communityId)),
    getMembers: (communityId: number) => dispatch(memberFetchSingleStart(communityId)),
    deleteMember: (memberId: number) => dispatch(memberDeleteStart(memberId))
});

export const connector = connect(mapToStateProps, mapDispatchToProps);

export default connector(SingleCommunity);