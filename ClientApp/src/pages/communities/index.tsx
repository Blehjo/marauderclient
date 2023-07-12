import { ChangeEvent, Component, Dispatch, FormEvent } from "react";
import { Col, Form, Modal, Row } from "react-bootstrap";
import { Send } from "react-bootstrap-icons";
import { ConnectedProps, connect } from "react-redux";
import ResponsiveMemory from "../../components/responsivememory/responsivememory.component";
import { CommunityCreateStart, CommunityFetchAllStart, CommunityFetchSingleStart, communityCreateStart, communityFetchAllStart, communityFetchSingleStart } from "../../store/community/community.action";
import { MemberCreateStart, memberCreateStart } from "../../store/member/member.action";
import { RootState } from "../../store/store";
import { CommunityContainer } from "../../styles/communities/communities.styles";
import { Community } from "../../store/community/community.types";
import { Member } from "../../store/member/member.types";

type CommunityProps = ConnectedProps<typeof connector>;

interface ICommunity {
    communityName: string;
    description: string;
    mediaLink: string;
    imageSource: string | ArrayBuffer | null | undefined;
    imageFile: any;
    show: boolean;
}

class Communities extends Component<CommunityProps, ICommunity> {
    constructor(props: CommunityProps) {
        super(props);
        this.state = {
            communityName: "",
            description: "",
            mediaLink: "",
            imageSource: "",
            imageFile: null,
            show: false
        }
        this.handleCloseCreate = this.handleCloseCreate.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.showPreview = this.showPreview.bind(this);
    }
    handleCloseCreate(): void {
        this.setState({
            show: !this.state.show
        });
    }

    handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const { communityName, description, mediaLink, imageFile } = this.state;
        this.props.createCommunity(communityName, description, mediaLink, imageFile);
        this.handleCloseCreate();
    }

    handleChange(event: ChangeEvent<HTMLInputElement>): void {
        const { name, value } = event.target;
        this.setState({ ...this.state, [name]: value });
    }

    showPreview(event: ChangeEvent<HTMLInputElement>) {
        if (event.target.files && event.target.files[0]) {
          const { files } = event.target;
          const selectedFiles = files as FileList;
          let imageFile = selectedFiles[0];
          const reader = new FileReader();
          reader.onload = x => {
            this.setState({
              ...this.state,
              imageFile,
              imageSource: x.target?.result
            });
          }
          reader.readAsDataURL(imageFile);
        } else {
          this.setState({
              ...this.state,
              imageFile: null,
              imageSource: null
          });
        }
    }

    componentDidUpdate(prevProps: Readonly<{ communities: Community[]; singleCommunity: Community; members: Member[]; } & { getAll: () => void; getCommunity: (communityId: number) => void; createCommunity: (communityName: string, description: string, mediaLink: string, imageFile: File) => void; joinCommunity: (communityId: number) => void; }>, prevState: Readonly<ICommunity>, snapshot?: any): void {
        if (prevProps.communities.length != this.props.communities.length) {
            this.props.getAll();
        }
    }

    render() {
        const { show } = this.state;
        return (
            <CommunityContainer>
            <Modal show={show} onHide={this.handleCloseCreate}>
                <Modal.Header closeButton>
                    Create a new community?
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={this.handleSubmit}>
                    <Row style={{ justifyContent: 'center' }} xs={1}>
                        <Col xs={12}>
                            <Row style={{ marginBottom: '1rem', justifyContent: 'center' }}>
                                <Col xs={12}>
                                    <Form.Group>
                                        <Form.Control style={{ height: '.5rem' }} name="communityName" as="textarea" onChange={this.handleChange} placeholder="Community Name" />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row style={{ marginBottom: '1rem', justifyContent: 'center' }}>
                                <Col xs={12}>
                                    <Form.Group>
                                        <Form.Control style={{ height: '.5rem' }} name="description" as="textarea" onChange={this.handleChange} placeholder="Description" />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row style={{ justifyContent: 'center' }}>
                                <Col xs={12}>
                                    <Form.Group className="mb-3" controlId="formMedia">
                                        <Form.Control onChange={this.showPreview} name="mediaLink" as="input" accept="image/*" type="file" placeholder="Media" />
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Col>
                        <Col xs={12}>
                            <button style={{ textAlign: 'center', width: '100%', height: '100%'}} className="btn btn-light" type="submit">
                                <Send/>
                            </button>
                        </Col>                
                    </Row>
                    </Form>
                </Modal.Body>
            </Modal>
            <button style={{ position: 'absolute', right: '0%'}} className="btn btn-outline-light" onClick={this.handleCloseCreate}>+</button>
            <ResponsiveMemory { ...this.props } />
            </CommunityContainer>
        )
    }
}

const mapStateToProps = (state: RootState) => {
    return { 
        communities: state.community.communities,
        singleCommunity: state.community.singleCommunity,
        members: state.member.members 
    };
};

const mapDispatchToProps = (dispatch: Dispatch<CommunityFetchAllStart | CommunityFetchSingleStart | CommunityCreateStart | MemberCreateStart>) => ({
	getAll: () => dispatch(communityFetchAllStart()),
    getCommunity: (communityId: number) => dispatch(communityFetchSingleStart(communityId)),
    createCommunity: (communityName: string, description: string, mediaLink: string, imageFile: File) => dispatch(communityCreateStart(communityName, description, mediaLink, imageFile)),
    joinCommunity: (communityId: number) => dispatch(memberCreateStart(communityId))
});

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(Communities);