import { Component } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { Collection, Files, People, PersonBadge } from "react-bootstrap-icons";
import { Community } from "../../store/community/community.types";
import { Gltf } from "../../store/gltf/gltf.types";
import { Post } from "../../store/post/post.types";
import { User } from "../../store/user/user.types";
import { SelectShape } from "../../styles/editor/editor.styles";

interface ISearchProps {
    users: User[];
    posts: Post[];
    communities: Community[];
    gltfs: Gltf[];
}

export class CardList extends Component<ISearchProps> {
    constructor(props: ISearchProps) {
        super(props);
    }

    render() {
        const { users, communities, posts, gltfs } = this.props;
        return (
            <div >
                {users.length > 0 && <div style={{ margin: ".5rem", color: "white" }}>
                    Users
                </div>}
                {users.slice(0,5).map(user => (
                    <SelectShape style={{ margin: "0rem 2rem 1rem 2rem", padding: '1rem', position: "relative", color: 'white', border: '1px white solid', borderRadius: '.5rem' }} key={user.userId} >
                        <Row xs={2}>
                            <Col xs={10}>
                                <Card.Body style={{ color: "white"}} >{user.username}</Card.Body>
                            </Col>
                            <Col xs={2}>
                                <a href={`/profile/${user.userId}`} style={{ textDecoration: 'none', color: 'black', position: "absolute", margin: "0", top: "50%", transform: "translateY(-50%)", msTransform: "translateY(-50%)" }} className="btn btn-light">
                                    <PersonBadge size={15}/>
                                </a>
                            </Col>
                        </Row>
                    </SelectShape>
                ))}
                {communities.length > 0 && <div style={{ margin: ".5rem", color: "white" }}>
                    Communities
                </div>}
                {communities.slice(0,5).map(community => (
                    <SelectShape style={{ margin: "0rem 2rem 1rem 2rem", padding: '1rem', position: "relative", color: 'white', border: '1px white solid', borderRadius: '.5rem' }} key={community.communityId} >
                        <Row xs={2}>
                            <Col xs={10}>
                                <Card.Body style={{ color: "white"}}>{community.communityName}</Card.Body>
                            </Col>
                            <Col xs={2}>
                                <a href={`/communities/${community.communityId}`} style={{ textDecoration: 'none', color: 'black', position: "absolute", margin: "0", top: "50%", transform: "translateY(-50%)", msTransform: "translateY(-50%)" }} className="btn btn-light">
                                    <People size={15}/>
                                </a>
                            </Col>
                        </Row>
                    </SelectShape>
                ))}
                {posts.length > 0 && <div style={{ margin: ".5rem", color: "white" }}>
                    Posts
                </div>}
                {posts.slice(0,5).map(post => (
                    <SelectShape style={{ margin: "0rem 2rem 1rem 2rem", padding: '1rem', position: "relative", color: 'white', border: '1px white solid', borderRadius: '.5rem' }} key={post.postId} >
                        <Row xs={2}>
                            <Col xs={10}>
                                <Card.Body style={{ color: "white"}}>{post.postValue}</Card.Body>
                            </Col>
                            <Col xs={2}>
                                <a href={`/posts/${post.postId}`} style={{ textDecoration: 'none', color: 'black', position: "absolute", margin: "0", top: "50%", transform: "translateY(-50%)", msTransform: "translateY(-50%)" }} className="btn btn-light">
                                    <Collection size={15}/>
                                </a>
                            </Col>
                        </Row>
                    </SelectShape>
                ))}
                {gltfs.length > 0 && <div style={{ margin: ".5rem", color: "white" }}>
                    Files
                </div>}
                {gltfs.slice(0,5).map(gltf => (
                    <SelectShape style={{ margin: "0rem 2rem 1rem 2rem", padding: '1rem', position: "relative", color: 'white', border: '1px white solid', borderRadius: '.5rem' }} key={gltf.gltfId} >
                        <Row xs={2}>
                            <Col xs={10}>
                                <Card.Body style={{ color: "white"}}>{gltf.fileInformation}</Card.Body>
                            </Col>
                            <Col xs={2}>
                                <a href={`/gltfs/${gltf.gltfId}`} style={{ textDecoration: 'none', color: 'black', position: "absolute", margin: "0", top: "50%", transform: "translateY(-50%)", msTransform: "translateY(-50%)" }} className="btn btn-light">
                                    <Files size={15}/>
                                </a>
                            </Col>
                        </Row>
                    </SelectShape>
                ))}
            </div>
        )
    }
};