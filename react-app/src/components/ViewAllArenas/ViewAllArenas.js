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
      <div className="arena-parent-container">
        <div className="arena-location-title">All Arenas</div>
        {arenasArray.map((arena) => {
          return (
            <div className="arena-div" key={arena.id}>
              <div>
                <img
                  className="arena-main-images"
                  onClick={() => history.push(`/arenas/${arena.id}`)}
                  src={arena.images[0]?.url}
                  alt=""
                />
              </div>
              <div className="arena-info-div">
                <div className="arena-title">{arena.name}</div>
                <div className="arena-details">{arena.city},{arena.state}</div>
                <div className="arena-price">${arena.price} /event</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ViewArenas;
