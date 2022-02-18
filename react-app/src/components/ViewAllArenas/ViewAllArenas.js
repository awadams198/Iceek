import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as arenaStore from "../../store/arena";
import "./ViewAllArenas.css";

function ViewArenas() {
  let history = useHistory();
  const arenaReducer = useSelector((state) => state.arenaReducer);
  let arenas = arenaReducer?.allArenas;

  const arenasArray = Object.assign([], arenas);
  console.log(arenas);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(arenaStore.getAllArenas_thunk());
  }, [dispatch]);

  return (
    <div className="top-level-div">
      <div className="berkeley-spots-parent-container">
        <div className="san-francisco-location-title">All Arenas</div>
        {arenasArray.map((arena) => {
          return (
            <div className="berkeley-spots-div" key={arena.id}>
              <div>
                <img
                  className="berkeley-main-images"
                  onClick={() => history.push(`/arenas/${arena.id}`)}
                  src={arena.images[0]?.url}
                  alt=""
                />
              </div>
              <div className="berkeley-spots-info-div">
                <div className="berkeley-spots-title">{arena.name}</div>
                <div className="berkeley-spots-details">{arena.city},{arena.state}</div>
                <div className="berkeley-spots-price">${arena.price} /event</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ViewArenas;
