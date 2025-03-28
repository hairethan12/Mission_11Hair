import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { CartItem } from "../types/CartItem";

function CartPage() {
  const navigate = useNavigate();
  const { cart, removeFromCart } = useCart();
  return (
    <div>
      <h2>Your Cart</h2>
      <div>
        {cart.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <ul>
            {cart.map((item: CartItem) => (
              <li key={item.bookId}>
                {item.title}: (${item.price.toFixed(2)} x {item.quantity ?? 1})
                =
                <strong>
                  {" "}
                  ${(item.price * (item.quantity ?? 1)).toFixed(2)}
                </strong>
                <button
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  title="This will remove one book from your cart"
                  onClick={() => removeFromCart(item.bookId)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <h3>
        Total: $
        {cart
          .reduce((sum, item) => sum + item.price * item.quantity, 0)
          .toFixed(2)}
      </h3>
      <button
        data-bs-toggle="tooltip"
        data-bs-placement="top"
        title="This will take you to checkout"
      >
        Checkout
      </button>
      <button
        data-bs-toggle="tooltip"
        data-bs-placement="top"
        title="This take you back to the book list"
        onClick={() => navigate("/books")}
      >
        Continue Browsing
      </button>
    </div>
  );
}

export default CartPage;
