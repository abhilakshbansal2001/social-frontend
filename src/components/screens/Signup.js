import React,{ useState , useEffect } from 'react'
import { Link ,useHistory } from 'react-router-dom'
import M from 'materialize-css'

function Signup() {
    const history = useHistory();
    const [name , setName] = useState("")
    const [email , setEmail] = useState("")
    const [password , setPassword] = useState("")
    const [image,setImage] = useState("")
    const [url,setUrl] = useState("")
    const imageURL='https://image.flaticon.com/icons/png/512/17/17004.png';
    useEffect(() => {
        
        if(url){
            uploadFields()
        }
        
    }, [url])

    //post data 
    function postdata(){

        if(image){
            profilePic()
        }
        else{
            uploadFields()
        }
        

    
    }

    function uploadFields(){
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            return M.toast({html:"Invalid Email",classes:"#c62828 red darken-3"})
 
         }
 
        fetch("/signup",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name,email,password,pic:url?url:imageURL
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


    function profilePic(){
        const data = new FormData()
        data.append("file",image)
        data.append("upload_preset","social")
        data.append("cloud_name","dg01ohpcx")
        fetch("https://api.cloudinary.com/v1_1/dg01ohpcx/image/upload",{
            method:"post",
            body:data
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            setUrl(data.url)
           
        })
        .catch(err => {
            console.log(err);
        })
    }

    return (
        <div className="my-card">
            
        <div className="card auth-card">
           <h2>Sign Up</h2>
           <input  
           type="text"
           placeholder="name"
           value={name}
           onChange={e => setName(e.target.value)}
           />
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

            <div className="file-field input-field">    
                <div className="btn">
                    <span>Upload Profile Pic</span>
                    <input type="file" onChange={e => setImage(e.target.files[0])} />
                </div>
                <div className="file-path-wrapper">
                    <input className="file-path validate" type="text" />
                </div>
            
            </div>

           <button className="btn waves-effect waves-light" onClick={postdata} >
               Register
           </button>
           <h5>
            <Link to="/login" style={{fontSize:"12px"}}>Already Have An account?</Link>
        </h5>
        <h6>
        <Link to="/reset">Forgot password ?</Link>
        </h6>
        </div>
        
            
        </div>
    )
}

export default Signup
