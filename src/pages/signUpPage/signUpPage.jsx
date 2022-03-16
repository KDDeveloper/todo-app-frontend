import react ,{useEffect, useState}from "react";
import '../../App.css'
import axios from "axios";
import { Button } from "@mui/material";
import {useNavigate,Navigate,Link as RouterLink} from "react-router-dom"
import {useSelector,useDispatch} from "react-redux"
// import { adminLoginAction } from "./redux";

const CONFIG = {
    headers: {
        Accept: 'application/json; charset=utf-8',
        'Content-Type': 'application/json',
      },
      withCredentials:true,
      credentials:'include'
    }

const validateEmail = RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
const validatePassword = RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/);

 const date = new Date();
        const yyyy = date.getFullYear();
        let mm = date.getMonth() + 1; // Months start at 0!
        let dd = date.getDate();
    
        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm;
    
        const today = `${dd}/${mm}/${yyyy}`;

function SignUp (props) {

    const initialFormValues = {
        firstName:"",
        lastName:"",
        emailId:"",
        password:"",
        confirmPassword:""
    }

    const [formValues,setFormValues]=useState(initialFormValues);
    const [formFill,setFormFill]=useState(true);

    // const [emailId,setEmailId]=useState("")
    // const [password,setPassword]=useState("")
    // const [firstName,setFirstName]=useState("")
    // const [lastName,setLastName]=useState("")

    const navigate = useNavigate()
    // const adminLogin = useSelector(state=>state.adminLogin);
    // const dispatch = useDispatch()

    const [firstNameError,setFirstNameError] = useState('')
    const [lastNameError, setLastNameError]= useState('')
    const [emailIdError,setEmailIdError]= useState('')
    const [passwordError,setPasswordError]= useState('')
    const [confirmPasswordError,setConfirmPasswordError]= useState('');

    const handleChange=({target:{name,value}})=>{
        setFormValues({...formValues, [name]:value});
        console.log(formValues);

        switch (name) {
            case "firstName":{
                 if(value<1){
                setFirstNameError("First name is required!")
                setFormFill(true)
                }
                else{
                    setFirstNameError("")
                    setFormFill(false)
                };        
        }
        break;

            case"lastName":{
                if(value===""){
                        setLastNameError("Last name is required!")
                    }
                     else{setLastNameError("")};
            }
            break;

            case "emailId":{
                const validatedEmail = validateEmail.test(value);

                if(!validatedEmail){
                    setEmailIdError("Please use a valid e-mail id!")
                }else{setEmailIdError("")};
            }
            break;

            case "password" :{
                const validatedPassword = validatePassword.test(value);
                if(!validatedPassword){
                    setPasswordError("The password must have 9 characters,1 letter and 1 number!");
                } else{setPasswordError("")}
            }
            break;
            case "confirmPassword" :{
                if(value!==formValues.password){
                        setConfirmPasswordError("The password does not match!");
                        console.log("password not confirmed",formValues.password,formValues.firstName)
                    }
                if(value===formValues.password){
                    setConfirmPasswordError("");
                    console.log("password confirmed")
                }
            }
            break;

            default:
                break;
        }

    }


 const login = async(e)=>{
    e.preventDefault();
    if(firstNameError==="" && lastNameError==="" && emailIdError==="" && passwordError==="" && confirmPasswordError===""){
        try{ 
            let {emailId,password,firstName,lastName} = formValues 
             const data = await axios.post("https://todo-notes-backend.herokuapp.com/user/signup",{
             date,
             firstName,
             lastName,
             emailId,
             password,
             },CONFIG)
             // console.log(data)
             // this.setState({login:true})
             const jwt = data.data.authToken
             console.log(data)
             if(data.status===200){
             navigate('/login',{state:"admin"}
             )
            
             // dispatch(adminLoginAction())
             }
             
         } 
         catch (err){
                 window.alert(err.response.data.error);
     
             }
    } else{
        window.alert("Please fill all details as required. See you on the inside.");
    }
   
}


    return(
        <>
        <div className="form-page sign-up-form">
            <form onSubmit={login}>
            <h1 style={{color:"#151516", fontFamily:"sans-serif"}}>Sign up</h1>
            <div>
            <label></label>
            <input type="text" name="firstName" value={formValues.firstName} placeholder="First name" onChange={handleChange}></input>
            <span>{firstNameError}</span>
            </div>
            <div>
            <label></label>
            <input type="text" name="lastName" value={formValues.lastName} placeholder="Last name" onChange={handleChange}></input>
            <span>{lastNameError}</span>
            </div>
            <div>
            <label></label>
            <input type="text" name="emailId" value={formValues.emailId} placeholder="Email Id" onChange={handleChange}></input>
            <span>{emailIdError}</span>
            </div>
            <div>
            <label></label>
            <input type="password" name="password" value={formValues.password} placeholder="Password" onChange={handleChange}></input>
            <span>{passwordError}</span>
            </div>
            <div>
            <label></label>
            <input type="password" name="confirmPassword" value={formValues.confirmPassword} placeholder="Password" onChange={handleChange}></input>
            <span>{confirmPasswordError}</span>
            </div>
            <Button type="submit" disabled={formFill}>Sign up</Button>
            </form>
        <RouterLink style={{color:"#151516",textDecoration:"none"}} to="/login"><p>Already have an account? Click here.</p></RouterLink>
        </div>
        </>
    )
// }
}


export default SignUp