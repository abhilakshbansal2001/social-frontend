import React,{useEffect,useState,useContext} from 'react'
import { useHistory } from 'react-router-dom'
import { UserContext } from '../../App'
import M from 'materialize-css'


function Profile() {
    const {state,dispatch} = useContext(UserContext)
    const [myPics,setPics] = useState([])
    const [image,setImage] = useState("")
    const [url,setUrl] = useState("")
    const [loading,setLoading] = useState(true)


    const history = useHistory()
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
    useEffect(() => {
        
       fetch("/mypost",{
           headers:{
               Authorization:"Bearer " + JSON.parse(localStorage.getItem("jwt"))

           }
       }).then(res => res.json())
       .then(result => {
           console.log(result);
            setPics(result)
            setLoading(false)
       })
    }, [])

    function updateField(){
        fetch("/updatePic",{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer " + JSON.parse(localStorage.getItem("jwt"))
            },
            body:JSON.stringify({
                pic:url
            })
        }) .then(res => res.json())
        .then(data => {
            console.log(data);
            dispatch({type:"UPDATEPIC",payload:{pic:data[0].pic}})
            localStorage.setItem("user",JSON.stringify(data[0]))
           
            document.querySelector(".modal-upper").classList.remove("show") 

            
        }).catch(err => {
            console.log(err);
        })
    }

    useEffect(() => {
        if(url){
            updateField()
        }
    }, [url])

    useEffect(() => {
        if(image){
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
    }, [image])

    function updatePhoto(file){
        setImage(file)
       
    }

    return (

        <>
        {!loading ? 
        <div style={{maxWidth:"550px",margin:"0 auto"}}>
            
           <div style={{display:"flex",justifyContent:"space-around",margin:"18px 0px",borderBottom:"1px solid #aaa"}} >
               <div>
                   <img style={{width:"170px",height:"170px",borderRadius:"100%"}}
                    src={state ? state.pic : "https://image.flaticon.com/icons/png/512/17/17004.png"}
                     alt="person Image"
                   />

            <div style={{margin:"20px"}}>

            <div className="modal-upper">
                            
            <div className="modal-pic">
                    <div className="title">
                    <h4>Update Profile Picture</h4>
                    <span>
                    <i className="material-icons" style={{color:"black",cursor:"pointer"}}
                                 onClick={() => {
                                    document.querySelector(".modal-upper").classList.remove("show") 
                                    
                                }}
                            >close</i>
                    </span>
                    </div>
                    <div className="file-field input-field" >    
                        <div className="btn">
                            <span>Choose</span>
                            <input type="file" onChange={e => updatePhoto(e.target.files[0])} />
                        </div>
                        <div className="file-path-wrapper">
                            <input className="file-path validate" type="text" />
                        </div>

                    </div>

                    </div>

            </div>
    
           <button className="btn waves-effect waves-light" onClick={() => {
                document.querySelector(".modal-upper").classList.add("show") 
           }} >
               Edit
           </button>
        

           
            </div>

                  </div>
               <div>
                <h4>{state && state.name}</h4>
                   <div style={{display:"flex",justifyContent:"space-between",width:"108%"}} >
    <h6><small>{myPics.posts &&  myPics.posts.length}</small> posts</h6>
    <h6><small>{state ? state.followers.length : 0 }</small> followers</h6>
                       <h6><small>{state ? state.following.length : 0 }</small> following</h6>
                   </div>
               </div>
           </div>
            <div className="gallery" >
                {
                    myPics.posts &&  myPics.posts.map(item => {
                        return (
                            <img key={item._id} className="item" src={item.url} alt={item.title} />
                        )
                    })
                }
                
                
            </div>
        </div> : <h1>Loading...</h1>
}
</>
    )
}

export default Profile
