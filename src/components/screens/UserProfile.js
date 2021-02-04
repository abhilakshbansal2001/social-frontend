import React,{useEffect,useState,useContext} from 'react'
import { useHistory } from 'react-router-dom'
import { UserContext } from '../../App'
import {useParams} from 'react-router-dom'

function Profile() {
    const {state,dispatch} = useContext(UserContext)
    const [userProfile,setUserProfile] = useState(null)
    const [states,setStates] = useState(true)
    const history = useHistory()
    const {userid} = useParams()
    
    
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
        
       fetch(`/user/${userid}`,{
           headers:{
               Authorization:"Bearer " + JSON.parse(localStorage.getItem("jwt"))

           }
       }).then(res => res.json())
       .then(result => {
           console.log(result);
            setUserProfile(result)
       })
    }, [states])

    const followUser = () => {
        fetch("/follow",{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer " + JSON.parse(localStorage.getItem("jwt"))
 
            },
            body:JSON.stringify({
               followId: userid
            })
        }).then(res => res.json())
        .then(data => {
            
            console.log(data);
            dispatch({type:"UPDATE",payload:{following:data.following,followers:data.followers}})
            localStorage.setItem("user",JSON.stringify(data))
            setUserProfile(prev => {
                return {
                    ...prev,
                    user:{
                        ...prev.user,
                        followers:[...prev.user.followers,data._id]
                    }
                }
            })
            
        })
    }

    // unFollow route

    const unfollowUser = () => {
        fetch("/unfollow",{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer " + JSON.parse(localStorage.getItem("jwt"))
 
            },
            body:JSON.stringify({
               unfollowId: userid
            })
        }).then(res => res.json())
        .then(data => {
            dispatch({type:"UPDATE",payload:{following:data.following,followers:data.followers}})
            localStorage.setItem("user",JSON.stringify(data))
            setUserProfile(prev => {
                return {
                    ...prev,
                    user:{
                        ...prev.user,
                        followers:[
                            ...prev.user.followers.filter(e => {
                                return e !== data._id
                            })
                        ]
                    }
                }
            })

        })
    }

    return (
        <>
        {!userProfile ?  <h2>Loading ...</h2> : 
        <div style={{maxWidth:"550px",margin:"0 auto"}}>
           <div style={{display:"flex",justifyContent:"space-around",margin:"18px 0px",borderBottom:"1px solid #aaa"}} >
               <div>
                   <img style={{width:"160px",borderRadius:"80px"}}
                    src={userProfile.user.pic}
                     alt="person Image"
                   />
               </div>
               <div>
                <h4>{userProfile && userProfile.user.name}</h4>
                <h5>{userProfile && userProfile.user.email}</h5>
                   <div style={{display:"flex",justifyContent:"space-between",width:"108%"}} >
                    <h6><small>{userProfile && userProfile.posts.length}</small> posts</h6>
                       
                       <h6><small>{userProfile.user.followers.length}</small> followers</h6>
                       <h6><small>{userProfile.user.following.length}</small> following</h6>
                  
                   </div>

                   {!userProfile.user.followers.includes(state._id) ? 

                   <button style={{margin:"10px"}} className="btn waves-effect waves-light" onClick={followUser}>
                        Follow
                    </button> : <button style={{margin:"10px"}} className="btn waves-effect red darker-1 waves-light" onClick={unfollowUser}>
                        Unfollow
                    </button>
 }
               </div>
           </div>
            <div className="gallery" >
                {
                    userProfile && userProfile.posts.map(item => {
                        return (
                            <img key={item._id} className="item" src={item.url} alt={item.title} />
                        )
                    })
                }
                
                
            </div>
        </div>
}
        </>
    )
}

export default Profile
