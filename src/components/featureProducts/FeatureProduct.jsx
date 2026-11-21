
import React, { useContext, useState } from "react";
import { Heart } from "lucide-react";
import { MdOutlineStar } from "react-icons/md";
import { PiShoppingCartSimpleBold } from "react-icons/pi";
import { FiMinus, FiPlus } from "react-icons/fi";

import CartContext from "../../context/CartContext";
import styles from "./FeatureProducts.module.css";

function FeatureProduct({ product }) {
  const {
    addToCart,
    cartItems,
    increaseQuantity,
    decreaseQuantity,
  } = useContext(CartContext);

  const variants = product.product_variants || [];
  const hasVariants = variants.length > 0;

  const [selectedVariantId, setSelectedVariantId] = useState(
    () => (variants.find(v => v.is_default) || variants[0])?.id ?? null
  );

  const selectedVariant = hasVariants
    ? variants.find(v => String(v.id) === String(selectedVariantId))
      || variants.find(v => v.is_default)
      || variants[0]
    : null;

  const price = Number(
    selectedVariant?.sale_price ?? product.sale_price
  );

  const mrp = Number(
    selectedVariant?.mrp ?? product.mrp
  );

  const stock = selectedVariant?.stock ?? product.stock;

  const cartProduct = cartItems.find(
    item =>
      String(item.id) === String(product.id) &&
      String(item.variant_id ?? "") ===
        String(selectedVariant?.id ?? "")
  );

  const isInCart = Boolean(cartProduct);
  const outOfStock = stock != null && Number(stock) <= 0;

  const cartKey = selectedVariant
    ? `${product.id}-${selectedVariant.id}`
    : String(product.id);

  const handleAddToCart = (e) => {
    e.stopPropagation();

    if (isInCart || outOfStock) return;

    addToCart({
      ...product,
      quantity: 1,
      variant_id: selectedVariant?.id ?? null,
      variant_name: selectedVariant?.variant_name ?? null,
      weight: selectedVariant?.variant_name ?? product.weight,
      sale_price: price,
      mrp,
      stock,
    });
  };

  const changeQuantity = (e, action) => {
    e.stopPropagation();

    if (action === "increase") {
      increaseQuantity(cartKey);
    } else {
      decreaseQuantity(cartKey);
    }
  };

  return (
    <>
      <div className={styles.featureProductBoxWishlist}>
        <Heart stroke="var(--color-primary)" size={24} />
      </div>

      {mrp > price && (
        <div className={styles.featureProductBoxBadge}>
          {Math.round(((mrp - price) / mrp) * 100)}% OFF
        </div>
      )}

      <div className={styles.featureProductBoxImgWrapper}>
        <img src={product.image_url} alt={product.name} />

        {!isInCart ? (
          <button
            type="button"
            className={styles.mobileCartButton}
            onClick={handleAddToCart}
            disabled={outOfStock}
          >
            <PiShoppingCartSimpleBold size={17} />
            <span>
              {outOfStock ? "Out of Stock" : "Add to Cart"}
            </span>
          </button>
        ) : (
          <div
            className={styles.mobileQtyControl}
            onClick={e => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={e => changeQuantity(e, "decrease")}
              aria-label="Decrease quantity"
            >
              <FiMinus />
            </button>

            <span>{cartProduct.quantity}</span>

            <button
              type="button"
              onClick={e => changeQuantity(e, "increase")}
              disabled={
                stock != null &&
                cartProduct.quantity >= Number(stock)
              }
              aria-label="Increase quantity"
            >
              <FiPlus />
            </button>
          </div>
        )}
      </div>

      <div className={styles.featureProductBoxText}>
        <h3>{product.name}</h3>

        {hasVariants ? (
          <select
            className={styles.variantSelect}
            value={selectedVariant?.id ?? ""}
            onClick={e => e.stopPropagation()}
            onChange={e => {
              e.stopPropagation();
              setSelectedVariantId(e.target.value);
            }}
            aria-label={`Select pack size for ${product.name}`}
          >
            {variants.map(variant => (
              <option key={variant.id} value={variant.id}>
                {variant.variant_name} — ₹{Number(variant.sale_price)}
              </option>
            ))}
          </select>
        ) : (
          <h4 className={styles.featureProductBoxWeight}>
            {product.weight}
          </h4>
        )}

        <div className={styles.featureProductBoxPrice}>
          <h4>₹{price}</h4>

          {mrp > price && (
            <>
              <h5>
                <del>₹{mrp}</del>
              </h5>
              <h6>Save ₹{mrp - price}</h6>
            </>
          )}
        </div>

        {!isInCart ? (
          <button
            type="button"
            style={{ background: "#36014f" }}
            onClick={handleAddToCart}
            disabled={outOfStock}
          >
            <PiShoppingCartSimpleBold size={22} />
            {outOfStock ? "Out of Stock" : "Add to Cart"}
          </button>
        ) : (
          <div className={styles.productQtyChange}>
            <div className={styles.productQtyChangeInner}>
              <div
                onClick={e => changeQuantity(e, "decrease")}
              >
                <FiMinus />
              </div>

              <span>{cartProduct.quantity}</span>

              <div
                onClick={e => {
                  if (
                    stock == null ||
                    cartProduct.quantity < Number(stock)
                  ) {
                    changeQuantity(e, "increase");
                  } else {
                    e.stopPropagation();
                  }
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
