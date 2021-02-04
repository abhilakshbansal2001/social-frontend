import React, {useContext} from 'react'
import { Link,useHistory } from 'react-router-dom'
import {UserContext} from '../App'
function Navbar() {

    const {state,dispatch} = useContext(UserContext)
    const history = useHistory()
    const renderList  = ()=>{
        if(state){
            return [
                <li><Link to="/">Home</Link></li>,
                <li><Link to="/profile">Profile</Link></li>,
                <li><Link to="/create">Post</Link></li>,
                <li><Link to="/followingPosts">My Following Posts</Link></li>,
                <li>
                    <button className="btn waves-effect #c62828 red darken-2  waves-dark" onClick={() => {
                        localStorage.clear();
                        dispatch({type:"CLEAR"})
                        history.replace("/login")
                    }} >
                        Logout
                    </button>
                </li>
            ]
        }
        else{
            return[
                <li><Link to="/login">Login</Link></li>,
                    <li><Link to="/signup">Signup</Link></li>
            ]
        }
    }
    return (
        <div>
            <nav style={{backgroundColor:"white"}}>
                <div className="nav-wrapper white container">
                <Link to={state ? "/" : "/login"} className="brand-logo left">My Media</Link>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                   {renderList()}
                </ul>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
