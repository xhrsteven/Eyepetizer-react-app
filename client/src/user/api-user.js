//Export create, list,read, update,remove,follow, unFollow,findPeople functions
const create =(user) =>{
    return fetch('/api/users/', {
        method:'POST',
        headers: {
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
        body: JSON.stringify(user)
    })
    .then((response) =>{
        return response.json()
    }).catch((err) => {console.log(err)})
};
const list = ()=>{

}

const read = (params, credentials) =>{

}

const update = (params, credentials, user) =>{

}

const remove = (params, credentials) =>{

}

const follow =(params, credentials, followId) =>{
    return fetch('/api/users/follow', {
        method:'PUT',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer' + credentials.t
        },
        body: JSON.stringify({userId:params.userId, followId: followId})
    }).then((response) =>{
        return response.json()
    }).catch((err) =>{ console.log(err)})
};

const unFollow = (params,credentials, unFollowId) =>{
    return fetch("/api/users/unFollow/", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer" + credentials.t
      },
      body:JSON.stringify({userId: params.userId, unFollowId: unFollowId})
    }).then((response) =>{
        return response.json()
    }).catch((err) =>{console.log(err)})
};

const findPeople = (params, credentials) =>{

}

export {create, list, read, update, remove, follow, unFollow, findPeople}