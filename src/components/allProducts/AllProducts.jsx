
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Heart, Sparkles } from "lucide-react";
import { supabase } from "../../supabaseClient";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import styles from "./AllProducts.module.css";
import collectionBanner from "../../assets/allproductsbanner3.png";

export default function AllProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { addToCart } = useContext(CartContext);

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
    return () => { active = false; };
  }, []);

  const discountPercent = (price, mrp) => {
    if (!mrp || Number(mrp) <= Number(price)) return 0;
    return Math.round(((mrp - price) / mrp) * 100);
  };

  return (
    <main className={styles.page}>
      <section
        className={styles.hero}
        style={{ "--hero-image": `url(${collectionBanner})` }}
      >
        <div className={styles.heroInner}>
          <div className={styles.breadcrumb}>
            <Link to="/">Home</Link>
            <span>›</span>
            <span>Products</span>
          </div>

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

      <section className={styles.collection}>
        <div className={styles.container}>
          <div className={styles.collectionHeader}>
            <p>
              {loading ? "Loading products..." : `${products.length} Products`}
            </p>
          </div>

          {error && <p className={styles.message}>{error}</p>}

          {!loading && !error && products.length === 0 && (
            <p className={styles.message}>No products available yet.</p>
          )}

          <div className={styles.productGrid}>
            {products.map((product) => {
              const discount = discountPercent(
                Number(product.sale_price),
                Number(product.mrp)
              );

              return (
                <article className={styles.productCard} key={product.id}>
                  <div className={styles.imageWrapper}>
                    <Link to={`/product/${product.id}`}>
                      <img
                        src={product.image_url}
                        alt={product.name}
                        loading="lazy"
                      />
                    </Link>

                    {discount > 0 && (
                      <span className={styles.discountBadge}>
                        {discount}% OFF
                      </span>
                    )}
                  </div>

                  <div className={styles.productInfo}>
                    <Link
                      to={`/product/${product.id}`}
                      className={styles.productName}
                    >
                      {product.name}
                    </Link>

                    {product.weight && (
                    <span className={styles.productWeight}>
                    {product.weight}
                     </span>
                    )}

                    <div className={styles.priceRow}>
                      <strong>
                        ₹{Number(product.sale_price).toLocaleString("en-IN")}
                      </strong>

                      {discount > 0 && (
                        <>
                          <del>
                            ₹{Number(product.mrp).toLocaleString("en-IN")}
                          </del>

                          <span className={styles.saving}>
                            {discount}% OFF
                          </span>
                        </>
                      )}
                    </div>

                    <button
                      className={styles.cartButton}
                      type="button"
                      onClick={() => addToCart(product)}
                    >
                      <ShoppingCart size={17} />
                      Add to Cart
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className={styles.trustStrip}>
        <div>✿ Authentic & Premium Quality</div>
        <div>♧ Pan India Delivery</div>
        <div>♢ Secure Payments</div>
        <div>✿ Trusted by Families</div>
      </section>
    </main>
  );
}
