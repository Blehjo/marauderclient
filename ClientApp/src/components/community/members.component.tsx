import { Component } from "react";
import { ChatsContainer, TextFitContainer } from "../../styles/crew/crew.styles";
import { CardContainer } from "../../styles/poststab/poststab.styles";
import { Card, Row, Col, Modal } from "react-bootstrap";
import { XContainer } from "../../styles/devices/devices.styles";
import { XCircle } from "react-bootstrap-icons";
import { SingleCommunityProps } from "../../pages/communities/[id]";
import { Member } from "../../store/member/member.types";
import { UserProfileCard } from "../profilecard/userprofilecard.component";

interface IMembersChannel {
    marauderId: number | null;
    showMarauder: boolean;
    showDelete: boolean;
}
export class MembersChannel extends Component<any, IMembersChannel> {
    constructor(props: any) {
        super(props);
        this.state = {
            marauderId: null,
            showMarauder : false,
            showDelete  : false
        }
        this.openModal = this.openModal.bind(this);
        this.deleteModal = this.deleteModal.bind(this);
        this.handleMemberSelect = this.handleMemberSelect.bind(this);
    }

    openModal(): void {
        this.setState({
            showMarauder: !this.state.showMarauder
        })
    }

    deleteModal(): void {
        this.setState({
            showDelete: !this.state.showDelete
        })
    }

    handleMemberSelect(memberId: number): void {
        this.props.getMarauder(memberId);
        this.setState({
            marauderId: memberId
        })
        this.openModal();
    }

    handleMemberDelete(): void {
        const { marauderId } = this.state;
        this.props.deleteMember(marauderId);
    }

    componentDidMount(): void {
        if (this.props.communityId != undefined) {
            this.props.getMembers(this.props.communityId);
        }
    }

    componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<IMembersChannel>, snapshot?: any): void {
        if (prevProps.communityId != this.props.communityId) {
            this.props.getMembers(this.props.communityId)
        }
    }

    render() {
        const { members, user, communities } = this.props;
        const { showMarauder, showDelete } = this.state;
        return (
            <ChatsContainer>
                <CardContainer>Members</CardContainer>
                {
                    members.members?.map(({ memberId, dateCreated, user }: Member, index: number) => (
                        <Card onClick={() => this.handleMemberSelect(user.userId)} style={{ verticalAlign: 'middle', justifyContent: 'center', borderRadius: '.3rem', border: 'solid 1px white', color: 'white', backgroundColor: 'black', margin: '.2rem .2rem 1rem .2rem', cursor: 'pointer', padding: '.5rem' }} key={index}>
                            <Row key={index} xs={2}>
                                <Col xs={10}>
                                    <TextFitContainer>
                                        {user.username}
                                    </TextFitContainer>
                                </Col>
                                <Col xs={2}>
                                    {user?.userId == communities.singleCommunity?.userId && <XContainer>
                                        <XCircle onClick={this.deleteModal} />
                                    </XContainer>}
                                </Col>
                            </Row>
                        </Card>
                    ))
                }
                <Modal show={showMarauder} onHide={this.openModal}>
                    <UserProfileCard {...this.props} />
                </Modal>
                <Modal show={showDelete} onHide={this.deleteModal}>
                    <Modal.Header closeButton/>
                    <Modal.Body style={{ textAlign: "center", color: "black" }}>
                        Are you sure you want to delete this chat?
                    </Modal.Body>
                    <Modal.Footer style={{ justifyContent: "center" }}>
                    <button className="btn btn-secondary" onClick={() => this.deleteModal()}>
                        Cancel
                    </button>
                    <button onClick={() => this.handleMemberDelete()} className="btn btn-primary">
                        Delete
                    </button>
                    </Modal.Footer>
                </Modal>
            </ChatsContainer>
        );
    }
}