import React, {useState} from 'react';
import styled from 'styled-components'
import {Redirect} from "react-router";

const JoinRoomPageHolder = styled.div`
width: 100vw;
height: 100vh;
display: flex;
justify-content: center;
align-items: center;
`


const RegisterForm = styled.form`
width: 80%;
background-color: #6b6bd4;
padding: 20px;
border-radius: 20px;
box-sizing: border-box;

h1{
color: white;
}

label{
color: white;
display: block;
}
`

const StyledButton = styled.button`
outline: none;
width: 100%;
border: none;
background-color: #9d6fe7;
border-radius: 5px;
color: white;
padding: 15px;
font-weight: 600;
box-sizing: border-box;
transition: transform 0.3s ease-in-out, background-color 0.3s ease-in-out;
margin-bottom: 5px;
margin-top: 5px;
&:hover{
cursor: pointer;
transform: scale(1.01, 1.01);
background-color: #6d4da0;
}
`

const StyledInput = styled.input`
outline: none;
display: block;
background-color: #eee;
height: 40px;
border-radius: 5px;
border: 1px solid #ccc;
margin: 10px 0 20px 0;
padding: 20px;
width: 100%;
box-sizing: border-box;
`

const ErrorLabel = styled.div`
float: right;
font-family: sans-serif;
font-size: 12px;
color: #de0000;
margin-bottom: 10px;
`
const StyledFieldset = styled.fieldset`
color: white;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 10px;
  margin: 20px 0;
  legend {
    padding: 0 10px;
  }
  label {
    padding-right: 20px;
  } 
  input {
    margin-right: 10px;
  }
`;

function Rooms(props) {

    const HandleSubmit = (e) => {
        e.preventDefault();
        if (type === 'self') {
            const data = {
                'name': props.location.state.name
            }
            setRoomData(data)
        } else if (type === 'other') {
            if (id.length !== 5) setError('*please enter a valid room id')
            else {
                const data = {
                    'id': id,
                    'name': props.location.state.name
                }
                setRoomData(data)
                setError('')
            }
        }
    }

    const HandleClick = (e) => {
        const value = e.currentTarget.value;
        setType(value)
    }

    const HandleInput = (e) => {
        e.preventDefault();
        const value = e.currentTarget.value;
        setId(value)

    }

    const [error, setError] = useState('');
    const [id, setId] = useState('');
    const [roomData, setRoomData] = useState(null);
    const [type, setType] = useState('');

    if (!roomData)
        return (


            <JoinRoomPageHolder onSubmit={HandleSubmit}>
                <RegisterForm>
                    <h1>
                        Join a Room
                    </h1>

                    <StyledButton value={"self"} onClick={HandleClick}>
                        Generate a Room
                    </StyledButton>
                    <StyledFieldset>
                        <legend>Join/Create a room</legend>
                        <ErrorLabel>
                            {error}
                        </ErrorLabel>
                        <StyledInput type={'name'} name={'room_id'} onChange={HandleInput}
                                     autocomplete="none"
                                     placeholder={'Enter a room id...'}/>
                        <StyledButton value={"other"} onClick={HandleClick}>
                            Join / Create
                        </StyledButton>

                    </StyledFieldset>
                </RegisterForm>
            </JoinRoomPageHolder>
        );
    else {
        console.log('Redirecting ')
        return (
            <Redirect to={{
                pathname: "chats",
                state: {data: roomData}
            }}/>
        )
    }
}

export default Rooms;
