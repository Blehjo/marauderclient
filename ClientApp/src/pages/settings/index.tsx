import { Component } from "react";
import { ItemContainer, ListContainer, SettingsContainer } from "../../styles/settings/settings.styles";

class Settings extends Component {
    render() {
        return (
            <SettingsContainer>
                <ListContainer>
                <ItemContainer>Public Profile</ItemContainer>
                <ItemContainer>Account</ItemContainer>
                <ItemContainer>Appearance</ItemContainer>
                <ItemContainer>Notifications</ItemContainer>
                <ItemContainer>Emails</ItemContainer>
                <ItemContainer>Password and authentication</ItemContainer>
                <ItemContainer>Sessions</ItemContainer>
                <ItemContainer>Keys</ItemContainer>
                <hr></hr>
                <ItemContainer>Communities</ItemContainer>
                <ItemContainer>Devices</ItemContainer>
                <ItemContainer>Followers</ItemContainer>
                <ItemContainer>Posts</ItemContainer>
                <ItemContainer>Comments</ItemContainer>
                <ItemContainer>Favorites</ItemContainer>
                </ListContainer>
            </SettingsContainer>
        )
    }
}

export default Settings;