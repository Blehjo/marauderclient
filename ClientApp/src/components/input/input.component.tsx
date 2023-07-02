import { ChangeEvent, Component, FormEvent } from 'react';
import { Socket } from 'socket.io-client';

type InputProps = {
    socket: Socket;
    placeholder: string;
}

class Input extends Component<InputProps> {
    state = {
        value: ""
    }

    submitForm(event: FormEvent<HTMLFormElement>) {
        const { value } = this.state;
        const { socket } = this.props;
        event.preventDefault();
        socket.emit('message', value);
    }

    handleChange(event: ChangeEvent<HTMLInputElement>) {
        event.preventDefault();
        const { name, value } = event.target;
        this.setState({ ...this.state, [name]: value });
    }

    render() {
        const { value } = this.state;
        const { placeholder } = this.props;
        return (
            <form onSubmit={this.submitForm}>
                <input
                    autoFocus
                    value={value}
                    placeholder={placeholder}
                    onChange={this.handleChange}
                />
            </form>
        );
    }
};

export default Input;