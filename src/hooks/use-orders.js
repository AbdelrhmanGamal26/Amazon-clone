import { getDatabase, ref, child, push, update } from "firebase/database";
import { useSelector } from "react-redux";

export default function useOrders() {
  const { cart } = useSelector((state) => state.cartData);
  const { userId } = useSelector((state) => state.userData);

  function updateUserData(cart) {
    const db = getDatabase();

    const newOrderKey = push(child(ref(db), userId)).key;

    const updates = {};
    updates["/orders/" + userId + "/" + newOrderKey] = cart;

    return update(ref(db), updates);
  }

  return {
    updateUserData,
    cart,
  };
}
