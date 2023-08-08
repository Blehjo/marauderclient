import { ChangeEvent, Component, FormEvent } from "react";
import { Card, Col, Form, Modal, Row } from "react-bootstrap";
import { XCircle } from "react-bootstrap-icons";
import { Textfit } from "react-textfit";

import { Channel } from "../../store/channel/channel.types";
import { CrewMemberContainer } from "../../styles/crew/crew.styles";
import { CardContainer, XContainer } from "../../styles/devices/devices.styles";
import { ModalPostContainer } from "../../styles/poststab/poststab.styles";

interface ICommunityChannels {
    description: string;
    channelQueueId: number | null;
    createModal: boolean;
    deleteModal: boolean;
    mediaLink: string;
    imageSource: string | ArrayBuffer | null | undefined;
    imageFile: any;
}

export class CommunityChannels extends Component<any, ICommunityChannels> {
    constructor(props: any) {
        super(props);
        this.state = {
            description: "",
            channelQueueId: null,
            createModal: false,
            deleteModal: false,
            mediaLink: "",
            imageSource: "",
            imageFile: null
        }
        this.handleClick = this.handleClick.bind(this);
        this.openDeleteModal = this.openDeleteModal.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.createChannel = this.createChannel.bind(this);
        this.deleteChannel = this.deleteChannel.bind(this);
    }

    handleClick(): void {
        this.setState({
            createModal: !this.state.createModal
        })
    }

    createChannel(event: FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        const { description } = this.state;
        this.props.createChannel(description, this.props.communityId!);
        this.handleClick();
    }

    openDeleteModal(): void {
        this.setState({
            deleteModal: !this.state.deleteModal
        })
    }

    handleDelete(channelId: number): void {
        this.openDeleteModal();
        this.setState({
            channelQueueId: channelId
        })
    }
    
    deleteChannel(event: any): void {
        event.preventDefault();
        const { channelQueueId } = this.state;
        this.props.deleteChannel(channelQueueId);
        this.openDeleteModal();
    }

    getChannelComments(channelId: number): void {
        this.props.getComments(channelId);
        this.props.setChannelId(channelId);
    }

    handleChange(event: ChangeEvent<HTMLInputElement>): void {
        const { name, value } = event.target;
        this.setState({ ...this.state, [name]: value });
    }

    componentDidMount(): void {
        if (this.props.communityId != undefined) {
            this.props.getChannels(this.props.communityId);
            this.props.fetchSingleCommunity(this.props.communityId);
        }
    }

    componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<ICommunityChannels>, snapshot?: any): void {
        if (prevProps.communityId != this.props.communityId) {
            this.props.fetchSingleCommunity(this.props.communityId);
            this.props.getChannels(this.props.communityId);
        }
    }

    render() {
        const { channels, communities, user } = this.props;
        const { description, deleteModal, createModal } = this.state;
        return (
            <CrewMemberContainer>
                {user?.userId == communities.singleCommunity?.userId && <CardContainer key='cardcontainer' onClick={this.handleClick}>New Channel +</CardContainer>}
                {
                    channels.channels?.map(({ channelId, description, dateCreated, communityId }: Channel, index: number) => (
                        <Card key={channelId} onClick={() => this.getChannelComments(channelId!)} style={{ verticalAlign: 'middle', justifyContent: 'center', borderRadius: '.3rem', border: 'solid 1px white', color: 'white', backgroundColor: 'black', margin: '.2rem .2rem 1rem .2rem', cursor: 'pointer' }}>
                            <Row style={{ lineHeight: '3rem' }} key={index} xs={3}>
                                <Col key='col2' xs={6}>
                                    <Textfit style={{ width: "100px" }}>
                                    {description}
                                    </Textfit>
                                </Col>
                                {user?.userId == communities.singleCommunity?.userId && <Col key='col3' xs={1}>
                                    <XContainer>
                                        <XCircle onClick={() => this.handleDelete(channelId!)} />
                                    </XContainer>
                                </Col>}
                            </Row>
                        </Card>
                    ))
                }
                <Modal show={createModal} onHide={() => this.handleClick()}>
                    <Modal.Header closeButton>
                    <Modal.Title>Channel</Modal.Title>
                    </Modal.Header>
                    <Form autoComplete="off" onSubmit={this.createChannel}>
                    <Modal.Body>
                        <Form.Group className="mb-3" controlId="formPostValue">
                        <Form.Control
                            onChange={this.handleChange}
                            name="description"
                            value={description}
                            type="description"
                            as="input"
                            placeholder="Title"
                            autoFocus
                            />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                    <button type="submit" className="btn btn-primary">
                        Log
                    </button>
                    </Modal.Footer>
                    </Form>
                </Modal>
                <Modal show={deleteModal} onHide={() => this.openDeleteModal()}>
                    <Modal.Body style={{ textAlign: "center", color: "black" }}>
                        Are you sure you want to delete this channel?
                    </Modal.Body>
                    <Modal.Footer style={{ justifyContent: "center" }}>
                    <button className="btn btn-secondary" onClick={() => this.openDeleteModal()}>
                        Cancel
                    </button>
                    <button onClick={this.deleteChannel} className="btn btn-primary">
                        Delete
                    </button>
                    </Modal.Footer>
                </Modal>
            </CrewMemberContainer>
        )
    }
}