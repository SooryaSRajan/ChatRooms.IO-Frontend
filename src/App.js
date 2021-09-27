import React from 'react';
import NavigationBar from "./Components/NavigationBar";
import {Redirect, Route, Switch} from "react-router";
import RegisterPage from "./Components/RegisterPage";
import Rooms from "./Components/JoinRoomPage";
import ChatRoom from "./Components/ChatRoom";

function App() {
    return (
        <div>
            <Redirect exact to={'register'}/>
            <NavigationBar/>
            <Switch>
                <Route path="/register" render={routeProps => <RegisterPage
                    {...routeProps}
                />
                }/>
                <Route path="/room" render={routeProps => <Rooms
                    {...routeProps}
                />
                }/>
                <Route path="/chats" render={routeProps => <ChatRoom
                    {...routeProps}
                />}
                />
            </Switch>
        </div>
    );
}

export default App;
