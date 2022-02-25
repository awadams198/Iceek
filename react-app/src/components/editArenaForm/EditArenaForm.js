import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { useParams } from "react-router";
import isCurrency from "validator/lib/isCurrency";
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
  const [address, setAddress] = useState(currentArena?.address);
  const [imageOne, setImageOne] = useState(currentArena?.images[0]?.url);
  const [imageTwo, setImageTwo] = useState(currentArena?.images[1]?.url);
  const [imageThree, setImageThree] = useState(currentArena?.images[2]?.url);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userId = user.id;
    const validationErrors = [];

    if (!name) {
      validationErrors.push("Arena name must be between 1 and 40 characters.");
    } else if (!price) {
      validationErrors.push("Please enter a valid price between $1 and $1,000");
    } else if (!address) {
      validationErrors.push("---address can't be empty---");
    } else if (
      imageOne.length == 0 ||
      imageTwo.length == 0 ||
      imageThree.length == 0
    ) {
      validationErrors.push("Please enter a valid image URL");
    } else if (
      !/\.(jpe?g|png|gif|bmp)$/gi.test(imageOne) ||
      !/\.(jpe?g|png|gif|bmp)$/gi.test(imageTwo) ||
      !/\.(jpe?g|png|gif|bmp)$/gi.test(imageThree)
    ) {
      validationErrors.push(
        "Must be a valid image URL  (.jpeg, .png, .gif, .bmp---"
      );
    }

    setErrors(validationErrors);

    if (!validationErrors.length) {
      await dispatch(
        arenaActions.updateArena_thunk({
          id,
          userId,
          price,
          name,
          address,
          imageOneId: currentArena?.images[0]?.id,
          imageOneUrl: imageOne,
          imageTwoId: currentArena?.images[1]?.id,
          imageTwoUrl: imageTwo,
          imageThreeId: currentArena?.images[2]?.id,
          imageThreeUrl: imageThree,
        })
      ).catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
      await dispatch(arenaActions.getAllArenas_thunk()).then(
        (res) => res && history.push("/arenas")
      );
    }
  };

  return (
    <>
      <section>
        <div>
          <form className="edit-form" onSubmit={handleSubmit}>
            <h3 className="edit-header">Edit Arena</h3>
            <div className="error-msg">
              {errors.map((error, ind) => (
                <div key={ind}>{error}</div>
              ))}
            </div>
            <div className="edit-form-name">
              <label htmlFor="name">Name</label>
              <input
                className="edit-Arena-input"
                name="name"
                type="input"
                placeholder="Arena Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></input>
              <div className="edit-form-price">
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
              <div>
                <label className="edit-header"> Address </label>
                <input
                  className="edit-Home-input"
                  name="address"
                  type="input"
                  placeholder="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                ></input>
              </div>
              <div>
                <label className="edit-header"> Image One</label>
                <input
                  className="edit-Home-input"
                  name="image-one"
                  type="input"
                  placeholder="Image URL"
                  value={imageOne}
                  onChange={(e) => setImageOne(e.target.value)}
                ></input>
              </div>
              <div>
                <label className="edit-header"> Image Two</label>
                <input
                  className="edit-Home-input"
                  name="image-two"
                  type="input"
                  placeholder="Image URL"
                  value={imageTwo}
                  onChange={(e) => setImageTwo(e.target.value)}
                ></input>
              </div>
              <div>
                <label className="edit-header"> Image Three</label>
                <input
                  className="edit-Home-input"
                  name="image-three"
                  type="input"
                  placeholder="Image URL"
                  value={imageThree}
                  onChange={(e) => setImageThree(e.target.value)}
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
