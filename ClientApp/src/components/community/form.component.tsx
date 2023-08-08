import { ChangeEvent, Component, FormEvent, ReactNode } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { Send } from "react-bootstrap-icons";
import { ChannelComment } from "../../store/channelcomment/channelcomment.types";
import { ChatForm, Container } from "../../styles/crew/crew.styles";
import { InputContainer, TextContainer, UserTextContainer } from "../../styles/messages/messages.styles";
import { HubConnectionBuilder } from "@microsoft/signalr";

interface IFormChannel {
    socket: boolean;
    commentValue: string;
    messages: Array<ReactNode>;
    imageSource: string | ArrayBuffer | null | undefined;
    imageFile: any;
    connection: any;
}

export class FormChannel extends Component<any, IFormChannel> {
    constructor(props: any) {
        super(props);
        this.state = {
            socket: false,
            commentValue: "",
            imageSource: "",
            messages: [],
            imageFile: null,
            connection: null
        }
        this.handleChange = this.handleChange.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.showPreview = this.showPreview.bind(this);
    }

    commentFunction(prop: ChannelComment) {
        const { user } = this.props;
        const { channelCommentId, commentValue, mediaLink, type, imageSource, userId } = prop;
        if (user?.userId == userId) {
            return (
                <UserTextContainer style={{ position: 'relative' }} key={channelCommentId}>
                    {commentValue}
                </UserTextContainer>
            )
        } else {
            return (
                <TextContainer style={{ position: 'relative' }} key={channelCommentId}>
                    {commentValue}
                </TextContainer>
            )
        }
    }

    handleChange(event: ChangeEvent<HTMLInputElement>): void {
        const { name, value } = event.target;
        this.setState({ ...this.state, [name]: value });
    }

    handleChannelComments(comment?: ReactNode): Array<ReactNode> {
        const content: Array<ReactNode> = [];
        const { channelcomments } = this.props;
        for (let i = 0; i < channelcomments.comments?.length; i++) {
            content.push(this.commentFunction(channelcomments.comments[i]));
        }
        if (comment != undefined) {
            content.push(comment);
        }
        return content;
    }

    handleComment(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const { commentValue, imageFile } = this.state;
        this.props.createChannelComment(commentValue, this.props.channels.channelId!, imageFile);
        this.state.connection.send("newMessage", "foo", commentValue);
        this.state.connection.on('messageReceived', (comment: any) => {
            this.props.setChannelCommentId(comment.channelCommentId);
        })
        this.setState({
            ...this.state, commentValue: ""
        })
    }

    sendMessage(event: FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        this.handleComment(event);
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

    componentDidMount(): void {
        if (this.props.channels.channelId != null) {
            this.props.getComments(this.props.channels.channelId);
        } 
    }

    componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<IFormChannel>, snapshot?: any): void {
        if (prevProps.channels.channelId != this.props.channels.channelId) {
            this.setState({
                connection: new HubConnectionBuilder()
                .withUrl(`https://localhost:7144/hub/community/${this.props.channels.channelId}`)
                .withAutomaticReconnect()
                .build()
            }, () => {
                this.state.connection.start().catch((err: string) => document.write(err));
            });
        }

        if (prevProps.channelcomments.channelCommentId != this.props.channelcomments.channelCommentId) {
            this.state.connection.on('messageReceived', (comment: any) => {
                this.props.getComments(this.props.channels.channelId!)
            });
        }
    }

    // componentWillUnmount(): void {
    //     this.state.connection.stop();
    // }

    render() {
        const { commentValue } = this.state;
        return (
            <ChatForm>
                <Form onSubmit={this.sendMessage}>
                    <Container style={{ height: '75%', overflow: 'auto' }}>
                        {
                            this.handleChannelComments()
                        }
                    </Container>
                    <InputContainer>
                    <Row xs={2}>
                        <Col xs={10}>
                        <Form.Group className="mb-3" controlId="request">
                            <Form.Control style={{ height: '.5rem' }} as="textarea" onChange={this.handleChange} value={commentValue} name="commentValue" placeholder="Write a message" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formMedia">
                            <Form.Control onChange={this.showPreview} name="mediaLink" as="input" accept="image/*" type="file" placeholder="Media" />
                        </Form.Group>
                        </Col>
                        <Col xs={2}>
                        <button className="btn btn-outline-light"><Send/></button>
                        </Col>
                    </Row>
                    </InputContainer>
                </Form>
            </ChatForm>
        )
    }
}