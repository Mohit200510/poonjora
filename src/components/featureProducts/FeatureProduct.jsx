
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";
import styles from "./FeatureProducts.module.css";

import CartContext from "../../context/CartContext";
import { MdOutlineStar } from "react-icons/md";
import { PiShoppingCartSimpleBold } from "react-icons/pi";
import { FiMinus, FiPlus } from "react-icons/fi";

function FeatureProduct({ product }) {
  const navigate = useNavigate();

  const {
    addToCart,
    cartItems,
    increaseQuantity,
    decreaseQuantity,
  } = useContext(CartContext);

  // Check whether the product has variants
  const hasVariants = product.product_variants?.length > 0;

  // Normal products use their existing cart controls.
  // Variant products are handled on the detail page.
  const cartProduct = hasVariants
    ? null
    : cartItems.find(
        (item) =>
          String(item.id) === String(product.id) &&
          item.variant_id == null
      );

  const isInCart = Boolean(cartProduct);

  const handleAddToCart = (e) => {
    e.stopPropagation();

    if (hasVariants) {
      navigate(`/product/${product.id}`);
      return;
    }

    addToCart({
      ...product,
      quantity: 1,
    });
  };

  return (
    <>
      {/* WISHLIST */}

      <div className={styles.featureProductBoxWishlist}>
        <Heart stroke="var(--color-primary)" size={24} />
      </div>

      {/* DISCOUNT BADGE */}

      <div className={styles.featureProductBoxBadge}>
        23% OFF
      </div>

      {/* PRODUCT IMAGE + MOBILE CART */}

      <div className={styles.featureProductBoxImgWrapper}>
        <img src={product.image_url} alt={product.name} />

        {!isInCart ? (
          <button
            type="button"
            className={styles.mobileCartButton}
            onClick={handleAddToCart}
          >
            <PiShoppingCartSimpleBold size={17} />
            <span>
              {hasVariants ? "Select Options" : "Add to Cart"}
            </span>
          </button>
        ) : (
          <div
            className={styles.mobileQtyControl}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => decreaseQuantity(product.id)}
              aria-label="Decrease quantity"
            >
              <FiMinus />
            </button>

            <span>{cartProduct.quantity}</span>

            <button
              type="button"
              onClick={() => increaseQuantity(product.id)}
              aria-label="Increase quantity"
            >
              <FiPlus />
            </button>
          </div>
        )}
      </div>

      {/* PRODUCT INFORMATION */}

      <div className={styles.featureProductBoxText}>
        <h3>{product.name}</h3>

        <h4 className={styles.featureProductBoxWeight}>
          {product.weight}
        </h4>

        {/* RATING */}

        <div className={styles.featureProductBoxRating}>
          <div>
            <MdOutlineStar />
            <MdOutlineStar />
            <MdOutlineStar />
            <MdOutlineStar />
            <MdOutlineStar />
          </div>

          <span>
            <b>4.8</b> (122)
          </span>
        </div>

        {/* PRICE */}

        <div className={styles.featureProductBoxPrice}>
          <h4>₹{product.sale_price}</h4>

          <h5>
            <del>₹{product.mrp}</del>
          </h5>

          <h6>
            Save ₹{product.mrp - product.sale_price}
          </h6>
        </div>

        {/* DESKTOP CART */}

        {!isInCart ? (
          <button
            type="button"
            style={{ background: "#36014f" }}
            onClick={handleAddToCart}
          >
            <PiShoppingCartSimpleBold size={22} />
            {hasVariants ? "Select Options" : "Add to Cart"}
          </button>
        ) : (
          <div className={styles.productQtyChange}>
            <div className={styles.productQtyChangeInner}>
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  decreaseQuantity(product.id);
                }}
              >
                <FiMinus />
              </div>

              <span>{cartProduct.quantity}</span>

              <div
                onClick={(e) => {
                  e.stopPropagation();
                  increaseQuantity(product.id);
                }}
              >
                <FiPlus />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default FeatureProduct;
