import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as arenaStore from "../../store/arena";

function ViewArenas() {
  const history = useHistory();
  const dispatch = useDispatch();
  const arenaReducer = useSelector((state) => state.arenaReducer);
  let arenas = arenaReducer?.allArenas
  const [arenaState, setArenaState] = useState(arenas);
  const [isShown, setIsShown] = useState('');



  if(!arenas){
    dispatch(arenaStore.getAllArenas_thunk());
  }

  useEffect(() => {
    dispatch(arenaStore.getAllArenas_thunk());
  }, [dispatch]);


  return (
    <section className="background-container">
      <div className="feed-main-container">
        <div className="feed-buttons">
          <div className="buttons-container">
            <button
              className="button-guy"
              onClick={() => setArenaState(arenaReducer?.allArenas)}
            >
              All Arenas
            </button>
          </div>
        </div>
        <div className="map-and-feed">
          <div className="feed-div">
            {arenaState &&
              arenaState.map((arena, key) => (
                <div
                  className="spot-feed-container"
                  key={key}
                  onMouseEnter={() => setIsShown(arena.id)}
                  onMouseLeave={() => setIsShown("")}


                     >
                  <img
                    className="feed-image"
                    onClick={() => history.push(`/arenas/${arena.id}`)}
                    src={arena.images[0]?.url}
                    alt=""
                  />
                  <div className="spot-details">
                    <div>
                      <span className="spot-name">{arena.name}</span>
                      <p>
                        <span className="review-color">
                          {arena.reviews.length} review(s)
                        </span>
                      </p>
                    </div>
                    <div
                      className={
                        isShown == arena.id
                          ? "show-images-true"
                          : "show-images-false"
                      }
                    >
                      <img
                        className="smaller-image1"
                        src={arena?.images[1]?.url}
                        alt=""
                      />
                      <img
                        className="smaller-image2"
                        src={arena?.images[2]?.url}
                        alt=""
                      />
                    </div>
                    <div className="host-and-price">
                      <p>Hosted by: {arena.User}</p>
                      <p>{"$" + arena.price}/night</p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ViewArenas;