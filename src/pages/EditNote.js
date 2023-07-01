import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { URL } from "../App";

export default function EditNote() {
  const { _id } = useParams();
  const [editNote, setEditNote] = useState({
    title: "",
    description: "",
  });
  const navigate = useNavigate();

  const getSelectedNote = async () => {
   try {
    let res = await fetch(`${URL}/${_id}`);
    res = await res.json();
    setEditNote({ ...res.data });
   } catch (error) {
    console.log(error)
   }
  };

  useEffect(() => {
    getSelectedNote();
  }, []);

  let name, value;
  const handleInput = (e) => {
    name = e.target.name;
    value = e.target.value;
    setEditNote({ ...editNote, [name]: value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, description } = editNote;
    try {
      let res = await fetch(`${URL}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          _id,
        }),
      });
      res = await res.json();
      alert(res.message);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <h2>Edit Note</h2>
      <form className="form-control" onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title *"
          value={editNote.title}
          onChange={handleInput}
          required={true}
        />
        <textarea
          name="description"
          placeholder="Description *"
          cols={20}
          rows={5}
          value={editNote.description}
          onChange={handleInput}
          required={true}
        ></textarea>
        <button className="btn" >Submit</button>
      </form>
    </>
  );
}
