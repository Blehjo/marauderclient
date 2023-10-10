import { Component } from "react";
import { Card, Col, Image, Modal, Row } from "react-bootstrap";
import { XCircle } from "react-bootstrap-icons";
import { Member } from "../../store/member/member.types";
import { ChatsContainer } from "../../styles/communities/communities.styles";
import { XContainer } from "../../styles/devices/devices.styles";
import { AContainer, CardContainer } from "../../styles/poststab/poststab.styles";
import { UserProfileCard } from "../profilecard/userprofilecard.component";
import { SelectShape } from "../../styles/editor/editor.styles";

interface IMembersChannel {
    marauderId: string | null;
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

    handleMemberSelect(memberId: string): void {
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
        const { members, main, communities } = this.props;
        const { showMarauder, showDelete } = this.state;
        return (
            <ChatsContainer style={{ top: '10rem' }}>
                <CardContainer>Members</CardContainer>
                {
                    members.members?.map(({ memberId, dateCreated, user }: Member, index: number) => (
                        <SelectShape onClick={() => this.handleMemberSelect(user.userId)} style={{ zIndex: '1', display: 'flex', flexDirection: 'row', position: 'relative', border: '1px white solid', margin: '.3rem', padding: '.5rem', borderRadius: '.5rem' }} key={index}>
                            <Image style={{ width: '2rem', height: '2rem', objectFit: 'cover' }} src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/images/${user?.imageLink!}`}/>
                                <Row xs={1}>
                                <div style={{ textAlign: 'left', marginLeft: '1rem' }}>
                                    {user.username}
                                </div>
                                </Row>
                                {main?.userId == communities.singleCommunity?.userId && <XContainer style={{ position: 'absolute', top: '0.5rem', right: '0.5rem' }}>
                                    <XCircle onClick={this.deleteModal} />
                                </XContainer>}
                        </SelectShape>
                    ))
                }
                <Modal className="deviceModal" show={showMarauder} onHide={this.openModal}>
                    <UserProfileCard {...this.props} />
                </Modal>
                <Modal className="deviceModal" show={showDelete} onHide={this.deleteModal}>
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