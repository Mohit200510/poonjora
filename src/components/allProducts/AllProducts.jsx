
import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import {
  ShoppingCart,
  Heart,
  Sparkles,
  Minus,
  Plus,
  BadgeCheck,
  Truck,
  ShieldCheck,
  HeartHandshake,
} from "lucide-react";

import { supabase } from "../../supabaseClient";
import { CartContext } from "../../context/CartContext";

import styles from "./AllProducts.module.css";
import mobile from "./AllProductsMobile.module.css";

import collectionBanner from "../../assets/allproductsbanner3.png";

export default function AllProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const {
    addToCart,
    cartItems,
    increaseQuantity,
    decreaseQuantity,
  } = useContext(CartContext);

  useEffect(() => {
    let active = true;

    async function loadProducts() {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (!active) return;

      if (error) {
        setError("Unable to load products. Please try again.");
      } else {
        setProducts(data || []);
      }

      setLoading(false);
    }

    loadProducts();

    return () => {
      active = false;
    };
  }, []);

  const discountPercent = (price, mrp) => {
    if (!mrp || Number(mrp) <= Number(price)) return 0;

    return Math.round(((mrp - price) / mrp) * 100);
  };

  return (
    <main className={styles.page}>
      {/* HERO */}

     <div className={styles.breadcrumbBar}>
     <div className={styles.breadcrumb}>
      <Link to="/">Home</Link>
      <span>›</span>
       <span>Products</span>
     </div>
    </div>

<section
  className={`${styles.hero} ${mobile.mobileHero}`}
  style={{ "--hero-image": `url(${collectionBanner})` }}
>
  <div className={`${styles.heroInner} ${mobile.mobileHeroInner}`}>
    <div className={styles.heroOrnament}>
      <span />
      <Sparkles size={20} />
      <span />
    </div>

    <h1>Our Sacred Collection</h1>

    <p>
      Discover authentic puja essentials to bring positivity,
      peace and prosperity to your home.
    </p>


  </div>
</section>

      {/* PRODUCTS */}

      <section className={styles.collection}>
        <div className={styles.container}>
          <div className={styles.collectionHeader}>
            <p>
              {loading
                ? "Loading products..."
                : `${products.length} Products`}
            </p>
          </div>

          {error && (
            <p className={styles.message}>{error}</p>
          )}

          {!loading && !error && products.length === 0 && (
            <p className={styles.message}>
              No products available yet.
            </p>
          )}

          <div
            className={`${styles.productGrid} ${mobile.mobileGrid}`}
          >
            {products.map((product) => {
              const price = Number(product.sale_price);
              const mrp = Number(product.mrp);

              const discount = discountPercent(price, mrp);

              const cartProduct = cartItems.find(
                (item) =>
                  String(item.id) === String(product.id)
              );

              const isInCart = Boolean(cartProduct);

              return (
                <article
                  key={product.id}
                  className={`${styles.productCard} ${mobile.mobileCard}`}
                >
                  {/* IMAGE */}

                  <div
                    className={`${styles.imageWrapper} ${mobile.mobileImageWrapper}`}
                  >
                    <Link to={`/product/${product.id}`}>
                      <img
                        src={product.image_url}
                        alt={product.name}
                        loading="lazy"
                      />
                    </Link>

                    {/* WISHLIST ICON */}

                    <span
                      className={`${styles.wishlistIcon} ${mobile.mobileWishlistIcon}`}
                      aria-label="Wishlist"
                    >
                      <Heart size={19} />
                    </span>

                    {/* DISCOUNT */}

                    {discount > 0 && (
                      <span
                        className={`${styles.discountBadge} ${mobile.mobileBadge}`}
                      >
                        {discount}% OFF
                      </span>
                    )}

                    {/* MOBILE CART */}

                    {!isInCart ? (
                      <button
                        type="button"
                        className={mobile.mobileCartButton}
                        onClick={() => addToCart(product)}
                      >
                        <ShoppingCart size={15} />
                        <span>Add to Cart</span>
                      </button>
                    ) : (
                      <div className={mobile.mobileQtyControl}>
                        <button
                          type="button"
                          onClick={() =>
                            decreaseQuantity(product.id)
                          }
                          aria-label={`Decrease ${product.name} quantity`}
                        >
                          <Minus size={15} />
                        </button>

                        <span>{cartProduct.quantity}</span>

                        <button
                          type="button"
                          onClick={() =>
                            increaseQuantity(product.id)
                          }
                          aria-label={`Increase ${product.name} quantity`}
                        >
                          <Plus size={15} />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* PRODUCT INFO */}

                  <div
                    className={`${styles.productInfo} ${mobile.mobileInfo}`}
                  >
                    <Link
                      to={`/product/${product.id}`}
                      className={`${styles.productName} ${mobile.mobileName}`}
                    >
                      {product.name}
                    </Link>

                    {product.weight && (
                      <span
                        className={`${styles.productWeight} ${mobile.mobileWeight}`}
                      >
                        {product.weight}
                      </span>
                    )}

                    {/* PRICE */}

                    <div
                      className={`${styles.priceRow} ${mobile.mobilePrice}`}
                    >
                      <strong>
                        ₹{price.toLocaleString("en-IN")}
                      </strong>

                      {discount > 0 && (
                        <>
                          <del>
                            ₹{mrp.toLocaleString("en-IN")}
                          </del>

                          <span
                            className={`${styles.saving} ${mobile.mobileSaving}`}
                          >
                            {discount}% OFF
                          </span>
                        </>
                      )}
                    </div>

                    {/* DESKTOP CART */}

                    {!isInCart ? (
                      <button
                        type="button"
                        className={styles.cartButton}
                        onClick={() => addToCart(product)}
                      >
                        <ShoppingCart size={17} />
                        Add to Cart
                      </button>
                    ) : (
                      <div className={styles.desktopQtyControl}>
                        <button
                          type="button"
                          onClick={() =>
                            decreaseQuantity(product.id)
                          }
                          aria-label={`Decrease ${product.name} quantity`}
                        >
                          <Minus size={18} />
                        </button>

                        <span>{cartProduct.quantity}</span>

                        <button
                          type="button"
                          onClick={() =>
                            increaseQuantity(product.id)
                          }
                          aria-label={`Increase ${product.name} quantity`}
                        >
                          <Plus size={18} />
                        </button>


                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}

<section className={styles.trustStrip}>
  
  <div className={styles.trustItem}>
    <BadgeCheck size={26} strokeWidth={1.7} />
    <span>Authentic Quality</span>
  </div>

  <div className={styles.trustItem}>
    <Truck size={26} strokeWidth={1.7} />
    <span>Pan India Delivery</span>
  </div>

  <div className={styles.trustItem}>
    <ShieldCheck size={26} strokeWidth={1.7} />
    <span>Secure Payments</span>
  </div>

  <div className={styles.trustItem}>
    <HeartHandshake size={26} strokeWidth={1.7} />
    <span>Trusted by Families</span>
  </div>

</section>

    </main>
  );
}
