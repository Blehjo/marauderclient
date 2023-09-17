import { styled } from "styled-components";

export const MessageContainer = styled.div`
    padding-top: 5rem;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    position: relative;
`;  

export const ListContainer = styled.div`
    position: absolute;
    top: 5rem;
    left: 5%;
    height: 85vh;
    width: 25%;
    overflow-y: auto;
    padding: 1rem;
    border: solid 1px white;
    border-radius: 1rem;
    background: black;
`;

export const MessageForm = styled.div`
    padding: 1rem;
    position: absolute;
    top: 5rem;
    left: 35%;
    border: solid 1px white;
    width: 60%;
    height: 85vh;
    border-radius: 1rem;
    .form-control {
        background-color: black; 
        color: white;
    }
`;

export const InputContainer = styled.div`
    position: absolute;
    bottom: 0rem;
    width: 100%;
`;

export const TextCommentContainer = styled.div`
    border-radius: .3rem;
    padding: .2rem;
    margin: .5rem;
    width: 100%;
    text-align: left;
    color: white;
`;

export const TextContainer = styled.div`
    border-radius: .3rem;
    padding: .2rem;
    color: white;
    margin: .5rem;
    width: 90%;
    text-align: left;
    z-index: 20;
`;

export const UserTextContainer = styled.div`
    border: solid 1px blue;
    border-radius: .3rem;
    padding: .2rem;
    margin: .5rem;
    width: 100%;
    text-align: right;
    z-index: 20;
`;

export const ChatContainer = styled.div`
    position: absolute;
    top: 10%;
`;

export const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    position: absolute;
    width: 100%;
    text-align: start;
    left: 0%;
    overflow-y: auto;
`;

export const CommentBarContainer = styled.div`
    z-index: 1;
    @media (min-width: 900px) {
        position: fixed;
        top: 0;
        right: 0;
        height: 100vh; 
        width: 18rem; 
        background: black;
        text-align: center;
        color: white;
        margin-top: 3.5rem;
        float: right;
        overflow-y: auto;
    }

    @media (max-width: 899px) {
        position: fixed;
        background: black;
        text-align: center;
        bottom: 0;
        left: 0;
        width: 100%;
        margin-left: 16rem;
        padding-right: 16rem;
        height: 50vh;
        z-index: 5;
        overflow-y: auto;

    }
    @media (max-width: 717px) {
        position: fixed;
        background: black;
        text-align: center;
        bottom: 0;
        left: 0;
        width: 100%;
        margin-left: 4rem;
        padding-right: 4rem;
        padding-bottom: 8rem;
        height: 50vh;
        overflow-y: auto;
        z-index: 5;
    }
    @media (max-width: 500px) {
        height: 40%;
    }
`;

export const FormContainer = styled.div`
    @media (min-width: 900px) {
        position: fixed;
        bottom: 2rem;
        right: 0;
        width: 18rem; 
        background: black;
        text-align: center;
        color: white;
        margin-top: 3.5rem;
        float: right;
    }
    
    @media (max-width: 899px) {
        position: fixed;
        bottom: 0;
        left: 16rem;
        padding-right: 16rem;
        width: 100%;
        background: black;
        z-index: 5;
    }

    @media (max-width: 717px) {
        position: fixed;
        background: black;
        text-align: center;
        bottom: 0;
        left: 0;
        width: 100%;
        margin-left: 4rem;
        padding-right: 4rem;
        height: 15%;
        z-index: 5;
        .notifications {
            display: none;
        }
        .modalicons {
            margin-top: 1rem;
        }
        .modalIcon {
            font-size: 55px;
        }
    }
    
    @media (max-width: 500px) {
        position: fixed;
        bottom: 0;
    }
`;

export const CardContainer = styled.div`
    margin: 1rem;
    border-style: solid;
    border-radius: .5rem;
    border-color: white;
    padding: .2rem;
`;

export const CommentContainer = styled.div`
    overflow-y: auto;
    .modalIcon {
        font-size: 55px;
    }

    @media (min-width: 900px) {
        position: fixed;
        top: 0;
        right: 0;
        height: 70%; 
        width: 18rem; 
        background: black;
        text-align: center;
        color: white;
        margin-top: 3.5rem;
        float: right;
        z-index: 2;
    }

    @media (max-width: 899px) {
        position: fixed;
        background: black;
        text-align: center;
        bottom: 0;
        left: 0;
        width: 100%;
        margin-left: 16rem;
        padding-right: 16rem;
        height: 50%;
        z-index: 5;
        overflow-y: auto;
        .notifications {
            display: none;
        }
        .modalicons {
            margin-top: 1rem;
        }
        .modalIcon {
            font-size: 55px;
        }
    }
    @media (max-width: 717px) {
        position: fixed;
        background: black;
        text-align: center;
        bottom: 0;
        left: 0;
        width: 100%;
        margin-left: 4rem;
        padding-right: 4rem;
        padding-bottom: 8rem;
        height: 50vh;
        overflow-y: auto;
        z-index: 5;
        .notifications {
            display: none;
        }
        .modalicons {
            margin-top: 1rem;
        }
        .modalIcon {
            font-size: 55px;
        }
    }
    @media (max-width: 500px) {
        height: 40%;
    }
`;

export const SingleChatContainer = styled.div`
  display: flex;
  margin: 5rem 21rem 3rem 3rem;
  flex-direction: column;
  @media (max-width: 900px) {
    margin: 4rem 3rem 0rem 3rem;
    position: fixed;
    top: 0rem;
  }
`;

export const SinglePostContainer = styled.div`
  display: flex;
  margin: 5rem 21rem 3rem 3rem;
  flex-direction: column;
  @media (max-width: 900px) {
    margin: 4rem 3rem 0rem 3rem;
    position: fixed;
    top: 0rem;
  }
`;