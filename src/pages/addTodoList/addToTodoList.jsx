import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { Link as RouterLink, useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import "./addTodoList.scss"


const config = {
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      withCredentials:true
    }

const AddToTodoList = () =>{
    const {id,todoid} = useParams();

    const initialValues = {
        todoItem :"",
    }
    const navigate = useNavigate();
    const [createTodoValues,setCreatetodoValues] = useState(initialValues);
    // const [titleError, setTitleError] = useState("Title is required!");
    const [addItemError, setAddItemError] = useState("Add an item");
    const [formNotFilled,setFormNotFilled] = useState(true);
    const [location,setLocation] = useState("");

    const handleChange = ({target:{name,value}})=>{
        setCreatetodoValues({...createTodoValues,[name]:value});
        
        switch (name) {
                
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


    const addTodo = async()=>{
        const{todoItem} = createTodoValues;
       
        try {
            
            const response = await axios.patch(`http://localhost:3000/todolist/add/${todoid}`,{
                todoItem
            },config)

            console.log(response);
            if(response.status===200){
                window.alert("New todo has been added.");
                setCreatetodoValues({todoItem:""});
            }
            
        } catch (err) {
            console.log(err);
        }

        
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        addTodo();
    }


    useEffect(()=>{
        if(addItemError===""){
            setFormNotFilled(false);
            console.log("empty")
        }

        if(addItemError!==""){
            setFormNotFilled(true);
            console.log(" not empty")
        } 
    },[addItemError])

    return(
        <>
            <div className="add-todo-list-container">
                <div className="add-todo-list-form">
                    <form onSubmit={handleSubmit}>
                        <div>
                        <input type="text" name="todoItem" value={createTodoValues.todoItem} onChange={handleChange} placeholder="Add item"></input>
                        <span>{addItemError}</span>
                        </div>
                    <div className="add-todo-list-buttons">
                        <Button variant="contained" onClick={()=>{navigate(-1)}}>Cancel</Button>
                        <Button type="submit" disabled={formNotFilled} variant="contained">Add</Button>
                    </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default AddToTodoList;