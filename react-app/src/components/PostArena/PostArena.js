import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { login } from "../../store/session";
import * as arenaStore from "../../store/arena"
import * as postActions from "../../store/arena";
import isURL from "validator/lib/isURL";
import isCurrency from "validator/lib/isCurrency";

const CreateArenaForm = () => {
    const [errors, setErrors] = useState([]);
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [price, setPrice] = useState("");
    const [state, setState] = useState("");
    const [address, setAddress] = useState("");
    const [name, setName] = useState("");
    const [url, setUrl] = useState();
    const [image1, setImage1] = useState("")
    const [image2, setImage2] = useState("");
    const [image3, setImage3] = useState("");
    const user = useSelector((state) => state.session.user);
    const dispatch = useDispatch();
    const history = useHistory();
    
    if(!user) {
        history.push('/arenas')
      }
      const handleSubmit = async (e) => {
        e.preventDefault();
        const userId = user.id;
        setUrl({"1":image1, "2":image2, "3":image3})
        const validationErrors = []
        if(!name || name.length > 40){
          validationErrors.push("Arena name must be between 1 and 40 characters.")
        }
        if (!address || address.length > 40) {
          validationErrors.push("Address must be between 1 and 40 characters.");
        }
        if(!city || city.length > 20) {
          validationErrors.push("City must be between 1 and 20 characters.");
        }
        if(!state || state.length > 20){
          validationErrors.push("Please enter valid state.");
        }
        if (!country || country.length > 20) {
          validationErrors.push("Country must be between 1 and 20 characters.");
        }
        if (!price || !isCurrency(price) || price > 1000) {
          validationErrors.push(
            "Please enter a valid price between $1 and $1,000"
          );
        }
        if(!isURL(image1) || !isURL(image2) || !isURL(image3)){
          validationErrors.push("Please input a valid image URL.")
        }
        if (!/\.(jpe?g|png|gif|bmp)$/gi.test(image1) || !/\.(jpe?g|png|gif|bmp)$/gi.test(image2) || !/\.(jpe?g|png|gif|bmp)$/gi.test(image3)) {
          validationErrors.push("Must be a valid image url format (.jpeg, .png, .gif, .bmp");
        }

        setErrors(validationErrors);

        if (!validationErrors.length) {
          await dispatch(
            postActions.addArena_thunk({
              userId,
              city,
              country,
              price,
              state,
              address,
              name,
              url,
            })
          ).catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) setErrors(data.errors);
          });
          await dispatch(arenaStore.getAllArenas_thunk()).then(
            (res) => res && history.push("/arenas")
          );
        }
      };

      useEffect(() => {
        dispatch(arenaStore.getAllArenas_thunk());
        setUrl({ 1: image1, 2: image2, 3: image3 });
      }, [dispatch, image1, image2, image3]);
  
    let content;
    let content2;
    let content3;
  
    if (image1) {
      content = <img alt="" className="post-image-preview" src={image1} />;
    }
  
    if (image2) {
      content2 = <img alt="" className="post-image-preview" src={image2} />;
    }
  
    if (image3) {
      content3 = <img alt="" className="post-image-preview" src={image3} />;
    }

    return (
        <section className="section-container">
          <div className="form-container">
            <form className="main-form-container" onSubmit={handleSubmit}>
              <h3 className="new-arena-header">Add an Arena</h3>
              <div className="error-list-container">
                <ul className="error-list">
                {errors.map((error, ind) => (
                  <li className="errors" key={ind}>{error}</li>
                ))}
                </ul>
              </div>
              <div className="input-field-new">
                <input
                  className="new-arena-input"
                  name="name"
                  type="input"
                  placeholder="Arena Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></input>
              </div>
              <div className="input-field-new">
                <input
                  className="new-arena-input"
                  name="address"
                  type="input"
                  placeholder="Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                ></input>
              </div>
              <div className="input-field-new">
                <input
                  className="new-arena-input"
                  name="city"
                  type="input"
                  placeholder="City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                ></input>
              </div>
              <div className="input-field-new">
                <input
                  className="new-arena-input"
                  name="state"
                  type="input"
                  placeholder="State"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                ></input>
              </div>
    
              <div className="input-field-new">
                <input
                  className="new-arena-input"
                  name="country"
                  type="input"
                  placeholder="Country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                ></input>
              </div>
              <div>
                <label>
                  Please select a renting price:
                  <input
                    className="rent-price"
                    name="price"
                    type="number"
                    placeholder="Price"
                    min="0"
                    max="1000"
                    step="25"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  ></input>
                </label>
              </div>
              <h2 className="new-post-photo-header">Please add three images:</h2>
              <div className="new-post-photo-container">
                <div className="content1-container">
                  {content}
                  <input
                    type="url"
                    placeholder="Main image URL"
                    className="new-arena-input"
                    onChange={(e) => {
                      setImage1(e.target.value);
                    }}
                    required
                  />
                </div>
                <div className="content1-container">
                  {content2}
                  <input
                    type="url"
                    className="new-arena-input"
                    placeholder="Additional Image"
                    onChange={(e) => {
                      setImage2(e.target.value);
                    }}
                    required
                  />
                </div>
                <div className="content1-container">
                  {content3}
                  <input
                    type="url"
                    className="new-arena-input"
                    placeholder="Additional Image"
                    onChange={(e) => {
                      setImage3(e.target.value);
                    }}
                    required
                  />
                </div>
              </div>
              <button className="post-arena-form-button" type="submit">
                Post Arena
              </button>
            </form>
          </div>
        </section>
      );
    };
    
    export default CreateArenaForm;