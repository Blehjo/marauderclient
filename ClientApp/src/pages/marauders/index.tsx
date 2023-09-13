import { Component, Dispatch } from "react";
import { ConnectedProps, connect } from "react-redux";
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'

import ResponsiveMemory from "../../components/responsivememory/responsivememory.component";
import { MarauderFetchAllStart, MarauderFetchSingleStart, MarauderSetIdStart, marauderFetchAllStart, marauderFetchSingleStart, marauderSetIdStart } from "../../store/marauder/marauder.action";
import { MessageCreateStart, MessageSetID, messageCreateStart, messageSetId } from "../../store/message/message.action";
import { MessageCommentCreateStart, messagecommentCreateStart } from "../../store/messagecomment/messagecomment.action";
import { RootState } from "../../store/store";
import { Marauder } from "../../store/marauder/marauder.types";
import { User } from "../../store/user/user.types";

type MarauderProps = ConnectedProps<typeof connector>;
   
// export const getServerSideProps = (async (context) => {
//     const res = await fetch('https://localhost:7144/api/user')
//     const marauders = await res.json()
//     return { props: { marauders } }
// }) satisfies GetServerSideProps<{
//     marauders: User[]
// }>;

class Marauders extends Component<MarauderProps> {
    render() {
        const { marauders } = this.props;
        return (
            <ResponsiveMemory profiles={marauders} { ...this.props }/>
        );
    }
}

const mapStateToProps = (state: RootState) => {
    return { 
        marauders: state.marauder.marauders,
        messages: state.message
    };
};

const mapDispatchToProps = (dispatch: Dispatch<MarauderFetchAllStart | MessageSetID | MarauderFetchSingleStart | MessageCreateStart | MessageCommentCreateStart | MarauderSetIdStart>) => ({
	getAll: () => dispatch(marauderFetchAllStart()),
    getMarauder: (userId: string ) => dispatch(marauderFetchSingleStart(userId)),
    sendMessage: (messageValue: string, receiverId: string, marauder: Marauder) => dispatch(messageCreateStart(messageValue, receiverId, marauder)),
    createMessageComment: (messageId: number, messageValue: string, mediaLink: File) => dispatch(messagecommentCreateStart(messageId, messageValue, mediaLink)),
    setId: (messageId: number) => dispatch(messageSetId(messageId)),
    setUserId: (marauderId: string) => dispatch(marauderSetIdStart(marauderId))
});

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(Marauders);