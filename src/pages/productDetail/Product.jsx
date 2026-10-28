import React, { useEffect, useState, useContext } from "react";
import styles from "./Product.module.css";
import { useParams } from "react-router-dom";
import { supabase } from "../../supabaseClient";
import Container from "../../components/common/Container";
import { CartContext } from "../../context/CartContext"; // Adjust path if needed
import { BiLeaf } from "react-icons/bi";
import { FaShippingFast } from "react-icons/fa";
import { MdOutlineLock } from "react-icons/md";
import PincodeChecker from "../../components/common/pincodeChecker/PincodeChecker";
import ProductSkeleton from "./productSkeleton/ProductSkeleton";

function Product() {
  const { id } = useParams();
  const { addToCart, cartItems } = useContext(CartContext);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError("");
    setProduct(null);
    setQuantity(1);
    setActiveImage(0);

    const fetchProduct = async () => {
      const { data, error: fetchError } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single();

      if (cancelled) return;
      if (fetchError) {
        console.error("Product fetch failed:", fetchError);
        setError("We couldn't load this product. Please try again.");
      } else {
        setProduct(data);
      }
      setLoading(false);
    };
    fetchProduct();
    return () => { cancelled = true; };
  }, [id]);

  if (loading) return <ProductSkeleton />;
  if (error || !product) {
    return <main className={styles.productError}>{error || "Product not found."}</main>;
  }

  const salePrice = Number(product.sale_price) || 0;
  const mrp = Number(product.mrp) || 0;
  const discount = mrp > salePrice && mrp > 0
    ? Math.round(((mrp - salePrice) / mrp) * 100)
    : 0;
  const alreadyInCart = cartItems.some((item) => String(item.id) === String(product.id));
  const galleryImages = [product.image_url].filter(Boolean);
  // Add real product.gallery_images URLs here when your database supports them.

  const handleAddToCart = () => {
    if (alreadyInCart) return;
    // CartContext must use product.quantity when creating a cart item.
    addToCart({ ...product, quantity });
  };

  return (
    <main className={styles.productDetail}>
      <section className={styles.productHero}>
        <Container>
          <div className={styles.productHeroContent}>
            <div className={styles.productVisualMain}>
              {galleryImages.length > 1 && (
                <div className={styles.productGallery}>
                  <div className={styles.productGalleryContainer}>
                    {galleryImages.map((image, index) => (
                      <button
                        type="button"
                        key={`${image}-${index}`}
                        className={`${styles.productGalleryBox} ${activeImage === index ? styles.productGalleryBoxSelected : ""}`}
                        onClick={() => setActiveImage(index)}
                        aria-label={`View product image ${index + 1}`}
                      >
                        <img src={image} alt={`${product.name} view ${index + 1}`} />
                      </button>
                    ))}
                  </div>
                </div>
              )}
              <div className={styles.productVisual}>
                <img
                  className={styles.productMainImage}
                  src={galleryImages[activeImage]}
                  alt={product.name}
                />
              </div>
            </div>
{/* <sddn */}
            <div className={styles.productInfo}>
              <div className={styles.productInfoInner}>
                <div className={styles.heading}>
                  <h1>{product.name}</h1>
                  <p>{product.description || "Pure essentials for your everyday puja, rituals and sacred occasions."}</p>
                </div>

                {product.rating != null && (
                  <div className={styles.rating}>
                    <div className={styles.stars} aria-label={`${product.rating} out of 5 stars`}>★</div>
                    <span>{product.rating}{product.review_count != null ? ` (${product.review_count} reviews)` : ""}</span>
                  </div>
                )}

                <div className={styles.price}>
                  <strong>₹{salePrice.toLocaleString("en-IN")}</strong>
                  {mrp > salePrice && <span>₹{mrp.toLocaleString("en-IN")}</span>}
                  {discount > 0 && <div className={styles.discount}>{discount}% OFF</div>}
                </div>

                {product.weight && (
                  <div className={styles.packSection}>
                    <p>Pack / Weight</p>
                    <div className={styles.packOptions}>
                      <button type="button" className={styles.selectedPack} disabled>
                        <span>{product.weight}</span>
                        <strong>₹{salePrice.toLocaleString("en-IN")}</strong>
                      </button>
                    </div>
                  </div>
                )}

                <div className={styles.quantityRow}>
                  <div>
                    <p>Quantity</p>
                    <div className={styles.quantity}>
                      <button type="button" disabled={quantity === 1 || alreadyInCart} onClick={() => setQuantity(q => Math.max(1, q - 1))} aria-label="Decrease quantity">−</button>
                      <span>{quantity}</span>
                      <button type="button" disabled={alreadyInCart} onClick={() => setQuantity(q => q + 1)} aria-label="Increase quantity">+</button>
                    </div>
                  </div>
                  {product.stock != null && (
                    <span className={styles.stock}>
                      {Number(product.stock) > 0 ? "● In Stock" : "Out of Stock"}
                    </span>
                  )}
                </div>

                <PincodeChecker />

                <div className={styles.actions}>
                  <button
                    type="button"
                    className={styles.cartButton}
                    onClick={handleAddToCart}
                    disabled={alreadyInCart || (product.stock != null && Number(product.stock) <= 0)}
                  >
                    {alreadyInCart ? "Added to Cart ✓" : "Add to Cart"}
                  </button>
                  {/* Connect this to your existing checkout flow when ready. */}
                  <button type="button" className={styles.buyButton} disabled title="Buy Now checkout connection pending">
                    Buy Now
                  </button>
                </div>

                <div className={styles.trust}>
                  <div className={styles.trustItem}><BiLeaf /><div><h3>Authentic Products</h3><p>Quality Assured</p></div></div>
                  <div className={styles.trustItem}><FaShippingFast /><div><h3>Fast Shipping</h3><p>Across India</p></div></div>
                  <div className={styles.trustItem}><MdOutlineLock /><div><h3>Secure Checkout</h3><p>Safe & protected</p></div></div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}

export default Product;
