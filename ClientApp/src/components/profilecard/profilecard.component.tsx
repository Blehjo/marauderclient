import { ChangeEvent, Component, FormEvent } from "react";
import { Card, Row, Col, Modal, Form, Image } from "react-bootstrap";
import { Pen } from "react-bootstrap-icons";
import { editUser } from "../../utils/api/user.api";
import { ProfileProps } from "../../pages/profile";

interface IDefaultFormFields {
    showEdit: boolean;
    username: string;
    about: string;
    emailAddress: string;
    dateOfBirth: string;
    password: string;
    firstName: string;
    lastName: string;
    imageLink: string;
    imageSource: string | ArrayBuffer | null | undefined;
    imageFile: any;
};

export class ProfileCard extends Component<ProfileProps, IDefaultFormFields> {
    constructor(props: ProfileProps) {
        super(props);
        this.state = {
            showEdit: false,
            username: "",
            about: "",
            emailAddress: "",
            dateOfBirth: "",
            password: "",
            firstName: "",
            lastName: "",
            imageLink: "",
            imageSource: "",
            imageFile: null
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.showPreview = this.showPreview.bind(this);
    }

    handleClick() {
        const { currentUser } = this.props;
        this.setState({
            showEdit: !this.state.showEdit
        });
        this.setState({
            username: currentUser?.username!,
            about: currentUser?.about!,
            emailAddress: currentUser?.emailAddress!,
            // dateOfBirth: currentUser?.dateOfBirth!,
            password: currentUser?.password!,
            firstName: currentUser?.firstName!,
            lastName: currentUser?.lastName!
        })
    }

    handleChange(event: ChangeEvent<HTMLInputElement>): void {
        const { name, value } = event.target;
        this.setState({ ...this.state, [name]: value });
    }

    async handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const { username, firstName, lastName, dateOfBirth, password, emailAddress, about, imageLink, imageFile } = this.state;
        const { currentUser } = this.props;
        const formData = new FormData();
        formData.append('username', username);
        formData.append('firstName', firstName);
        formData.append('lastName', lastName);
        formData.append('dateOfBirth', dateOfBirth);
        formData.append('emailAddress', emailAddress);
        formData.append('password', password);
        formData.append('about', about);
        formData.append('imageLink', imageLink);
        formData.append('imageFile', imageFile);
        try {
          await editUser(currentUser?.userId!, formData);
          this.setState({
            showEdit: !this.state.showEdit
          })
        } catch (error) {
          if (error) {
            alert(error);
          } 
        }
    };

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

    render() {
        const { currentUser, communities } = this.props;
        const { showEdit, username, about, emailAddress, password, dateOfBirth, firstName, lastName } = this.state;
        return (
            <Card style={{ color: 'white', background: 'black', border: '.1rem solid white' }} key={"userId"}>
                <Card.Img style={{ height: '20rem', width: 'auto', objectFit: 'cover', position: 'relative' }} variant="top" src={currentUser?.imageSource ? currentUser.imageSource : "https://www.cooperhewitt.org/wp-content/uploads/2018/07/20914_472d45b4ae377c5f_b1.jpg"} /> 
                <Card.ImgOverlay >
                    <Pen onClick={this.handleClick} style={{ position: 'absolute', top: '10', right: '10', cursor: 'pointer' }} size={15}/>
                </Card.ImgOverlay>
                <Card.Body>
                    <Row xs={2}>
                        <Col xs={9}>
                            <Card.Link style={{ textDecoration: 'none', color: 'white' }} href={`profile/${currentUser?.userId}`}>
                                <Card.Title>{currentUser?.username}</Card.Title>
                                <Card.Subtitle>{currentUser?.firstName}</Card.Subtitle>
                                <hr></hr>
                                <Card.Text>{currentUser?.about}</Card.Text>
                                {communities.communities.length > 0 && <hr></hr>}
                                <>
                                {
                                communities.userCommunities?.map(({ communityId, communityName, description, imageSource }) => (
                                    <Row>
                                        <Col xs={3}>
                                            <Image src={imageSource}/>
                                        </Col>
                                        <Col>
                                            <Card.Text key={communityId}>{communityName}</Card.Text>
                                        </Col>
                                    </Row>
                                ))
                                }
                                </>
                            </Card.Link>
                        </Col>
                    </Row>
                    <Row style={{ marginBottom: '1rem' }} xs={2}>
                    </Row>
                </Card.Body>
                <Modal show={showEdit} onHide={this.handleClick}>
                    <Modal.Header closeButton></Modal.Header>
                    <Modal.Body>
                    <Form autoComplete="off" onSubmit={this.handleSubmit} style={{ marginTop: '1rem' }}>
                    <Row>
                        <Form.Group  className="col-6 mb-3" controlId="formUsername">
                            <Form.Control onChange={this.handleChange} name="username" value={username} as="input" type="input" placeholder="Username" />
                        </Form.Group>
                        <Form.Group className="col-6 mb-3" controlId="formemailAddress">
                            <Form.Control onChange={this.handleChange} name="emailAddress" value={emailAddress} as="input" type="emailAddress" placeholder="Email Address" />
                        </Form.Group>
                        <Form.Group className="col-6 mb-3" controlId="formFirstName">
                            <Form.Control onChange={this.handleChange} name="firstName" value={firstName} as="input" type="firstName" placeholder="First Name" />
                        </Form.Group>
                        <Form.Group className="col-6 mb-3" controlId="formLastName">
                            <Form.Control onChange={this.handleChange} name="lastName" value={lastName} as="input" type="lastName" placeholder="Last Name" />
                        </Form.Group>
                        <Form.Group className="col-6 mb-3" controlId="formPassword">
                            <Form.Control onChange={this.handleChange} name="password" value={password} as="input" type="password" placeholder="Password" />
                        </Form.Group>
                        <Form.Group className="col-6 mb-3" controlId="formDateOfBirth">
                            <Form.Control onChange={this.handleChange} name="dateOfBirth" value={dateOfBirth.toString()} type="date" placeholder="Date Of Birth" />
                        </Form.Group>
                        <Form.Group className="col-6 mb-3" controlId="formAbout">
                            <Form.Control onChange={this.handleChange} name="about" value={about} type="input" placeholder="About" />
                        </Form.Group>
                        <Form.Group className="col-12 mb-3" controlId="formMedia">
                            <Form.Control onChange={this.showPreview} name="medialink" as="input" accept="image/*" type="file" placeholder="Media" />
                        </Form.Group>
                        <div className="col-6 mb-3" style={{ justifyContent: 'center' }}>
                            <a className="col-12 mb-3 btn btn-dark" onClick={this.handleClick} >Cancel</a>
                        </div>
                        <div className="col-6 mb-3" style={{ justifyContent: 'center' }}>
                            <button className="col-12 mb-3 btn btn-dark" type="submit" >Update</button>
                        </div>
                    </Row>
                    </Form>
                    </Modal.Body>
                </Modal>
            </Card>
        );
    }
}