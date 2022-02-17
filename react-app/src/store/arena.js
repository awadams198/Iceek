const ALL_ARENAS = 'arena/ALL_ARENAS'
const ADD_ARENA = 'arena/ADD_ARENA'
const ONE_ARENA = 'arena/ONE_ARENA'
const DELETE_ARENA = 'arena/DELETE_ARENA'

const allArenas = (payload) => ({
    type: ALL_ARENAS,
    payload,
})

const addArena = (payload) => ({
    type: ADD_ARENA,
    payload
})

const singleArena = (payload) => ({
  type: ONE_ARENA,
  payload,
});

const deleteArena = (payload) => ({
  type: DELETE_ARENA,
  payload,
});



//GET ALL ARENAS
export const getAllArenas_thunk = () => async (dispatch) => {
  const res = await fetch(`/api/arenas/`);

  if (res.ok) {
    const arenas = await res.json();
    dispatch(allArenas(arenas));
    return arenas;
  }
};


//GET ONE ARENA
export const getOneArena_thunk = (id) => async (dispatch) => {
  const res = await fetch(`/api/arenas/${id}`);

  if (res.ok) {
    const arena = await res.json();
    dispatch(singleArena(arena));
    return arena;
  }
};

//ADD A ARENA
export const addArena_thunk =
  ({ userId, city, country, price, state, images, address, name, url }) =>
  async (dispatch) => {
    const res = await fetch("/api/arenas/new/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        city,
        country,
        price,
        state,
        images,
        address,
        name,
        url,
      }),
    });

    if (res.ok) {
      const arena = await res.json();
      dispatch(addArena(arena));
      return arena;
    }
  };

  //UPDATE ARENA
  export const updateArena_thunk =
    ({ id, userId, price, name }) =>
    async (dispatch) => {
      
      const res = await fetch(`/api/arenas/${id}/edit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          price,
          name,
        }),
      });

      if (res.ok) {
        const arena = await res.json();
        dispatch(addArena(arena));
        return arena;
      }
    };

  // DELETE ARENA
  export const deleteArena_thunk = ({ id }) => async (dispatch) => {
    const res = await fetch(`/api/arenas/${id}`, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id
      })
    });

    if (res.ok) {
      const deletedArena = await res.json();
      dispatch(deleteArena(deletedArena));
      return "Deleted";
    }
  };



//ARENA REDUCER
const arenaReducer = (state = {}, action) => {
  switch (action.type) {
    case ALL_ARENAS: {
      const newState = { ...state };
      newState["allArenas"] = action.payload;
      return newState;
    }
    case ONE_ARENA: {
      const newState = { ...state };
      newState["oneArena"] = action.payload;
      return newState;
    }
    case DELETE_ARENA: {
      const newState = { ...state };
      delete newState[action.payload];
      return newState;
    }
    default:
      return state;
  }
};

export default arenaReducer;