import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  ArrowRight,
  Package,
  PackageCheck,
  ChevronRight,
  ImageOff,
  RefreshCw,
} from "lucide-react";

import { supabase } from "../../supabaseClient";
import styles from "./PujaKits.module.css";

export default function PujaKits() {
  const [kits, setKits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [retry, setRetry] = useState(0);

  useEffect(() => {
    let active = true;

    async function loadKits() {
      setLoading(true);
      setError("");

      try {
        const { data, error: fetchError } = await supabase
          .from("puja_kit_details")
          .select(`
            product_id,
            slug,
            included_items,
            products!inner (
              id,
              name,
              image_url,
              sale_price,
              mrp,
              stock,
              category
            )
          `)
          .eq("is_published", true)
          .eq("products.category", "Puja Kits")
          .order("created_at", { ascending: false });

        if (fetchError) throw fetchError;

        if (active) {
          setKits(data || []);
        }
      } catch (err) {
        console.error("Unable to load Puja Kits:", err);

        if (active) {
          setError("Unable to load Puja Kits. Please try again.");
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    loadKits();

    return () => {
      active = false;
    };
  }, [retry]);

  const formatPrice = (price) =>
    Number(price).toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
      minimumFractionDigits: 0,
    });

  return (
    <main className={styles.page}>
      <Helmet>
        <title>
          Buy Puja Kits Online | Complete Puja Samagri Kits | Poonjora
        </title>

        <meta
          name="description"
          content="Explore thoughtfully curated Puja Kits from Poonjora. Discover essential puja samagri, detailed kit contents and traditional worship essentials for sacred occasions."
        />

        <link
          rel="canonical"
          href="https://poonjora.in/puja-kits"
        />
      </Helmet>

      {/* BREADCRUMB */}

      <div className={styles.container}>
        <nav
          className={styles.breadcrumb}
          aria-label="Breadcrumb"
        >
          <Link to="/">Home</Link>
          <ChevronRight size={14} />
          <span aria-current="page">Puja Kits</span>
        </nav>
      </div>

      {/* HERO */}

      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <p className={styles.heroEyebrow}>
            Faith &amp; Devotion
          </p>

          <h1>Sacred Puja Kits</h1>

          <p className={styles.hindiHeading}>
            संपूर्ण पूजा सामग्री किट
          </p>

          <p className={styles.heroDescription}>
            Thoughtfully curated for your sacred rituals.
          </p>
        </div>
      </section>

      {/* COLLECTION */}

      <section className={styles.collection}>
        <div className={styles.container}>
          <div className={styles.collectionHeader}>
            <div>
              <h2>Explore Puja Kits</h2>

              <p>
                Find the right puja samagri for your sacred occasion.
              </p>
            </div>

            {!loading && !error && (
              <span className={styles.productCount}>
                {kits.length} {kits.length === 1 ? "Kit" : "Kits"}
              </span>
            )}
          </div>

          {/* LOADING */}

          {loading && (
            <div
              className={styles.productList}
              aria-label="Loading Puja Kits"
              aria-busy="true"
            >
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className={styles.skeletonCard}
                >
                  <div className={styles.skeletonImage} />

                  <div className={styles.skeletonContent}>
                    <div className={styles.skeletonLine} />
                    <div className={styles.skeletonShort} />
                    <div className={styles.skeletonButton} />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ERROR */}

          {!loading && error && (
            <div className={styles.message} role="alert">
              <Package size={38} />

              <p>{error}</p>

              <button
                type="button"
                className={styles.retryButton}
                onClick={() => setRetry((value) => value + 1)}
              >
                <RefreshCw size={16} />
                Try Again
              </button>
            </div>
          )}

          {/* EMPTY STATE */}

          {!loading && !error && kits.length === 0 && (
            <div className={styles.message}>
              <Package size={42} />

              <h3>New Puja Kits Coming Soon</h3>

              <p>
                Our Puja Kit collection is currently being prepared.
              </p>

              <Link
                to="/collections/products"
                className={styles.retryButton}
              >
                Explore Puja Essentials
                <ArrowRight size={16} />
              </Link>
            </div>
          )}

          {/* PUJA KIT CARDS */}

          {!loading && !error && kits.length > 0 && (
            <div className={styles.productList}>
              {kits.map((kit) => {
                const product = kit.products;

                const productUrl = `/puja-kits/${kit.slug}`;

                const price = Number(product.sale_price);
                const mrp = Number(product.mrp);

                const hasDiscount = mrp > price && price > 0;

                const discount = hasDiscount
                  ? Math.round(((mrp - price) / mrp) * 100)
                  : 0;

                const inStock = Number(product.stock) > 0;

                const itemCount = Array.isArray(kit.included_items)
                  ? kit.included_items.length
                  : 0;

                return (
                  <article
                    key={kit.product_id}
                    className={styles.productCard}
                  >
                    <Link
                      to={productUrl}
                      className={styles.imageWrapper}
                      aria-label={`View ${product.name}`}
                    >
                      <KitImage
                        src={product.image_url}
                        alt={product.name}
                      />

                      {discount > 0 && (
                        <span className={styles.discountBadge}>
                          {discount}% OFF
                        </span>
                      )}
                    </Link>

                    <div className={styles.productInfo}>
                      <Link
                        to={productUrl}
                        className={styles.productName}
                      >
                        {product.name}
                      </Link>

                      {itemCount > 0 && (
                        <div className={styles.itemCount}>
                          <PackageCheck size={16} />
                          {itemCount} Samagri Items
                        </div>
                      )}

                      <div className={styles.purchaseInfo}>
                        <div className={styles.priceStockRow}>
                        <div className={styles.priceRow}>
                          <strong>{formatPrice(price)}</strong>

                          {hasDiscount && (
                            <del>{formatPrice(mrp)}</del>
                          )}
                        </div>

                        <span
                          className={
                            inStock
                              ? styles.inStock
                              : styles.outOfStock
                          }
                        >
                          <span className={styles.stockDot} />

                          {inStock ? "In Stock" : "Out of Stock"}
                        </span>
                        </div>

                        <Link
                          to={productUrl}
                          className={styles.viewButton}
                        >
                          View Kit
                          <ArrowRight size={17} />
                        </Link>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

function KitImage({ src, alt }) {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setFailed(false);
  }, [src]);

  if (!src || failed) {
    return (
      <div className={styles.imageFallback}>
        <ImageOff size={36} />
        <span>Image unavailable</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
    />
  );
}
