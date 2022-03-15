import axios from "axios";
import { useEffect, useState } from "react"
import { useParams, Link as RouterLink, useNavigate } from "react-router-dom";
import {Add,Edit,Delete,Done,ArrowBack,Cancel} from "@mui/icons-material";
import { IconButton } from "@mui/material";
import "./singleTodoList.scss";

const CONFIG = {
    headers: {
        Accept: 'application/json; charset=utf-8',
        'Content-Type': 'application/json',
      },
      withCredentials:true
    }

const SingleTodoList = () =>{
    const [oneTodoList,setOneTodoList] = useState([]);
    const [editMode,setEditMode] = useState(false);

    const navigate = useNavigate();
    const {id,todoid} = useParams();
    
    const getSingleTodoList = async()=>{
        try {
            const response = await axios.get(`/todolist/getOne/${todoid}`,CONFIG)
            setOneTodoList([response.data])
        } catch (error) {
            window.alert(error.response.data.message);
            navigate("/login");
        }
    }

    const updateCompleteStatus = async(itemId,status)=>{
        let completed = !status
        console.log(completed)
        try {
            const response = await axios.patch(`/todolist/updatecompletestatus/${todoid}/${itemId}`,{
              completed 
            },CONFIG)

        } catch (error) {
            window.alert(error.response.data.message);
            navigate("/login");
        }
        getSingleTodoList();
    }

    const deleteOneTodoList = async(todoId)=>{
        try {
         let response = await axios.delete(`/todolist/deleteOne/${todoId}`,CONFIG);
         console.log(response);

         if(response.status===200){
            navigate(`/todonotes/home/${id}`)
         }
        } catch (error) {
            window.alert(error.response.data.message);
            navigate("/login")
        }
     }

    const deleteOneTodoItem = async(item,itemId)=>{
        console.log(todoid,itemId,item)
        try {
         let response = await axios.delete(`/todolist/deleteOneTodoItem/${todoid}/${itemId}`,CONFIG);
         console.log(response);


        } catch (error) {
            window.alert(error.response.data.message);
            navigate("/login");
        }
        getSingleTodoList();
     }
    
    useEffect(()=>{
        getSingleTodoList();
        console.log(todoid)
    },[])
    useEffect(()=>{
        
        console.log(oneTodoList);
    },[oneTodoList])

    return(
        <>

<div className="single-todo-list-container">
             {
                
                oneTodoList.map(todoList=>{
                    return(
                        <>
                      <div className="todo-list" key={todoList._id}>
                        <div className="todo-list-top-buttons">
                        <RouterLink to={`/todonotes/home/${id}`}><IconButton><ArrowBack/></IconButton></RouterLink>
                        <IconButton onClick={()=>{setEditMode(!editMode)}}><Edit/></IconButton>
                        </div>
                    <div className="todo-list-heading">
                            <h4>{todoList.title}</h4>
                            <p>{todoList.date}</p>
                            </div>
                            <div className="todo-list-content">
                                {todoList.todo.map((el)=>{
                                    return(
                                        <>
                                      {editMode? 
                                      
                                      <div className="todo-list-item-edit">
                                          <p >{el.todoItem}</p>
                                            <IconButton onClick={()=>{deleteOneTodoItem(el.todoItem,el._id)}}>
                                                <Cancel style={{color:"red"}}/>
                                            </IconButton>
                                      </div> :
                                       <div className="todo-list-item" onClick={()=>{updateCompleteStatus(el._id,el.completed)}} style={{textDecoration:el.completed?"line-through":"none"}}>
                                            <p >{el.todoItem}</p>
                                            <Done style={{display:el.completed?"block":"none",color:"green"}}/>
                                        </div>}
                                        </>
                                    )
                                })}
                            </div>
                            <div className="todo-list-buttons">
                                <div className="first-icon" onClick={()=>{deleteOneTodoList(todoList._id)}}>
                                    <IconButton>
                                        <Delete/>
                                    </IconButton>
                                </div>

                               <RouterLink to={`/addTodo/${id}/${todoList._id}`}> <div className="second-icon">
                                    <IconButton>
                                        <Add/>
                                    </IconButton>
                                </div></RouterLink>
                            </div>
                        </div>
                        </>
                    )
                })}
            </div>
        </>
    )
}

export default SingleTodoList