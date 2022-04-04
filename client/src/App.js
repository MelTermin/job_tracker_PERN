import {BrowserRouter as Router, Routes, Route,Navigate} from "react-router-dom";
import {useState,useEffect} from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkAuthenticated= async() => {
    try {

      const data= await fetch("http://localhost:4000/api/protected", {
        method:"POST",
        headers: {jwt_token:localStorage.token}
      })

      const response= await data.json()

      response === true ? setIsAuthenticated(true): setIsAuthenticated(false)

    }catch(error) {
      console.log(error)
    }
  }

  useEffect (()=> {
    checkAuthenticated()
  },[])

  const setAuth = boolean => {
    setIsAuthenticated(boolean);
  };
  return (
    <div>
        <Router>
        <Routes>
          <Route   exact path="/" element= {
            !isAuthenticated ? (
              <Login  setAuth={setAuth}/>
            ) : (
              <Navigate replace to="/dashboard" />
            )
          }/>
          <Route   exact path="/register" element= {
            !isAuthenticated ? (
              <Register  setAuth={setAuth}/>
            ) : (
              <Navigate replace to="/dashboard" />
            )
          }/>
          <Route   exact path="/dashboard" element= {
            isAuthenticated ? (
              <Dashboard   setAuth={setAuth}/>
            ) : (
              <Navigate replace to="/" />
            )
          }/>
        </Routes>
      </Router>

    </div>
  );
}

export default App;
