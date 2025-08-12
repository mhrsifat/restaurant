import React, { useState, useEffect } from "react";
import { orderByReservation } from "../actions/userActions";

// {
//   orderByReservation(item.id).then((res) => {
//     if (res.status === 201) return <p>No courses chosen!</p>;
//     else {
//       <p>abc</p>;
//     }
//   });
// }

const OrderByReservation = (props) => {
  const [order, setOrder] = useState([]);

  useEffect(() => {
    orderByReservation(props.id).then((res) => setOrder(res.data));
  }, []);

  return (
    <div className="order">
      {order === "No products found." ? (
        <p>No courses reserved</p>
      ) : (
        order.map((item) => {
          return (
            <div className="py-4 flex items-center gap-5 border-b border-gray-300">
              <img
                src={item.img}
                alt="food-img"
                className="rounded-full h-20"
              />
              <div>
                <p className="font-semibold">{item.food_name}</p>
                <p>${item.price}</p>
                <p>{item.type}</p>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default OrderByReservation;
