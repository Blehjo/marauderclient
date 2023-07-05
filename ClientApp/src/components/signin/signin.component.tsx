import { Dispatch, FormEvent, ChangeEvent, Component } from 'react';
import { ConnectedProps, connect } from "react-redux";
import { Form, Row, Button } from 'react-bootstrap';

import { SignInContainer } from '../../styles/signin/signin.styles';
import { EmailSignInStart, SignUpStart, emailSignInStart, signUpStart } from '../../store/user/user.action';
import { RootState } from '../../store/store';

interface IDefaultFormFields  {
  username: string;
  password: string;
};

type SignInProp = ConnectedProps<typeof connector>;

class SignInForm extends Component<SignInProp, IDefaultFormFields> {
  constructor (props: SignInProp) {
    super(props);
    this.state = {
      username: '',
      password: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  async handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const { username, password } = this.state;
    try {
      this.props.signInStart(username, password);
    } catch (error) {
      if (error) {
        alert('Email or Password is incorrect');
      }
    }
  }

  handleChange(event: ChangeEvent<HTMLInputElement>): void {
    const { name, value } = event.target;

    this.setState({ ...this.state, [name]: value});
  }

  render() {
    const { username, password } = this.state;
    return (
      <SignInContainer>
        <h2>Already Signed Up?</h2>
        <span>Sign in with your username and password</span>
        <Form onSubmit={this.handleSubmit} style={{ marginTop: '1rem' }}>
          <Row>
          <Form.Group className="mb-3" controlId="formBasicUsername">
              <Form.Control
                className="form-control"
                type="username"
                name="username"
                required
                placeholder="Username"
                value={username}
                onChange={this.handleChange}
              />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control
                className="form-control"
                type="password"
                placeholder="Password"
                required
                onChange={this.handleChange}
                name="password"
                value={password}
              />
          </Form.Group>
          <div className="col-12 mb-3" style={{ justifyContent: 'center' }}>
            <button className="col-12 mb-3 btn btn-outline-light" type="submit">Sign In</button>
          </div>
          </Row>
        </Form>
      </SignInContainer>
    );
  }
};

const mapStateToProps = (state: RootState) => {
  return { user: state.user };
};

const mapDispatchToProps = (dispatch: Dispatch<EmailSignInStart>) => ({
  signInStart: (username: string, password: string) => dispatch(emailSignInStart(username, password))
});

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(SignInForm);