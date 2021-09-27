import React from 'react';
import styled from 'styled-components'
import { FaArrowRight } from 'react-icons/fa';
import openSocket from "socket.io-client";
import { animateScroll } from "react-scroll";

const axios = require('axios').default;

const ChatRoomHolder = styled.div`
width: 100%;
height: ${props => props.height};
max-height: 100%;
display: flex;
justify-content: center;
align-items: center;
overflow-y: hidden;
`

const MainHolder = styled.div`
width: 100%;
height: 100%;
`

const MessageBottomBox = styled.form`
width: 100%;
height: 10%;
display: flex;
align-items: center;
justify-content: center;
margin-bottom: 10px;
`
const ChatListBox = styled.div`
overflow-y: scroll;
height: 90%;
width: 100%;
`

const ChatList = styled.ul`
width: 100%;
padding: 70px 0 0;
margin: 0;

`

const ChatListElement = styled.li`
width: 100%;
display: inline-block;
list-style-type: none;
`


const MessageBubbleLeft = styled.div`
overflow-x: hidden;
border-radius: 20px 20px 20px 0px;
color: white;
background-color: #2e2e4f;
width: fit-content; 
height: fit-content;
margin: 10px;
padding: 10px;
max-width: 50%;
word-wrap: break-word;
span{
font-weight: bold;
color: aqua;
}
`

const MessageBubbleCenter = styled.div`
color: white;
word-wrap: break-word;
text-align: center;
margin: 5px;
`

const MessageBubbleWrapper = styled.span`
background-color: rgba(0,0,0,0.5);
font-size: 14px;
padding: 5px 10px;
border-radius: 10px;
`

const MessageBubbleRight = styled.div`
overflow-x: hidden;
padding: 10px;
color: white;
margin: 10px;
float: right;
background-color: #5a5ab8;
border-radius: 20px 20px 0 20px;
width: fit-content; 
height: fit-content;
max-width: 50%;
word-wrap: break-word;
span{
font-weight: bold;
color: greenyellow;
}
`

const MessageTextBox = styled.input`
outline: none;
width: 90%;
height: 70%;
display: block;
background-color: #eee;
border-radius: 20px;
border: 3px solid #6b6bd4;
margin: 20px 5px;
padding: 20px;
box-sizing: border-box;
`

const MessageButton = styled.button`
padding: 15px;
display: flex;
align-items: center;
justify-content: center;
border: 0;
outline: none;
background-color: #6b6bd4;
color: white;
font-size: 3vh;
border-radius: 50%;
margin-right: 5px;
transition: all 0.5s ease-in-out;
&:hover{
cursor: pointer;
background-color: #4646bf;
}
`

let socket, id;

function ChatRoom(props) {


    function scrollToBottom() {
        animateScroll.scrollToBottom({
            containerId: "chat-container"
        });
    }

    React.useEffect(() => {
        window.addEventListener("resize", updateHeight);
        socket = openSocket('https://chatrooms-io.herokuapp.com');
        socket.on('connect', () => {
            socket.on('message', (name, position, message) => {
                AddData(name, position, message)
                scrollToBottom()
            })
            console.log('Socket connected')
            axios.post('https://chatrooms-io.herokuapp.com/generate_id', '')
                .then(res => {
                    if (props.location.state.data.id == null) {
                        id = res.data
                        socket.emit('join', id, props.location.state.data.name)
                        AddData('Lobby id: ' + id, 'center', '')
                        AddData('You joined', 'center', '')
                    } else {
                        socket.emit('join', props.location.state.data.id, props.location.state.data.name)
                        id = props.location.state.data.id
                        AddData('Lobby id: ' + id, 'center', '')
                        AddData('You joined', 'center', '')

                    }

                })
                .catch(function (error) {
                    console.log(error);
                });
        })


        return () => {
            socket.disconnect();
            window.removeEventListener("resize", updateHeight);
        }
    }, [props.location.state.data.id, props.location.state.data.name]);

    const updateHeight = () => {
        setHeight(window.innerHeight);
    };

    const [height, setHeight] = React.useState(window.innerHeight);
    const [message, setMessage] = React.useState([]);
    const [localMessage, setLocalMessage] = React.useState('');

    const SendMessage = (e) => {
        if (localMessage.length !== 0) {
            AddData(props.location.state.data.name, 'right', localMessage)
            socket.emit('message', props.location.state.data.name, 'left', localMessage, id)
            setLocalMessage('')
            scrollToBottom()
        }
    }
    const AddData = (name, type, message) => {
        let element = {
            name: name,
            type: type,
            message: message
        }
        setMessage(prevArray => [...prevArray, element])
    }

    const MessageBoxListener = (e) => {
        setLocalMessage(e.currentTarget.value)
    }

    return (
        <ChatRoomHolder height={height + "px"}>
            <MainHolder>
                <ChatListBox id='chat-container'>
                    <ChatList>
                        {message.map((item, index) => (
                            <ChatBubble type={item.type} message={item.message} name={item.name} key={index} />
                        ))}

                    </ChatList>
                    <div />
                </ChatListBox>

                <MessageBottomBox
                    onSubmit={(e) => {
                        e.preventDefault()
                        SendMessage()
                    }}>
                    <MessageTextBox placeholder={'Enter a message'} name={'message'} type={'text'}
                        onClick={null}
                        onChange={MessageBoxListener} value={localMessage} />
                    <MessageButton type="submit">
                        <FaArrowRight />
                    </MessageButton>
                </MessageBottomBox>
            </MainHolder>

        </ChatRoomHolder>
    )

}

function ChatBubble(props) {

    if (props.type === "right") {
        return (
            <ChatListElement>
                <MessageBubbleRight>
                    <span>
                        {props.name}
                    </span>
                    <br />
                    {props.message}
                </MessageBubbleRight>
            </ChatListElement>
        )
    } else if (props.type === 'center') {
        return (
            <ChatListElement>
                <MessageBubbleCenter>
                    <MessageBubbleWrapper>
                        {props.name}
                    </MessageBubbleWrapper>
                </MessageBubbleCenter>
            </ChatListElement>
        )
    } else {
        return (
            <ChatListElement>
                <MessageBubbleLeft>
                    <span>
                        {props.name}
                    </span>
                    <br />
                    {props.message}
                </MessageBubbleLeft>
            </ChatListElement>
        )
    }

}

export default ChatRoom;