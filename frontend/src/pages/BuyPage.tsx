import { useNavigate, useParams } from "react-router-dom";
import WelcomeBand from "../components/WelcomeBand";
import { useCart } from "../context/CartContext";
import { CartItem } from "../types/CartItem";

function BuyPage() {
  const navigate = useNavigate();
  const { title, bookId, price: priceParam } = useParams();
  const { addToCart } = useCart();
  const parsedBookId = Number(bookId);
  const parsedPrice = Number(priceParam);

  if (isNaN(parsedBookId) || isNaN(parsedPrice)) {
    return <p>Invalid book details. Please return to the books page.</p>;
  }

  const handleAddToCart = () => {
    const newItem: CartItem = {
      bookId: parsedBookId,
      title: title || "No Book Found",
      price: parsedPrice,
      quantity: 1,
    };
    addToCart(newItem);
    navigate("/cart");
  };

  return (
    <>
      <WelcomeBand />
      <h2>Buy {title}</h2>

      <div>
        <p>Price: ${parsedPrice.toFixed(2)}</p>
        <button
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title="This adds the book to your cart"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      </div>

      <button
        data-bs-toggle="tooltip"
        data-bs-placement="top"
        title="This goes back to the book list"
        onClick={() => navigate("/books")}
      >
        Go Back
      </button>
    </>
  );
}

export default BuyPage;
