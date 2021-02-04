import React,{createContext,useEffect,useReducer,useContext} from 'react';
import Navbar from './components/navbar';
import './App.css'
import {BrowserRouter as Router , Route, Switch,useHistory} from 'react-router-dom'
import Home from './components/screens/Home';
import Login from './components/screens/Login';
import Profile from './components/screens/Profile';
import UserProfile from './components/screens/UserProfile';
import Signup from './components/screens/Signup';
import CreatePost from './components/screens/CreatePost';
import {reducer,initialState} from './reducers/userReducer'
import SubscriptionPosts from './components/screens/SubscriptionPosts';
import Reset from './components/screens/Reset';
import NewPassword from './components/screens/NewPassword';

export const UserContext = createContext()

const Routing = () => {


  const history = useHistory()
  const {state,dispatch} = useContext(UserContext)
  useEffect(() => {

    const user = JSON.parse(localStorage.getItem("user"))
    
    
    if(user){
      dispatch({type:"USER",payload:user})
      // history.push("/")
      
    }
  
    
  }, [])

  return (<Switch>
            <Route path="/" exact >
                <Home /> 
              </Route>
              <Route path="/login"  >
                <Login /> 
              </Route>
              <Route path="/signup">
                <Signup /> 
              </Route>
              <Route path="/profile" exact>
                <Profile /> 
              </Route>
              <Route path="/create">
                <CreatePost />
              </Route>
              <Route path="/profile/:userid">
                <UserProfile />
              </Route>
              <Route path="/reset" exact>
                <Reset />
              </Route>
              <Route path="/followingPosts">
                <SubscriptionPosts />
              </Route>
              <Route path="/reset/:token">
                <NewPassword />
              </Route>
          </Switch>
  )
}

function App() {
  const [state,dispatch] = useReducer(reducer,initialState)
  return (
    <UserContext.Provider value={{state,dispatch}}>

    
    <Router>
      <Navbar />
      <Routing />
    </Router>
    </UserContext.Provider>
    
   

  );
}

export default App;
