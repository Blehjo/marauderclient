import { Component } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { Globe, PersonBadge } from "react-bootstrap-icons";
import { MessageComment } from "../../store/messagecomment/messagecomment.types";
import { User } from "../../store/user/user.types";
import { SelectShape } from "../../styles/editor/editor.styles";

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
            <div style={{}} className='card-list'>
                {users.length > 0 && <div style={{ margin: ".5rem", color: "white" }}>
                    Users
                </div>}
                {users.slice(0,5).map(user => (
                    <SelectShape style={{ margin: "2rem", padding: '1rem', position: "relative", color: 'white', border: '1px white solid', borderRadius: '.5rem' }} key={user.userId} >
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
                    </SelectShape>
                ))}
                {messages.length > 0 && <div style={{ margin: ".5rem", color: 'white' }}>
                    Messages
                </div>}
                {messages.slice(0,5).map(message => (
                    <SelectShape style={{ margin: "2rem", padding: '1rem', position: "relative", color: 'white', border: '1px white solid', borderRadius: '.5rem' }} key={message.messageId} >
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
                    </SelectShape>
                ))}
            </div>
        )
    }
};