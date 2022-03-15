import './App.css';
import Navbar from "./components/navbar";
import {BrowserRouter as Router,Routes,Route,Navigate} from "react-router-dom";
import {Helmet} from "react-helmet";
import Login from './pages/loginPage/loginPage';
import SignUp from './pages/signUpPage/signUpPage';
import HomePage from './pages/homePage/homePage';
import AddTodoList from './pages/addTodoList/addTodoList';
import AddToTodoList from './pages/addTodoList/addToTodoList';
import SingleTodoList from './pages/singleTodoList/singleTodoList';
const TITLE  = "Todo notes"
function App() {
  return (
    <>
    <Helmet>
      <title>{TITLE}</title>
    </Helmet>
    <div className="App">
      <Router>
        <Routes>
        <Route exact path="/" element={<Navigate replace to="/login"/>}/>
          <Route path="/signup" exact element={<SignUp/>}/>
          <Route path="/login" exact element={<Login/>}/>
          <Route path="/todonotes" element={<Navbar/>}>
            <Route path="home/:id" element={<HomePage/>}/>
            <Route path="todolist/:id/:todoid" element={<SingleTodoList/>}/>

          </Route>
          <Route path="/createTodo/:id" element={<AddTodoList/>}/>
          <Route path="/addTodo/:id/:todoid" element={<AddToTodoList/>}/>
        </Routes>
      </Router>
    </div>
    </>
  );
}

export default App;
