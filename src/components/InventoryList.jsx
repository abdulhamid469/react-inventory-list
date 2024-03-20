import { useReducer, useEffect } from "react";
import { inventoryReducer, initialState } from "../reducer/inventoryReducer";
import { FETCH_ACTIONS } from "../actions";

import axios from "axios";

const InvertoryList = () => {

  const [state, dispatch] = useReducer(inventoryReducer, initialState);

  const { items, loading, error } = state;

  // console.log(items, loading, error);

  useEffect(() => {
    dispatch({type: FETCH_ACTIONS.PROGRESS});
    const getItems = async () => {
      try {
        let response = await axios.get("http://localhost:3000/edibles");
        if(response.status === 200) {
          // console.log(response);
          dispatch({type: FETCH_ACTIONS.SUCCESS, data: response.data});
        }
      } catch (err) {
        // console.log(err);
        dispatch({type: FETCH_ACTIONS.ERROR, error: err.message});
      }
    }

    getItems();
  }, []);

  return (
    <div className="sm:w-1/2 w-11/12 m-auto flex flex-col justify-center py-4">
      {
        loading ? (
          <p>Loading...!</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
         <div>
            <h2 className="text-3xl py-3">List Items</h2>
           <ul className="grid sm:grid-cols-2 gap-4 grid-cols-1">
            {
              items.map((item) => (
                <li key={item.id} className="flex items-center p-4 border border-gray-600 rounded bg-green-100">
                  <div>
                    <p>Fruite Name: <mark>{item.name}</mark> {item.picture} </p>
                    <p>Fruicte Price Rs: {item.price}</p>
                    <p>Fruite Type: {item.type}</p>
                    <p>Availiable in Stock: <span className="text-red-500">{item.quantity}</span></p>
                  </div>
                </li>
              ))
            }
          </ul>
         </div>
        )
      }
    </div>
  )
}

export default InvertoryList;