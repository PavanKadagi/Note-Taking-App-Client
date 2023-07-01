import React, { useState, useEffect } from "react";
import { URL } from "../App";
import { NavLink } from "react-router-dom";
import {ReactComponent as Delete} from '../assets/delete.svg'
import {ReactComponent as Edit} from '../assets/edit.svg'



export default function Home() {
  const [user, setUser] = useState({
    title: "",
    description: "",
  });
  const [data, setData] = useState([]);
  const [characterLength, setCharacterLength] = useState(true);
  const [isLoading,setIsLoading] = useState(true);

  const getAllNote = async () => {
    try {
      let res = await fetch(`${URL}`);
      res = await res.json();
      setData(res.data);
      setIsLoading(false)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllNote();
  }, []);

  let name, value;
  const handleInput = (e) => {
    name = e.target.name;
    value = e.target.value;
    if (name === "title") {
      value.length < 10 ? setCharacterLength(true) : setCharacterLength(false);
    }

    console.log(name, value, characterLength);
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, description } = user;
    let ans =
      data.length >= 1
        ? data.some((val) => {
            return val.title.toLowerCase() === user.title.toLowerCase();
          })
        : false;
    if (ans) {
      alert("Duplicate Title...!");
    } else {
      try {
        let res = await fetch(`${URL}`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            description,
          }),
        });
        res = await res.json();

        window.location.reload();
        alert(res.message);
        console.log("res", res);
        setUser({ title: "", description: "" });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleDelete = async (id) => {
    // dispatch(deleteNote(number))
    try {
      let res = await fetch(`${URL}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
        }),
      });
      res = await res.json();
      // setReload(true)
      window.location.reload();
      alert(res.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
     <h1>Note Taking App</h1>
      <form className="form-control" onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title *"
          value={user.title}
          onChange={handleInput}
          required={true}
        />
        <textarea
          name="description"
          placeholder="Description *"
          cols={20}
          rows={5}
          value={user.description}
          onChange={handleInput}
          required={characterLength}
        ></textarea>
        <button className="btn" >Add Note</button>
      </form>
      <div className="card">
      {
        isLoading ? 
      <h3>Loading...</h3>
      :
      data.map((user) => {
        return (
          <div className="card-content" key={user._id}>
            <h2>{user.title}</h2>
            <p>{user.description}</p>
            <div className="card-btn">
            <NavLink to={`/${user._id}`}><Edit /></NavLink>
            <Delete className='delete' onClick={() => handleDelete(user._id)} />
            </div>
          </div>
        );
      })
      }
      </div>
    </>
  );
}
