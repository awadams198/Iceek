import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { useParams } from "react-router";
import "./EditArenaForm.css";

import * as arenaActions from "../../store/arena";

const EditArenaForm = () => {
  const [errors, setErrors] = useState([]);
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  let currentArenas = useSelector((state) => state?.arenaReducer.allArenas);
  let currentArena;
  if (currentArenas) {
    currentArena = currentArenas.filter((arena) => arena["id"] == id)[0];
  }
  const [price, setPrice] = useState(currentArena?.price);
  const [name, setName] = useState(currentArena?.name);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userId = user.id;
    await dispatch(
      arenaActions.updateArena_thunk({ id, userId, price, name })
    ).catch(async (res) => {
      const data = await res.json();
      if (data && data.errors) setErrors(data.errors);
    });
    await dispatch(arenaActions.getAllArenas_thunk()).then(
      (res) => res && history.push("/arenas")
    );
  };

  return (
    <>
      <section>
        <div>
          <form className="edit-form" onSubmit={handleSubmit}>
            <h3 className="edit-header">Edit Arena</h3>
            <div>
              {errors.map((error, ind) => (
                <div key={ind}>{error}</div>
              ))}
            </div>
            <div>
              <label htmlFor="name">Name</label>
              <input
                className="edit-Arena-input"
                name="name"
                type="input"
                placeholder="Arena Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></input>
              <div>
                <label htmlFor="price">Price</label>
                <input
                  className="edit-Arena-input"
                  name="price"
                  type="number"
                  placeholder="Price"
                  min="1"
                  max="10000"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                ></input>
              </div>
            </div>
            <button className="edit-form-button" type="submit">
              Submit
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default EditArenaForm;
