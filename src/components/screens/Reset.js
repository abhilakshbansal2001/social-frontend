import React ,{useState}from 'react'

import { Link ,useHistory } from 'react-router-dom'
import M from 'materialize-css'

function Reset() {
    const history = useHistory();
    const [email , setEmail] = useState("")

    //post data 
    function postdata(){
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
           return M.toast({html:"Invalid Email",classes:"#c62828 red darken-3"})

        }

       fetch("/reset-password",{
           method:"post",
           headers:{
               "Content-Type":"application/json"
           },
           body:JSON.stringify({
               email
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
           type="email"
           placeholder="email"
           value={email}
           onChange={e => setEmail(e.target.value)}
           />
          
           <button className="btn waves-effect waves-light" onClick={postdata}>
               Reset Password
           </button>
           <h5>
        <Link to="/signup">Register Here</Link>
        </h5>
        </div>
        
        
        
            
        </div>
    )
}

export default Reset
