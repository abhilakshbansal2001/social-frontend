import React ,{useState}from 'react'

import { Link ,useHistory,useParams } from 'react-router-dom'
import M from 'materialize-css'

function NewPassword() {
    const history = useHistory();
    const [password , setPassword] = useState("")
    const [confpassword , setConfPassword] = useState("")
    const {token} = useParams()
    // console.log(token);
    //post data 
    function postdata(){
       
        if(password !== confpassword)
            return  M.toast({html:"Please check password again",classes:"#c62828 red darken-3"})
            
       fetch("/new-password",{
           method:"post",
           headers:{
               "Content-Type":"application/json"
           },
           body:JSON.stringify({
               password,token
           })
       }) .then(res => res.json())
       .then(data => {
           if(data.error){
            M.toast({html:data.error,classes:"#c62828 red darken-3"})
           }
           else {
            M.toast({html:data.message,classes:"#43a047 green darken-1"})
           
            history.push("/login")
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
           type="password"
           placeholder="password"
           value={password}
           onChange={e => setPassword(e.target.value)}
           />

           <input  
           type="password"
           placeholder="Confirm Password"
           value={confpassword}
           onChange={e => setConfPassword(e.target.value)}
           />
           <button className="btn waves-effect waves-light" onClick={postdata}>
               Update Password
           </button>
           <h5>
        
        </h5>
        </div>
        
        
        
            
        </div>
    )
}

export default NewPassword
