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
           <div className='berkeley-spots-parent-container'>
               <div className='san-francisco-location-title'>All Arenas</div>
               {arenasArray.map(arena => {
                   return <div className='berkeley-spots-div' key={arena.id}>
                       <div>
                       <img
                     className="feed-image"
                     onClick={() => history.push(`/arenas/${arena.id}`)}
                     src={arena.images[0]?.url}
                     alt=""
                     />
                       </div>
                       <div className='berkeley-arena-info-div'>
                           <div className='berkeley-arena-details'>{arena.name}</div>
                           <div className='berkeley-arena-details'>{arena.city},{arena.state}</div>
                           <div className='berkeley-arena-price'>${arena.price} /event</div>
                       </div>
                   </div>
 
 
               })}
           </div>
            {/* <div className='berkeley-map-parent-container'>
               <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26361348.14090973!2d-113.75721884302386!3d36.240999911993384!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54eab584e432360b%3A0x1c3bb99243deb742!2sUnited%20States!5e0!3m2!1sen!2sus!4v1636756177169!5m2!1sen!2sus" title='allspot' className='berkeley-map'></iframe>
           </div> */}
       </div>
   )
 }
 
 
 export default ViewArenas;