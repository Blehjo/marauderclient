import { Component, Dispatch } from "react";
import { ConnectedProps, connect } from "react-redux";
import ResponsiveMemory from "../../components/responsivememory/responsivememory.component";

import { MessageCreateStart, MessageSetID, messageCreateStart, messageSetId } from "../../store/message/message.action";
import { MessageCommentCreateStart, messagecommentCreateStart } from "../../store/messagecomment/messagecomment.action";
import { PilotFetchAllStart, PilotFetchSingleStart, pilotFetchAllStart, pilotFetchSingleStart } from "../../store/pilot/pilot.action";
import { RootState } from "../../store/store";

type MarauderProps = ConnectedProps<typeof connector>;

class Marauders extends Component<MarauderProps> {
    render() {
        return (
            <ResponsiveMemory { ...this.props }/>
        );
    }
}

const mapStateToProps = (state: RootState) => {
    return { 
        marauders: state.pilot.pilots,
        messages: state.message
    };
};

const mapDispatchToProps = (dispatch: Dispatch<PilotFetchAllStart | MessageSetID | PilotFetchSingleStart | MessageCreateStart | MessageCommentCreateStart>) => ({
	getAllMarauders: () => dispatch(pilotFetchAllStart()),
    getMarauder: (userId: number ) => dispatch(pilotFetchSingleStart(userId)),
    sendMessage: (messageValue: string) => dispatch(messageCreateStart(messageValue)),
    createMessageComment: (messageId: number, messageValue: string, mediaLink: File) => dispatch(messagecommentCreateStart(messageId, messageValue, mediaLink)),
    setId: (messageId: number) => dispatch(messageSetId(messageId))
});

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(Marauders);