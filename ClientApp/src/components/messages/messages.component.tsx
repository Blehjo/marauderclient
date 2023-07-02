import { Component } from 'react';
import { Socket } from 'socket.io-client';
import { User } from '../../store/user/user.types';

type InputProps = {
    socket: Socket,
    placeholder: string
}

type MessageParameters = {
    id: number,
    time: Date,
    user: User,
    value: string
}

class MessagesComponent extends Component<InputProps> {
    state = {
        messages: []
    }

    compenentDidMount() {
        const { socket } = this.props;
        const messageListener = (message) => {
            // setMessages((prevMessages) => {
            //     const newMessages = {...prevMessages};
            //     newMessages[message.id] = message;
            //     return newMessages;
            // });
        };
        
        const deleteMessageListener = (messageID) => {
            // setMessages((prevMessages) => {
            //     const newMessages = {...prevMessages};
            //     delete newMessages[messageID];
            //     return newMessages;
            // });
        };
        
        socket.on('message', messageListener);
        socket.on('deleteMessage', deleteMessageListener);
        socket.emit('getMessages');

        return () => {
            socket.off('message', messageListener);
            socket.off('deleteMessage', deleteMessageListener);
        };
    }

    componentDidUpdate(prevProps: Readonly<InputProps>, prevState: Readonly<{}>, snapshot?: any): void {
        if (this.props.socket != prevProps.socket) {

        }
    }

    render() {
        const { messages } = this.state;
        return (
            <div className="message-list">
                {[...Object.values(messages)]
                    .sort((a, b) => a.time - b.time)
                    .map((message) => (
                        <div
                        key={message.id}
                        className="message-container"
                        title={`Sent at ${new Date(message.time).toLocaleTimeString()}`}
                        >
                        <span className="user">{message.user.name}:</span>
                        <span className="message">{message.value}</span>
                        <span className="date">{new Date(message.time).toLocaleTimeString()}</span>
                    </div>
                    ))
                }
            </div>
        );
    }
}

export default MessagesComponent;