import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { Link as RouterLink, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./addTodoList.scss"


const date = new Date();
const yyyy = date.getFullYear();
let mm = date.getMonth() + 1; // Months start at 0!
let dd = date.getDate();

if (dd < 10) dd = '0' + dd;
if (mm < 10) mm = '0' + mm;

const today = `${dd}/${mm}/${yyyy}`;

const config = {
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      withCredentials:true
    }

const AddTodoList = () =>{
    const {id} = useParams();

    const userId = id;
    const initialValues = {
        title:"",
        todoItem :"",
    }
    let date = today;
    const navigate = useNavigate();
    const [createTodoValues,setCreatetodoValues] = useState(initialValues);
    const [titleError, setTitleError] = useState("Title is required!");
    const [addItemError, setAddItemError] = useState("Add an item");
    const [formNotFilled,setFormNotFilled] = useState(true);

    const handleChange = ({target:{name,value}})=>{
        setCreatetodoValues({...createTodoValues,[name]:value});
        
        switch (name) {
            case "title":{
                if(value<1){
                    setTitleError("Title is required!")
            } else{
                setTitleError("");
            }
            }

            break;
                
            case "todoItem":{
                if(value<1){
                    setAddItemError("Add an item");
            } else{
                setAddItemError("");
            }
            }
                
                break;
        
            default:
                break;
        }
        

    }

    const createTodoList = async()=>{
        const{title,todoItem} = createTodoValues;
        console.log(id);
        try {
            
            const response = await axios.post("http://localhost:3000/todolist/create",{
                date,
                title,
                id,
                todoItem
            },config)

            console.log(response.data._id);

            if(response.status===200){
                 navigate(`/addTodo/${id}/${response.data._id}`)
            }
        } catch (err) {
            console.log(err);
        }

        
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        createTodoList();
    }

    useEffect(()=>{
        if(titleError==="" && addItemError===""){
            setFormNotFilled(false);
            console.log("empty")
        }

        if(titleError!=="" || addItemError!==""){
            setFormNotFilled(true);
            console.log(" not empty")
        } 
    },[titleError,addItemError])

    return(
        <>
            <div className="add-todo-list-container">
                <div className="add-todo-list-form">
                    <form onSubmit={handleSubmit}>
                        <div>
                        <input type="text" name="title" value={createTodoValues.title} onChange={handleChange} placeholder="Title"></input>
                        <span>{titleError}</span>
                        </div>

                        <div>
                        <input type="text" name="todoItem" value={createTodoValues.todoItem} onChange={handleChange} placeholder="Add item"></input>
                        <span>{addItemError}</span>
                        </div>
                    <div className="add-todo-list-buttons">
                        <RouterLink to={`/todonotes/home/${id}`}><Button variant="contained">Cancel</Button></RouterLink>
                        <Button type="submit" disabled={formNotFilled} variant="contained">Create</Button>
                    </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default AddTodoList;