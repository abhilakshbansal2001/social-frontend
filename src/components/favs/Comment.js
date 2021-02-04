export const makeComment = (postId,text) => {
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
    })
}