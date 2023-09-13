import { Component, Dispatch } from "react";
import { ContainerBox, FixedBox } from "../../styles/messagebox/messagebox.styles";
import { ChevronUp, PencilSquare, ThreeDots } from "react-bootstrap-icons";
import { ConnectedProps, connect } from "react-redux";
import { RootState } from "../../store/store";
import { CheckUserSession, checkUserSession } from "../../store/user/user.action";
import { Col, Image, Row } from "react-bootstrap";

type MessageBoxProps = ConnectedProps<typeof connector>;

class MessageBox extends Component<MessageBoxProps> {
    constructor(props: MessageBoxProps) {
        super(props);
    }

    render() {
        const { user } = this.props;
        return (
            <FixedBox>
                <ContainerBox>
                    <Row xs={2}>
                    <Col >
                        <Image style={{ width: '2rem', height: '2rem', borderRadius: '1rem', paddingTop: '.3rem' }} fluid src={user?.imageLink ? user?.imageSource! : ""}/>
                    </Col>
                    <Col>
                        <div style={{ paddingTop: '.3rem' }}>Comms</div>
                    </Col>
                    </Row>
                </ContainerBox>
                <ContainerBox>
                    <div style={{ position: 'absolute', right: '1rem' }}>
                        <ThreeDots size={20} style={{ cursor: 'pointer' }}/>
                        <PencilSquare size={30} style={{ padding: '0rem .4rem 0rem .4rem', cursor: 'pointer' }}/>
                        <ChevronUp size={20} style={{ cursor: 'pointer' }}/>
                    </div>
                </ContainerBox>
            </FixedBox>
        )
    }
}

const mapStateToProps = (state: RootState) => {
    return { 
        user: state.user.currentUser
    };
};

const mapDispatchToProps = (dispatch: Dispatch<CheckUserSession>) => ({
    checkUserSession: () => dispatch(checkUserSession())
});

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(MessageBox);