import React, { useEffect, useState, useContext } from "react";
import styles from "./Product.module.css";

import mobile from "./ProductMobile.module.css";
import { Link, useParams } from "react-router-dom";
import { supabase } from "../../supabaseClient";
import Container from "../../components/common/Container";
import { CartContext } from "../../context/CartContext";
import { BiLeaf } from "react-icons/bi";
import { FaShippingFast } from "react-icons/fa";
import { MdOutlineLock } from "react-icons/md";
import { FiTruck } from "react-icons/fi";
import PincodeChecker from "../../components/common/pincodeChecker/PincodeChecker";
import ProductSkeleton from "./productSkeleton/ProductSkeleton";
import templeArch from "../../assets/temple-arch.webp";

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
      try {
        const { data, error: fetchError } = await supabase
          .from("products")
          .select("*")
          .eq("id", id)
          .single();
        if (cancelled) return;
        if (fetchError) throw fetchError;
        setProduct(data);
      } catch (fetchError) {
        if (!cancelled) {
          console.error("Product fetch failed:", fetchError);
          setError("We couldn't load this product. Please try again.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
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
  const outOfStock = product.stock != null && Number(product.stock) <= 0;
  const maxQuantity = product.stock == null ? Infinity : Math.max(0, Math.floor(Number(product.stock)));
  const alreadyInCart = cartItems.some((item) => String(item.id) === String(product.id));
 const galleryImages = [
  product.image_url,
  ...(Array.isArray(product.images) ? product.images : [])
].filter(
  (image, index, images) =>
    typeof image === "string" &&
    image.trim() !== "" &&
    images.indexOf(image) === index
);
  const formatPrice = (value) => `₹${value.toLocaleString("en-IN")}`;

  const handleAddToCart = () => {
    if (alreadyInCart || outOfStock) return;
    addToCart({ ...product, quantity });
  };

  const quantitySelector = (
    <div className={`${styles.quantity} ${mobile.mobileQuantity}`}>
      <button type="button" disabled={quantity <= 1 || alreadyInCart || outOfStock}
        onClick={() => setQuantity((q) => Math.max(1, q - 1))} aria-label="Decrease quantity">−</button>
      <span aria-live="polite">{quantity}</span>
      <button type="button" disabled={alreadyInCart || outOfStock || quantity >= maxQuantity}
        onClick={() => setQuantity((q) => Math.min(maxQuantity, q + 1))} aria-label="Increase quantity">+</button>
    </div>
  );

  const cartButton = (
    <button type="button"
      className={`${styles.cartButton} ${mobile.mobileCart} ${alreadyInCart ? `${styles.cartAdded} ${mobile.mobileAdded}` : ""}`}
      onClick={handleAddToCart} disabled={alreadyInCart || outOfStock}>
      {outOfStock ? "Out of Stock" : alreadyInCart ? <><span className={styles.cartCheck}>✓</span> Added to Cart</> : "Add to Cart"}
    </button>
  );

  return (
    <main className={`${styles.productDetail} ${mobile.mobileRoot}`}>
      <section className={`${styles.productHero} ${mobile.mobileHero}`}>
        <Container>
          <nav className={mobile.mobileBreadcrumb} aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span aria-hidden="true">›</span>
            <Link to="/collections/products">All Products</Link>
            <span aria-hidden="true">›</span>
            <span className={mobile.currentBreadcrumb} aria-current="page" title={product.name}>{product.name}</span>
          </nav>
          <div className={`${styles.productHeroContent} ${mobile.mobileContent}`}>
            <div className={`${styles.productVisualMain} ${mobile.mobileVisualMain}`}>
              {galleryImages.length > 1 && (
                <div className={`${styles.productGallery} ${mobile.mobileGallery}`}>
                  <div className={`${styles.productGalleryContainer} ${mobile.mobileGalleryItems}`}>
                    {galleryImages.map((image, index) => (
                      <button type="button" key={`${image}-${index}`}
                        className={`${styles.productGalleryBox} ${activeImage === index ? styles.productGalleryBoxSelected : ""}`}
                        onClick={() => setActiveImage(index)} aria-label={`View product image ${index + 1}`}>
                        <img src={image} alt={`${product.name} view ${index + 1}`} />
                      </button>
                    ))}
                  </div>
                </div>
              )}
              <div className={`${styles.productVisual} ${mobile.mobileVisual}`}>
                <img src={templeArch} alt="" aria-hidden="true" className={`${styles.templeArch} ${mobile.mobileArch}`} />
                {galleryImages[activeImage] && (
                  <img className={`${styles.productMainImage} ${mobile.mobileImage}`} src={galleryImages[activeImage]} alt={product.name} />
                )}
              </div>
            </div>

            <div className={`${styles.productInfo} ${mobile.mobileInfo}`}>
              <div className={`${styles.productInfoInner} ${mobile.mobileInner}`}>
                <div className={`${styles.productEyebrow} ${mobile.mobileEyebrow}`}><BiLeaf /> Puja Essential</div>
                <div className={`${styles.heading} ${mobile.mobileHeading}`}>
                  <h1>{product.name}</h1>
                  <p>{product.description || "Essentials for your everyday puja, rituals and sacred occasions."}</p>
                </div>

                {product.rating != null && (
                  <div className={`${styles.rating} ${mobile.mobileRating}`}>
                    <div className={styles.stars} aria-label={`${product.rating} out of 5 stars`}>★</div>
                    <span>{product.rating}{product.review_count != null ? ` (${product.review_count} reviews)` : ""}</span>
                  </div>
                )}

                <div className={`${styles.price} ${mobile.mobilePrice}`}>
                  <strong>{formatPrice(salePrice)}</strong>
                  {mrp > salePrice && <span>{formatPrice(mrp)}</span>}
                  {discount > 0 && <div className={`${styles.discount} ${mobile.mobileDiscount}`}>{discount}% OFF</div>}
                </div>

                <div className={mobile.mobileTax}>Inclusive of all taxes</div>


                {product.weight && (
                  <div className={`${styles.packSection} ${mobile.mobilePack}`}>
                    <p>Net Quantity / Weight</p>
                    <div className={`${styles.packOptions} ${mobile.mobilePackOptions}`}>
                      <div className={`${styles.selectedPack} ${mobile.mobileSelectedPack}`}>
                        <span>{product.weight}</span>
                      </div>
                    </div>
                  </div>
                )}

                <div className={`${styles.quantityRow} ${mobile.mobileQuantityRow}`}>
                  <div>
                    <p>Quantity</p>
                    {quantitySelector}
                  </div>
                {product.stock != null && (
                  <div className={`${styles.stockStatus} ${mobile.mobileStock} ${outOfStock ? styles.unavailable : ""}`}>
                    {outOfStock ? "Out of Stock" : "● In Stock"}
                  </div>
                )}
                </div>

                

                <div className={`${styles.actions} ${mobile.mobileActions}`}>
                  {cartButton}
                  <button type="button" className={`${styles.buyButton} ${mobile.mobileBuy}`} disabled title="Buy Now checkout connection pending">Buy Now</button>
                </div>

                <div className={`${styles.deliveryPanel} ${mobile.mobileDelivery}`}>
                  <div className={`${styles.deliveryHeading} ${mobile.mobileDeliveryHeading}`}><FiTruck /> Delivery &amp; Shipping</div>
                  <PincodeChecker />

                </div>

                

                <div className={`${styles.trust} ${mobile.mobileTrust}`}>
                  <div className={`${styles.trustItem} ${mobile.mobileTrustItem}`}><BiLeaf /><div><h3>Quality Assured</h3><p>Carefully selected</p></div></div>
                  <div className={`${styles.trustItem} ${mobile.mobileTrustItem}`}><FaShippingFast /><div><h3>Pan India Delivery</h3><p>Check your pincode</p></div></div>
                  <div className={`${styles.trustItem} ${mobile.mobileTrustItem}`}><MdOutlineLock /><div><h3>Secure Payment</h3><p>Protected checkout</p></div></div>
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
