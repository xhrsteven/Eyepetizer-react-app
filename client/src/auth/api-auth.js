//User sign in & sign out, fetch user json data
const signIn = (user) =>{
    return fetch('/auth/signIn', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(user)
    })
    .then((response) =>{
        return response.json()
    }).catch((err) =>{console.log(err)})
};

const signOut = () =>{
    return fetch('/auth/signOut', {
        method: 'GET'
    })
    .then((response) =>{
        return response.json()
    })
    .catch((err) =>{console.log(err)})
};

export { signIn, signOut }