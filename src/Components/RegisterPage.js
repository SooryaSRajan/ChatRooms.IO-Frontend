import React, {useState} from 'react';
import styled from 'styled-components'
import {Redirect} from "react-router";

const RegisterPageHolder = styled.div`
width: 100vw;
height: 100vh;
display: flex;
justify-content: center;
align-items: center;
`

const RegisterForm = styled.form`
width: 100%;
background-color: #6b6bd4;
padding: 20px;
border-radius: 20px;
box-sizing: border-box;

label{
color: white;
display: block;
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
&:hover{
cursor: pointer;
transform: scale(1.01, 1.01);
background-color: #6d4da0;

}
`

const ErrorLabel = styled.div`
float: right;
font-family: sans-serif;
font-size: 12px;
color: #de0000;
`


function RegisterPage(props) {

    const [error, setError] = useState('');
    const [name, setName] = useState('');
    const [room, setRoomValid] = useState(false);


    const HandleInput = (e) => {
        e.preventDefault();
        const value = e.currentTarget.value;


        setName(value)
        if (value.length < 4) setError('*name short')
        else setError('')
    }

    const HandleSubmit = (e) => {
        e.preventDefault();
        if (name.length >= 4) {
            setRoomValid(true)
        }
    }

    if (room) {
        console.log('redirecting')
        return <Redirect to={{
            pathname: 'room',
            state: {name: name}
        }}/>
    } else {
        return (
            <RegisterPageHolder>
                <div>
                    <div>
                        <h1>
                            Welcome to Chatrooms.io,
                        </h1>
                        <p>
                            Join any rooms or ask anyone to join yours
                            <br/>
                            Built with love, for introverts
                        </p>
                    </div>
                    <RegisterForm onSubmit={HandleSubmit}>
                        <ErrorLabel htmlFor="name">{error}</ErrorLabel>
                        <label htmlFor="name">Name</label>
                        <StyledInput type={'text'} name={'name'} onChange={HandleInput}
                                     placeholder={'Enter a name...'}/>

                        <StyledButton>
                            Register
                        </StyledButton>
                    </RegisterForm>
                </div>
            </RegisterPageHolder>
        );
    }


}

export default RegisterPage;
