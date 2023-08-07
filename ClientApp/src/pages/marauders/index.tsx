import { Component, Dispatch } from "react";
import { ConnectedProps, connect } from "react-redux";

import ResponsiveMemory from "../../components/responsivememory/responsivememory.component";
import { MarauderFetchAllStart, MarauderFetchSingleStart, MarauderSetIdStart, marauderFetchAllStart, marauderFetchSingleStart, marauderSetIdStart } from "../../store/marauder/marauder.action";
import { MessageCreateStart, MessageSetID, messageCreateStart, messageSetId } from "../../store/message/message.action";
import { MessageCommentCreateStart, messagecommentCreateStart } from "../../store/messagecomment/messagecomment.action";
import { RootState } from "../../store/store";

type MarauderProps = ConnectedProps<typeof connector>;

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
    getMarauder: (userId: number ) => dispatch(marauderFetchSingleStart(userId)),
    sendMessage: (messageValue: string, receiverId: string) => dispatch(messageCreateStart(messageValue, receiverId)),
    createMessageComment: (messageId: number, messageValue: string, mediaLink: File) => dispatch(messagecommentCreateStart(messageId, messageValue, mediaLink)),
    setId: (messageId: number) => dispatch(messageSetId(messageId)),
    setUserId: (marauderId: number) => dispatch(marauderSetIdStart(marauderId))
});

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(Marauders);