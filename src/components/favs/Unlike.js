export const unLikePost = (id) => {
    fetch("/unlike",{
        method:"put",
        headers:{
            "Content-Type":"application/json",
            Authorization:"Bearer " + JSON.parse(localStorage.getItem("jwt"))
        },
        body:{
            postId:id
        }
    }).then(res => res.json())
    .then(data => {
        console.log(data);
    })
}