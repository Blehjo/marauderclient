import { ChangeEvent, Component } from "react";
import { Modal } from "react-bootstrap";

import { Community } from "../../store/community/community.types";
import { Gltf } from "../../store/gltf/gltf.types";
import { Post } from "../../store/post/post.types";
import { User } from "../../store/user/user.types";
import { CardList } from "./cardlist.component";
import { SearchBox } from "./searchbox.component";

type DefaultProps = {
    users: User[],
    posts: Post[],
    communities: Community[],
    gltfs: Gltf[]
    searchField: string,
    show: boolean
}

export class Searchbar extends Component<{}, DefaultProps> {
    constructor(props: {}) {
        super(props);

        this.state = {
            users: [],
            posts: [],
            communities: [],
            gltfs: [],
            searchField: '',
            show: false
        };
        this.handleClickEvent = this.handleClickEvent.bind(this);
    }

    componentDidMount(): void {
        fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/api/user`)
        .then(response => response.json())
        .then(users => this.setState({ users: users }));

        fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/api/post`)
        .then(response => response.json())
        .then(posts => this.setState({ posts: posts }));

        fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/api/community`)
        .then(response => response.json())
        .then(communities => this.setState({ communities: communities }));
        
        fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/api/gltfs`)
        .then(response => response.json())
        .then(gltfs => this.setState({ gltfs: gltfs }));
    }

    componentDidUpdate(prevProps: Readonly<{}>, prevState: Readonly<DefaultProps>, snapshot?: any): void {
        const { searchField } = this.state;
        if (prevState.searchField.length != this.state.searchField.length) {
            this.setState({
                show: true
            })
        }
    }

    onSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
        this.setState({ searchField: event.target.value });
    };

    handleClickEvent() {
        this.setState({ show: !this.state.show });
    }

    render() {
        const { users, posts, communities, gltfs, searchField, show } = this.state;
        const filteredUsers = users.length > 0 ? users.filter(user =>
            user.username?.toLowerCase().includes(searchField.toLowerCase())) : [];
        const filteredPosts = posts.length > 0 ? posts.filter(post =>
            post.postValue?.toLowerCase().includes(searchField.toLowerCase())) : [];
        const filteredCommunities = communities.length > 0 ? communities.filter(community =>
            community.communityName?.toLowerCase().includes(searchField.toLowerCase())) : [];
        const filteredGltfs = gltfs.length > 0 ? gltfs.filter(gltf =>
            gltf.fileInformation?.toLowerCase().includes(searchField.toLowerCase())) : [];
        return (
            <>
                <input style={{ borderRadius: ".5rem", width: "20rem", color: "white", background: "black", border: 'white solid 1px', textAlign: 'center', position: 'absolute', right: '38%', top: '25%' }} onClick={this.handleClickEvent} placeholder="Click here to search" />
                {<Modal className="deviceModal" show={show} onHide={this.handleClickEvent}>
                    <SearchBox onSearchChange={this.onSearchChange} />
                    {searchField.length > 0 && <CardList users={filteredUsers} posts={filteredPosts} communities={filteredCommunities} gltfs={filteredGltfs}/>}
                </Modal>}
            </>
        );
    }
}