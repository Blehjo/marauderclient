import { Component } from "react";
import { Col, Row } from "react-bootstrap";

import { AuthenticationContainer } from "../../styles/authentication/authentication.styles";
import { SignInContainer } from "../../styles/signin/signin.styles";
import SignInForm from "../../components/signin/signin.component";
import SignUpForm from "../../components/signup/signup.component";


interface IToggle {
    signIn: boolean;
    name: string;
}

class Authentication extends Component<{}, IToggle> {
    constructor(props: {}) {
        super(props);
        this.toggleSignIn = this.toggleSignIn.bind(this);
    }

    state = {
        signIn: true,
        name: "Make An Account"
    }

    toggleSignIn() {
        this.setState({
            signIn: !this.state.signIn,
            name: this.state.name == "Make An Account" ? "Have An Account?" : "Make An Account"
        })
    }
    
    render() {
        const { signIn, name } = this.state;
        return (
            <AuthenticationContainer>
                <Row xs={1}>
                    <Col xs={12}>
                        {signIn ? <SignInForm/>
                        : <SignUpForm/>}
                        <div className="d-grid mt-3">
                            <SignInContainer>
                                <button className="btn btn-outline-light btn-lg" type="button" onClick={this.toggleSignIn}>{name}</button>
                            </SignInContainer>
                        </div>
                    </Col>
                </Row>
            </AuthenticationContainer>
        );
    }
}

export default Authentication;