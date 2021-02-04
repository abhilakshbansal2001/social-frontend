import React ,{useState,useContext}from 'react'

import { Link ,useHistory } from 'react-router-dom'
import { UserContext} from '../../App'
import M from 'materialize-css'

function Login() {
    const {state,dispatch} = useContext(UserContext)
    const history = useHistory();
    const [email , setEmail] = useState("")
    const [password , setPassword] = useState("")

    //post data 
    function postdata(){
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
           return M.toast({html:"Invalid Email",classes:"#c62828 red darken-3"})

        }

       fetch("/signin",{
           method:"post",
           headers:{
               "Content-Type":"application/json"
           },
           body:JSON.stringify({
               email,password
           })
       }) .then(res => res.json())
       .then(data => {
           if(data.error){
            M.toast({html:data.error,classes:"#c62828 red darken-3"})
           }
           else {
            M.toast({html:`Welcome ${data.user.name}`,classes:"#43a047 green darken-1"})
            localStorage.setItem("jwt",JSON.stringify(data.token))
            localStorage.setItem("user",JSON.stringify(data.user))
            dispatch({type:"USER",payload:data.user})
            history.push("/")
           }

       }).catch(err => {
           console.log(err);
       })
    }


    return (
        <div className="my-card">
            
        <div className="card auth-card">
           <h2>My Media</h2>
           <input  
           type="email"
           placeholder="email"
           value={email}
           onChange={e => setEmail(e.target.value)}
           />
           <input  
           type="password"
           placeholder="password"
           value={password}
           onChange={e => setPassword(e.target.value)}
           />
           <button className="btn waves-effect waves-light" onClick={postdata}>
               Login
           </button>
           <h6>
        <Link to="/signup">Register Here</Link>
        </h6>
           <h6>
        <Link to="/reset">Forgot password ?</Link>
        </h6>
        </div>
        
        
        
            
        </div>
    )
}

export default Login
