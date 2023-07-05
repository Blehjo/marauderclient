import { Dispatch, FormEvent, ChangeEvent, Component } from 'react';
import { ConnectedProps, connect } from "react-redux";
import { Form, Row, Button } from 'react-bootstrap';


import { SignUpStart, signUpStart } from '../../store/user/user.action';
import { RootState } from '../../store/store';
import { SignUpContainer } from '../../styles/signup/signup.styles';

interface IDefaultFormFields {
  username: string;
  about: string;
  emailAddress: string;
  password: string;
  confirmPassword: string;
  dateOfBirth: string;
  firstName: string;
  lastName: string;
  imageLink: string;
  imageSource: string | ArrayBuffer | null | undefined;
  imageFile: any;
};

type SignUpProp = ConnectedProps<typeof connector>;

class SignUpForm extends Component<SignUpProp, IDefaultFormFields> {
  constructor(props: SignUpProp) {
    super(props);
    this.state = {
      username: "",
      about: "",
      emailAddress: "",
      password: "",
      confirmPassword: "",
      dateOfBirth: "",
      firstName: "",
      lastName: "",
      imageLink: "",
      imageSource: "",
      imageFile: null
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.showPreview = this.showPreview.bind(this);
  }

  async handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const { username, firstName, lastName, dateOfBirth, emailAddress, password, about, imageLink, confirmPassword, imageFile } = this.state;

    if (password !== confirmPassword) {
      alert('passwords do not match');
      return;
    }
    
    try {
      this.props.signUpStart(username, firstName, lastName, dateOfBirth, emailAddress, password, about, imageLink, imageFile);
    } catch (error) {
      if (error) {
        alert('Cannot create user, email already in use');
      } 
    }
  };

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

  render() {
    const { username, about, emailAddress, password, confirmPassword, dateOfBirth, firstName, lastName } = this.state;
    return (
      <SignUpContainer>
        <h2>Don't have an account?</h2>
        <span>Sign up with your username and password</span>
        <Form autoComplete="off" onSubmit={this.handleSubmit} style={{ marginTop: '1rem' }}>
          <Row>
            <Form.Group className="col-6 mb-3" controlId="formUsername">
                <Form.Control className="form-control" onChange={this.handleChange} name="username" value={username} as="input" type="input" placeholder="Username" />
            </Form.Group>
            <Form.Group className="col-6 mb-3" controlId="formemailAddress">
                <Form.Control className="form-control" onChange={this.handleChange} name="emailAddress" value={emailAddress} as="input" type="emailAddress" placeholder="Email Address" />
            </Form.Group>
            <Form.Group className="col-6 mb-3" controlId="formFirstName">
                <Form.Control className="form-control" onChange={this.handleChange} name="firstName" value={firstName} as="input" type="firstName" placeholder="First Name" />
            </Form.Group>
            <Form.Group className="col-6 mb-3" controlId="formLastName">
                <Form.Control className="form-control" onChange={this.handleChange} name="lastName" value={lastName} as="input" type="lastName" placeholder="Last Name" />
            </Form.Group>
            <Form.Group className="col-6 mb-3" controlId="formPassword">
                <Form.Control className="form-control" onChange={this.handleChange} name="password" value={password} as="input" type="password" placeholder="Password" />
            </Form.Group>
            <Form.Group className="col-6 mb-3" controlId="formConfirmPassword">
                <Form.Control className="form-control" onChange={this.handleChange} name="confirmPassword" value={confirmPassword} as="input" type="password" placeholder="Confirm Password" />
            </Form.Group>
            <Form.Group className="col-6 mb-3" controlId="formDateOfBirth">
                <Form.Control className="form-control" onChange={this.handleChange} name="dateOfBirth" value={dateOfBirth.toString()} type="date" placeholder="Date Of Birth" />
            </Form.Group>
            <Form.Group className="col-6 mb-3" controlId="formAbout">
                <Form.Control className="form-control" onChange={this.handleChange} name="about" value={about} type="input" placeholder="About" />
            </Form.Group>
            <Form.Group className="col-12 mb-3" controlId="formMedia">
                <Form.Control className="form-control" onChange={this.showPreview} name="medialink" as="input" accept="image/*" type="file" placeholder="Media" />
            </Form.Group>
            <div className="col-12 mb-3" style={{ justifyContent: 'center' }}>
                <button className="col-12 mb-3 btn btn-outline-light" type="submit" >Join</button>
            </div>
          </Row>
        </Form>
      </SignUpContainer>
    );
  }
};

const mapStateToProps = (state: RootState) => {
  return { user: state.user };
};

const mapDispatchToProps = (dispatch: Dispatch<SignUpStart>) => ({
  signUpStart: (username: string, firstName: string, lastName: string, dateOfBirth: string, emailAddress: string, password: string, about: string, imageLink: string, imageFile: File) => dispatch(signUpStart(
    username, firstName, lastName, dateOfBirth, emailAddress, password, about, imageLink, imageFile
  ))
});

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(SignUpForm);