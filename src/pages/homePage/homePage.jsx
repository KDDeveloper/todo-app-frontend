import {Add,Edit,Delete,Done} from "@mui/icons-material"
import { IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link as RouterLink,useNavigate } from "react-router-dom";
import axios from "axios"
import "./homePage.scss";

const CONFIG = {
    headers: {
        Accept: 'application/json; charset=utf-8',
        'Content-Type': 'application/json',
      },
      withCredentials:true
    }

const HomePage = () =>{

    const [allTodos, setAllTodos] = useState([]);
    const {id} = useParams();
    const userId = id;
    const navigate = useNavigate();

    const getAllTodos = async()=>{
       try {
        let response = await axios.get(`http://localhost:3000/todolist/getAll/${id}`,CONFIG);
        console.log(response)
        setAllTodos(response.data);
       } catch (error) {
            window.alert(error.response.data.message);
            navigate("/login")
       }
    }



    const deleteOneTodo = async(todoId)=>{
       try {
        let response = await axios.delete(`http://localhost:3000/todolist/deleteOne/${todoId}`);
        console.log(response)
       } catch (error) {
       }
       getAllTodos();
    }

    var twoSum = function(nums, target) {
        let map1 = new Map();
            for(let i = 0;i<nums.length;i++){
                let remainder = nums[i]-target;
                if(map1.has(remainder)){
                    return [nums[i],i]
                }
                map1.set(nums[i],i);
            }    
        return map1;
    };

useEffect(()=>{
    getAllTodos();
    console.log(twoSum([2,7,11,15],9));
    console.log(allTodos)
    if(allTodos.length===0){
        console.log("hello")
    }
},[]);

    return(
        <>
            <div className="homepage-container">
               {allTodos.length===0?<h1>Please add todos to get started!</h1> : <div className="all-todo-lists">
                {
                
                allTodos.map(todoList=>{
                    return(
                        <>
                      <div className="todo-list" key={todoList._id}>
                      <RouterLink to={`/todonotes/todoList/${id}/${todoList._id}`}> <div className="todo-list-heading">
                            <h4>{todoList.title}</h4>
                            <p>{todoList.date}</p>
                            </div>
                            <div className="todo-list-content">
                                {todoList.todo.map((el)=>{
                                    return(
                                        <>
                                        <div className="todo-list-item" style={{textDecoration:el.completed?"line-through":"none"}}>
                                            <p >{el.todoItem}</p>
                                            <Done style={{display:el.completed?"block":"none",color:"green"}}/>
                                        </div>
                                        </>
                                    )
                                })}
                            </div></RouterLink>
                            <div className="todo-list-buttons">
                                <div className="first-icon" onClick={()=>{deleteOneTodo(todoList._id)}}>
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
                </div>}
                <div className="add-button">
                    <RouterLink to={`/createTodo/${id}`}>
                        <IconButton>
                            <Add/>
                        </IconButton>
                    </RouterLink>
                </div>
            </div>
        </>
    )
}

export default HomePage