import { Component } from "react";
import { Socket, io } from "socket.io-client";
import Input from "../../components/input/input.component";
import MessagesComponent from "../../components/messages/messages.component";

interface IMessage {
    socket: Socket | null;
}

interface IProps {
    messages?: any[];
}

class Messages extends Component<IProps, IMessage> {
    constructor(props: any) {
        super(props);
        this.state = {
            socket: null
        }
    }
    

    connect() {
        // const { socket } = this.state;
        var url = 'wss://' + "localhost:7144/api/websocket";
        const socket = io('http://127.0.0.1:7890/echo');
        // this.setState({
            //     ...this.state, socket: io(url)
            // })
            
        socket.emit('open', function(event) {
            console.log('Connected to ' + url);
        });
        
        socket.emit('message', function(event) {
            console.log('Message from server: ' + event.data);
        });
        console.log("Socket: ", socket)
    }

    // sendMessage() {
    //     const { socket } = this.state
    //     var message = wsMessage.value;
    //     socket.emit(message);
    //     addLog('Message sent!');
    // }

    // addLog(log) {
    //     var logParagraph = document.createElement('p');
    //     logParagraph.innerText = log;
    //     logsContainer.appendChild(logParagraph);
    // }

    // componentDidMount() {
    //     const newSocket = io(`http://${window.location.hostname}:3000`);
    //     this.setState({
    //         socket: newSocket
    //     });
    //     return () => newSocket.close();
    // }

    render() {
        const { socket } = this.state;
        return (
            <div style={{ paddingTop: '10rem'}}>
                <header>React Chat</header>
                <button onClick={this.connect} >Connect</button>
                { socket ? (
                    <div className="chat-container">
                        <MessagesComponent placeholder={"Type in Message"} socket={socket} />
                        <Input placeholder={"Type in Message"} socket={socket} />
                    </div>
                    ) : (
                        <div>Not Connected</div>
                )}
            </div>
        );
    }
}

export default Messages;