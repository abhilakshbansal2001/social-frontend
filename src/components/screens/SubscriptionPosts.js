import React,{useState,useEffect,useContext} from 'react'
import {UserContext} from '../../App'
import {useHistory ,Link} from "react-router-dom"
// import { makeComment } from '../favs/Comment'

const SubscriptionPosts = () => {
    const {state} = useContext(UserContext)

    const [data,setData] = useState([])
    const [loaded,setLoaded] = useState(false)
    const history = useHistory();

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

        if(!state){
            history.push("/login")
        }

        fetch("/getsubpost",{
            headers:{
                Authorization:`Bearer ${JSON.parse(localStorage.getItem("jwt"))}`
            }
        })
        .then(res => res.json())
        .then(post => {
            console.log(post.posts);
            setLoaded(true)
            setData(post.posts)
        })
        
        return () => {
            
        }
    }, [])

    //Like Post
    const likePost = (id) => {
        fetch("/like",{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer " + JSON.parse(localStorage.getItem("jwt"))
            },
            body:JSON.stringify({
                postId:id
            })
        }).then(res => res.json())
        .then(result => {
            const newData = data.map(item =>{
                if(item._id == result._id){
                    return result
                }
                return item
            })
            setData(newData)
        }).catch(err => console.log(err))
    }

    //Unlike post api call
    const unLikePost = (id) => {
        fetch("/unlike",{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer " + JSON.parse(localStorage.getItem("jwt"))
            },
            body:JSON.stringify({
                postId:id
            })
        }).then(res => res.json())
        .then(result => {
            const newData = data.map(item =>{
                if(item._id == result._id){
                    return result
                }
                return item
            })
            setData(newData)
        }).catch(err => console.log(err))
    }

    //Comment
    const makeComment = (postId,text) => {
        fetch("/comment",{
            method:"put",
            headers:{
                'Content-Type':"application/json",
                "Authorization":"Bearer " + JSON.parse(localStorage.getItem("jwt"))
            },
            body:JSON.stringify({
                text,postId
            })
        }).then(res => res.json())
        .then(result => {
            console.log(result);
            const newData = data.map(item =>{
                if(item._id == result._id){
                    return result
                }
                return item
            })
            setData(newData)
        }).catch(err => console.log(err))
    }

    const deletePost = (postid) => {
        fetch(`/deletepost/${postid}`,{
            method:"delete",
            headers:{
                // 'Content-Type':"application/json",
                "Authorization":"Bearer " + JSON.parse(localStorage.getItem("jwt"))
            },
            
        }).then(res => res.json())
        .then(result => {
            
            const newData = data.filter(item =>{
                return item._id !== result._id
                     
                
            })
            setData(newData)
            // M.toast({html:""})
        }).catch(err => console.log(err))
    }

    return (
        <>
        {loaded ? 
        <div className="home">

            {
                data && data.reverse().map(item => {
                    return (
                        <div className="card home-card" >
                        <h5><Link to={item.postedBy._id !== state._id ? "/profile/" + item.postedBy._id : "/profile" }>{item.postedBy.name}</Link>
                        
                        {item.postedBy._id === state._id && <i className="material-icons"
                        onClick={() => deletePost(item._id)}
                        style={{color:"pink",cursor:"pointer",float:"right"}} >delete</i>}

                        </h5>
                        <div className="card-image">
                            <img src={item.url} /> 
                        </div>
                        <div className="card-content">

                        <i className="material-icons" style={{color:"pink",cursor:"pointer"}} >favorite</i>


                            {!item.likes.includes(state._id) ? <i className="material-icons" style={{color:"black",cursor:"pointer"}}
                                onClick={() => {likePost(item._id)}}
                            >thumb_up</i> :

                            <i className="material-icons"
                            onClick={() => {unLikePost(item._id)}}
                            style={{color:"black",cursor:"pointer"}} >thumb_down</i>
                            }

                            
                          
                            <h6>
                            {item.likes && item.likes.length} likes
                            </h6>
                            <h6>
                                {item.title}
                            </h6>
                            <p>{item.body}</p>

                            {
                                item.comments.map(comment => {
                                    return (
                                        <h6>
                                            <span style={{fontWeight:"600"}} >{comment.postedBy.name} </span> <span style={{fontWeight:"300"}}>{comment.text}  </span>
                                        </h6>
                                    )
                                })
                            }

                            <form onSubmit={e => {
                                e.preventDefault()
                                const text = e.target[0].value
                                makeComment(item._id,text)
                                e.target[0].value = ""
                            }}>
                                <input type="text" placeholder="add a comment" />
                             </form>
                        </div>
                    </div>
                  
                    )
                })
            }
      
        </div> : 
                //   <div class="spinner-layer spinner-red">
                //   <div class="circle-clipper left">
                //     <div class="circle"></div>
                //   </div><div class="gap-patch">
                //     <div class="circle"></div>
                //   </div><div class="circle-clipper right">
                //     <div class="circle"></div>
                //   </div>
                // </div>
                <h1>Loading ...</h1>
        }
        </>
    )
}

export default SubscriptionPosts
