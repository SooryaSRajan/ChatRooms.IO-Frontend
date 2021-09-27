import React from 'react';
import styled from 'styled-components'
import { Link } from "react-router-dom";
import { FaHome } from 'react-icons/fa';

const NavigationBar = styled.div`
display: flex;
position: fixed;
top: 0;
z-index: 100;
align-items: center;
justify-content: space-between;
width: 100vw;
background-color: #6b6bd4;

h3{
color: white;
margin-left: 30px;
}
`
const NavigationButtons = styled(Link)`
text-decoration: none;
color: white;
display: flex;
align-items: center;
justify-content: center;
transition: all 0.3s ease-in-out;
&:hover{
color: #dfb2ff;
transform: scale(1.1, 1.1);
}
`

function NavBar() {
    return (
        <NavigationBar>
            <NavigationButtons
                to={'register'}>
                <h3>
                    Chatrooms.io
                </h3>
            </NavigationButtons>
        </NavigationBar>
    );
}

export default NavBar;
