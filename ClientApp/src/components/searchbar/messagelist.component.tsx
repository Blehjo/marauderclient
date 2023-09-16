import { Component } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { Globe, PersonBadge } from "react-bootstrap-icons";
import { MessageComment } from "../../store/messagecomment/messagecomment.types";
import { User } from "../../store/user/user.types";

interface ISearchProps {
    users: User[];
    messages: MessageComment[];
}

export class MessageList extends Component<ISearchProps> {
    constructor(props: ISearchProps) {
        super(props);
    }

    render() {
        const { users, messages } = this.props;
        return (
            <div style={{ background: 'black' }} className='card-list'>
                {users.length > 0 && <div style={{ margin: ".5rem", color: "white" }}>
                    Users
                </div>}
                {users.slice(0,5).map(user => (
                    <Card bg="dark" style={{ margin: ".2rem", position: "relative", color: 'white' }} key={user.userId} >
                        <Row xs={2}>
                            <Col xs={10}>
                                <Card.Body>{user.username}</Card.Body>
                            </Col>
                            <Col xs={2}>
                                <a href={`/profile/${user.userId}`} style={{ textDecoration: 'none', color: 'black', position: "absolute", margin: "0", top: "50%", transform: "translateY(-50%)", msTransform: "translateY(-50%)" }} className="btn btn-light">
                                    <PersonBadge size={15}/>
                                </a>
                            </Col>
                        </Row>
                    </Card>
                ))}
                {messages.length > 0 && <div style={{ margin: ".5rem", color: 'white' }}>
                    Messages
                </div>}
                {messages.slice(0,5).map(message => (
                    <Card bg="dark" style={{ margin: ".2rem", position: "relative", color: 'white' }} key={message.messageId} >
                        <Row xs={2}>
                            <Col xs={10}>
                                <Card.Body>{message.messageValue}</Card.Body>
                            </Col>
                            <Col xs={2}>
                                <a href={`/profile/${message.messageId}`} style={{ textDecoration: 'none', color: 'black', position: "absolute", margin: "0", top: "50%", transform: "translateY(-50%)", msTransform: "translateY(-50%)" }} className="btn btn-light">
                                    <Globe size={15}/>
                                </a>
                            </Col>
                        </Row>
                    </Card>
                ))}
            </div>
        )
    }
};