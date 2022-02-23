import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router";
import * as arenaStore from "../../store/arena";
import "../ViewAllArenas/ViewAllArenas.css";
import "./SingleArena.css";
import EditArenaModal from "../EditArenaModal";
function SingleArena() {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const arenas = useSelector((state) => state.arenaReducer.allArenas);
  const [review, setReview] = useState("");
  const [editedReview, setEditedReview] = useState("");
  const [editReviewId, setEditReviewId] = useState("");
  const [editSelected, setEditSelected] = useState([false, null]);
  const [errors, setErrors] = useState([]);
  const userId = user?.id;

  if (!arenas) {
    history.push("/arenas");
  }

  let arena;
  let arenaReviews;
  if (arenas) {
    arena = arenas.filter((arena) => arena["id"] == id)[0];
    arenaReviews = arena?.reviews;
  }

  if (arena) {
    const reviews = arena?.reviews;
    console.log(reviews);
  }

  let content;
  if (userId === arena?.userId) {
    content = (
      <div className="edit-delete">
        {/* <a className="edit-arena-button" href={`/arenas/${arena.id}/edit`}>
          Edit
        </a> */}
        <EditArenaModal />
        <div>
          <button
            className="delete-arena-button"
            onClick={() => deleteArena(id)}
          >
            <i className="far fa-trash-alt"></i>Delete
          </button>
        </div>
      </div>
    );
  }

  const deleteArena = async (id) => {
    await dispatch(arenaStore.deleteArena_thunk({ id }));
    await dispatch(arenaStore.getAllArenas_thunk());
    history.push("/arenas");
  };

  const postReview = async (arenaId) => {
    if ((review.length > 0) & (review.length < 300)) {
      setErrors([]);
      await dispatch(arenaStore.postReview_thunk({ review, userId, arenaId }));
      await dispatch(arenaStore.getAllArenas_thunk());
      setReview("");
    } else {
      return setErrors(["Please provide a review"]);
    }
  };

  let reviewEdit = (
    <div className="edit-review-container">
      <textarea
        id="review-edit-input"
        type="text"
        value={editedReview}
        onChange={(e) => setEditedReview(e.target.value)}
        placeholder=""
      ></textarea>
      <span>
        {/* <div className='edit-review-update-button'> */}
          <button className="edit-review-update-button"
            onClick={() => editReview(editReviewId, editedReview)}
          >
            Update
          </button>
        {/* </div> */}
      </span>
    </div>
  );

  const editReview = async (id) => {
    let reviewId = editReviewId;
    let review = editedReview;
    if (editedReview) {
      await dispatch(arenaStore.editReview_thunk({ reviewId, review }));
      await dispatch(arenaStore.getAllArenas_thunk());
    }
    setEditSelected([false, null]);
  };

  const deleteReview = async (reviewId) => {
    await dispatch(arenaStore.deleteReview_thunk({ reviewId }));
    await dispatch(arenaStore.getAllArenas_thunk());
  };

  useEffect(() => {
    dispatch(arenaStore.getAllArenas_thunk());
  }, [dispatch, id]);

  return (
    <div className="single-post-container">
      <h1 className="single-arena-name">{arena?.name}</h1>
      <div className="review-count">
        <h2 className="review-color">{arena?.reviews.length} review(s)</h2>
      </div>
      <div className="arena-edit-delete">
        <div className="arena-info">
          {arena?.address} {arena?.city}, {arena?.state}
        </div>
        <div>{content}</div>
      </div>
      <div className="images-container">
        <div className="main-image-container">
          <img
            className="arena-main-images1"
            src={arena?.images[0].url}
            alt=""
          />
        </div>
        <div className="small-images-container">
          <img
            className="arena-main-images1"
            id="little-image-top"
            src={arena?.images[1].url}
            alt=""
          />
          <img
            className="arena-main-images1"
            id="little-image-bottom"
            src={arena?.images[2].url}
            alt=""
          />
        </div>
      </div>
      <div className="host-and-price-container">
        <div className="host-arena-small">Hosted by: {arena?.User}</div>
        <div className="arena-price">Price: ${arena?.price}/event</div>
      </div>
      {user && (
        <div className="post-reviews">
          {user.id !== arena?.userId && (
            <ul>
              <div className="review-input">
                <input
                  type="text"
                  className="review-box"
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  placeholder="Leave a review"
                ></input>
              </div>
              <div className="sub">
                <button
                  className="submit-review-button"
                  onClick={() => postReview(arena.id)}
                >
                  Submit
                </button>
                <ul className="label">
                  {errors.map((error, idx) => (
                    <li key={idx}>{error}</li>
                  ))}
                </ul>
              </div>
            </ul>
          )}
        </div>
      )}
      <div className="main-review-container">
        {arenaReviews &&
          arenaReviews?.map((arena, key) => (
            <div className="review-container" key={key}>
              <div className="posted-review-container">
                <p className="posted-by">{arena?.user.username}</p>
                <div className="review-contents">
                  {editSelected[0] && editSelected[1] == arena.id
                    ? reviewEdit
                    : arena?.review}
                </div>
              </div>
              {user?.id == arena?.userId && (
                <div className="edit-delete-button-review">
                  <div className="review-edit-b">
                    <button
                      className="edit-review-arena-button"
                      onClick={() => {
                        setEditedReview(arena.review);
                        setEditReviewId(arena.id);
                        setEditSelected([!editSelected[0], arena.id]);
                      }}
                    >
                      Edit
                    </button>
                  </div>
                  <div className="delete-review-b">
                    <button
                      className="delete-review-button"
                      onClick={() => deleteReview(arena.id)}
                    >
                      <i className="far fa-trash-alt"></i>Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
}

export default SingleArena;
