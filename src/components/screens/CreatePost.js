import React,{useState,useEffect} from 'react'
import { Link ,useHistory } from 'react-router-dom'
import M from 'materialize-css'

const CreatePost = () => {
    const history = useHistory()
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const [image, setImage] = useState("")
    const [url, setUrl] = useState("")


    useEffect(() => {
    if(url)
       postIt()
    }, [url])

    
    useEffect(() => {
        fetch("/authenticated",{
            headers:{

                Authorization:`Bearer ${JSON.parse(localStorage.getItem("jwt"))}`
            }
        })
        .then(res => res.json())
        .then(auth => {
            if(!auth.isAuthenticated){
            
                history.replace("/login")

            }
        })
    }, [])


    // onclick function to cloudinary
    function postDetails(){
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
// upload to server and then to database
    function postIt(){
        
    
           fetch("/createpost",{
               method:"post",
               headers:{
                   "Content-Type":"application/json",
                   "Authorization":"Bearer " + JSON.parse(localStorage.getItem("jwt"))
               },
               body:JSON.stringify({
                   title,body,url
               })
           }) .then(res => res.json())
           .then(data => {
               if(data.error){
                M.toast({html:data.error,classes:"#c62828 red darken-3"})
               }
               else {
                M.toast({html:"Successfully posted",classes:"#43a047 green darken-1"})
                history.push("/")
               }
           }).catch(err => {
               console.log(err);
           })
        
    }

    return (
        <div style={{
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
            minHeight:"80vh"
        }}>
        <div className="card input-filed"  style={{
            margin:"10px auto",
            maxWidth:"500px",
            padding:"20px",
            textAlign:"center"
        }}>
            <input type="text" placeholder="Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            />            
            <input type="text" placeholder="Message"
            value={body}
            onChange={e => setBody(e.target.value)}
            />            
            <div className="file-field input-field">
            <div className="btn">
                <span>Upload Image</span>
                <input type="file" onChange={e => setImage(e.target.files[0])} />
            </div>
            <div className="file-path-wrapper">
                <input className="file-path validate" type="text" />
            </div>
            
            </div>
            <button className="btn waves-effect darkened #64b5f6 blue waves-light" style={{margin:"15px auto"}}
            onClick={postDetails}
            >
              Submit Post
           </button>
        </div>
    </div>
    )
}

export default CreatePost
