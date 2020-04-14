import React from 'react';
import './App.css';
import AppToolbar from "./components/UI/Toolbar/Toolbar";
import {Route,Switch,Redirect} from "react-router-dom";
import Register from "./container/Register/Register";
import Login from "./container/Login/Login";
import './index.css'
import NewPost from "./components/NewPost/NewPost";
import Main from "./container/Main/Main";
import UserProfile from "./container/UserProfile/UserProfile";
import {useSelector} from "react-redux";



const ProtectedRoute = ({isAllowed, ...props}) => (
    isAllowed ? <Route {...props}/> : <Redirect to="/login"/>
);
function App() {
    const user = useSelector(state => state.users.user);
  return (
      <div>
        <AppToolbar/>
        <Switch>
            <ProtectedRoute isAllowed={user} path="/" exact component={Main}/>
            <Route path="/register" exact component={Register} />
            <Route path="/login" exact component={Login} />
            <ProtectedRoute isAllowed={user}path="/new_post" exact component={NewPost} />
            <ProtectedRoute isAllowed={user} path="/profile" component={UserProfile}/>
        </Switch>
      </div>
  );
}

export default App;
