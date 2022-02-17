import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as arenaStore from "../../store/arena";

function ViewArenas() {

  let  history= useHistory();
   const arenaReducer = useSelector((state) => state.arenaReducer);
   let arenas = arenaReducer?.allArenas
 
   const arenasArray = Object.assign([], arenas)
   console.log(arenas)
 
 
   const dispatch = useDispatch();
 
   useEffect(() => {
       dispatch(arenaStore.getAllArenas_thunk());
   }, [dispatch])
 
   return (
       <div className='top-level-div'>
           <div className='arena-container'>
               <div className='arena-title'>All Arenas</div>
               {arenasArray.map(arena => {
                   return <div className='arena-div' key={arena.id}>
                       <div>
                       <img
                     className="feed-image"
                     onClick={() => history.push(`/arenas/${arena.id}`)}
                     src={arena.images[0]?.url}
                     alt=""
                     />
                       </div>
                       <div className=''>
                           <div className='arena-details'>{arena.name}</div>
                           <div className='arena-details'>{arena.city},{arena.state}</div>
                           <div className='arena-price'>${arena.price} /event</div>
                       </div>
                   </div>
 
 
               })}
           </div>
          
       </div>
   )
 }
 
 
 export default ViewArenas;