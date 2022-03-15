import react ,{useEffect, useState}from "react";
import '../../App.css'
import axios from "axios"
import {useNavigate,Navigate,Link as RouterLink} from "react-router-dom"
import {useSelector,useDispatch} from "react-redux"
// import { adminLoginAction } from "./redux";

function Login (props) {
    const [emailId,setEmailId]=useState("");
    const [password,setPassword]=useState("");
    const [userId,setUserId]=useState("");
    // const [jwt,setJwt]=useState("")
    const navigate = useNavigate()
    // const adminLogin = useSelector(state=>state.adminLogin);
    // const dispatch = useDispatch()
    // console.log(adminLogin)

 const login = async(e)=>{
    e.preventDefault();
    
   try{ 
        const data = await axios.post("http://localhost:3000/user/login",{
        emailId,
        password,
        },{withCredentials: true, credentials: 'include'})
        // console.log(data)
        // this.setState({login:true})
        // const jwt = data.data.authToken
        console.log(data.data._id)
        if(data.status===200){

        navigate(`/todonotes/home/${data.data._id}`,{state:"admin"}
        )
       
        // dispatch(adminLoginAction())
        }
        
    } 
    catch (err){
            window.alert(err.response.data.error);

        }
    
}

    useEffect(()=>{

    },[])
    // if(this.state.login){
    //     return(    <Navigate to="/adminpage" jwt={this.state.jwt}/>)
    // } 
    // else{ 
    return(
        <>
        <div className="form-page">
            <form onSubmit={login}>
            <h1 style={{color:"#151516", fontFamily:"sans-serif"}}>Login</h1>
            <div>
            <label></label>
            <input type="text" name="emailId" value={emailId} placeholder="Email Id" onChange={e=>setEmailId(e.target.value)}></input>
            </div>
            <div>
            <label></label>
            <input type="password" name="password" value={password} placeholder="Password" onChange={e=>setPassword(e.target.value)}></input>
            </div>
            <button type="submit">Login</button>
            </form>
        <RouterLink style={{color:"#151516",textDecoration:"none"}} to="/signup"><p>Don't have an account? Click here.</p></RouterLink>
        </div>
        </>
    )
// }
}


export default Login