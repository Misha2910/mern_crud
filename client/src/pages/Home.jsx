import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import {Link} from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css";

const Home = () => {
  const [users, setUsers] = useState([]);
  const [render, setRender] = useState(false)
  const [input, setInput] = useState({
    name: "",
    email: "",
    age: "",
  });

  const getData = async () => {
    const data = await axios.get("http://localhost:8080/api/v1/users");
    setUsers(data.data);
  };

  useEffect(() => {
    getData();
  }, [render]);

  // submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, age } = input;
    if (!name || !email || !age) {
      return alert("All fields are mandatory");
    }
    await axios.post("http://localhost:8080/api/v1/users" , input);
    setRender(true)
    setInput({
      name:"",
      email:"",
      age:""
    })
  };

  // delete user
  const handleDelete = async (id) => {
   const deletedUser =  await axios.delete(`http://localhost:8080/api/v1/users/${id}`);
    const newUsers = users.filter((item)=>{
        return item._id!=id
    }) 
    setUsers(newUsers)
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12 mt-2">
          <div style={{ backgroundColor: "blue" }}>
            <h1 className="text-center text-white">MERN CRUD APP</h1>
          </div>
        </div>
        <div className="col-md-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">User Name</label>
              <input
                type="text"
                className="form-control"
                value={input.name}
                name="name"
                onChange={(e) =>
                  setInput({ ...input, [e.target.name]: e.target.value })
                }
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                className="form-control"
                value={input.email}
                name="email"
                onChange={(e) =>
                  setInput({ ...input, [e.target.name]: e.target.value })
                }
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Age</label>
              <input
                type="text"
                className="form-control"
                value={input.age}
                name="age"
                onChange={(e) =>
                  setInput({ ...input, [e.target.name]: e.target.value })
                }
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
        <div className="col-md-6">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Age</th>
                <th scope="col">Edit</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>
              {users &&
                users.map((user) => {
                  return (
                    <tr key={user._id}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.age}</td>
                      <td>
                        <Link to={`/edit/${user._id}`}>
                          <button className="btn btn-primary">Edit</button>
                        </Link>
                      </td>
                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={() => handleDelete(user._id)}
                        >Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Home;
