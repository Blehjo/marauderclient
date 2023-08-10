import { ChangeEvent, Component } from "react";
import { Modal } from "react-bootstrap";

import { User } from "../../store/user/user.types";
import { Post } from "../../store/post/post.types";
import { Community } from "../../store/community/community.types";
import { Gltf } from "../../store/gltf/gltf.types";
import { SearchBox } from "./searchbox.component";
import { CardList } from "./cardlist.component";

type DefaultProps = {
    users: User[],
    posts: Post[],
    communities: Community[],
    gltfs: Gltf[]
    searchField: string,
    show: boolean
}
export class Searchbar extends Component<{}, DefaultProps> {
    constructor(props: DefaultProps) {
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
        fetch('https://localhost:7144/api/user')
        .then(response => response.json())
        .then(users => this.setState({ users: users }));

        fetch('https://localhost:7144/api/post')
        .then(response => response.json())
        .then(posts => this.setState({ posts: posts }));

        fetch('https://localhost:7144/api/community')
        .then(response => response.json())
        .then(communities => this.setState({ communities: communities }));
        
        fetch('https://localhost:7144/api/gltfs')
        .then(response => response.json())
        .then(gltfs => this.setState({ gltfs: gltfs }));
    }

    onSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
        this.setState({ searchField: event.target.value });
    };

    handleClickEvent() {
        this.setState({ show: !this.state.show });
    }

    render() {
    const { users, posts, communities, gltfs, searchField, show } = this.state;
    const filteredUsers = users.filter(user =>
        user.username?.toLowerCase().includes(searchField.toLowerCase()));
    const filteredPosts = posts.filter(post =>
        post.postValue?.toLowerCase().includes(searchField.toLowerCase()));
    const filteredCommunities = communities.filter(community =>
        community.communityName?.toLowerCase().includes(searchField.toLowerCase()));
    const filteredGltfs = gltfs.filter(gltf =>
        gltf.fileInformation?.toLowerCase().includes(searchField.toLowerCase()));
        return (
            <>
                <input style={{ borderRadius: ".5rem", width: "20rem" }} onClick={this.handleClickEvent} placeholder="Search" />
                <Modal show={show} onHide={this.handleClickEvent}>
                    <SearchBox onSearchChange={this.onSearchChange} />
                    {searchField.length > 0 && <CardList users={filteredUsers} posts={filteredPosts} communities={filteredCommunities} gltfs={filteredGltfs}/>}
                </Modal>
            </>
        );
    }
}