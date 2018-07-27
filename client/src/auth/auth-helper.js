//Once User sign out, sessionStorage cleared
import signOut  from './api-auth'

const auth = {
    isAuthenticated(){
        if(typeof window === 'undefined'){
            return false
        } 
        if(sessionStorage.getItem('jwt')){
            return JSON.parse(sessionStorage.getItem('jwt'))
        }else{
            return false
        }
    },
    authenticated(jwt, cb){
        if(typeof window !== 'undefined'){
            sessionStorage.setItem('jwt', JSON.stringify(jwt))
        }
         cb()
    },

    signOut(cb){
        if(typeof window !== 'undefined'){
            sessionStorage.removeItem('jwt')
        }
        cb()
    }
}
export default auth;