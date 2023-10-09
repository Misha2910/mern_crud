import React from "react";
import { useState,useEffect } from "react";
import axios from "axios";
import {  useNavigate, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Edit = () => {
  const {id} = useParams()
   const [input, setInput] = useState({
    name: "",
    email: "",
    age: "",
  });

  const navigate = useNavigate();

   const getData = async () => {
    const res = await axios.get(`http://localhost:8080/api/v1/users/single/${id}`);
    setInput(res.data);
  };
  useEffect(() => {
    getData();
  }, [id]);

  // handle submit
  const handleEditData=async(e)=>{
      e.preventDefault();
     const res =  await axios.put(`http://localhost:8080/api/v1/users/${id}` , input)
      navigate('/')
  }
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12 mt-2">
          <div style={{ backgroundColor: "blue" }}>
            <h1 className="text-center text-white">Update</h1>
          </div>
        </div>
        <div className="col-md-12">
          <form onSubmit={handleEditData}>
            <div className="mb-3">
              <label className="form-label">
                User Name
              </label>
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
              <label className="form-label">
                Email Address
              </label>
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
              <label className="form-label">
                Age
              </label>
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
              Update
            </button><br/> 
              <button onClick={()=>navigate('/')}
              type="submit" className="btn btn-success mt-2">
                Go Back To Home
              </button>           
          </form>
        </div>
      </div>
    </div>
  );
};

export default Edit;
