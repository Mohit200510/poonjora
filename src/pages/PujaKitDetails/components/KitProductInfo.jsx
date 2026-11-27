import React, { useState, useContext } from "react";

import {
    ImageOff,
    PackageCheck,
    House,
    BookOpen,
    Leaf,
    Minus,
    Plus,
    ShoppingCart,
    Check,
    ChevronRight
} from "lucide-react";

import { CartContext } from "../../../context/CartContext";
import PincodeChecker from "../../../components/common/pincodeChecker/PincodeChecker";

import styles from "../PujaKitDetails.module.css";
import mobile from "../PujaKitDetailsMobile.module.css";

const KitProductInfo = ({ product, kit }) => {

    // ================= STATE =================

    const [activeImage, setActiveImage] = useState(0);
    const [quantity, setQuantity] = useState(1);

    const { addToCart, cartItems } = useContext(CartContext);


    // ================= PRODUCT IMAGES =================

    const images = [
        ...new Set(
            [
                product.image_url,
                ...(product.images || [])
            ]
                .map((url) => url?.trim())
                .filter(Boolean)
        )
    ];


    // ================= PRODUCT PRICING =================

    const salePrice = Number(product.sale_price) || 0;
    const mrp = Number(product.mrp) || 0;

    const formatPrice = (value) =>
        `₹${value.toLocaleString("en-IN")}`;


    // ================= STOCK & CART =================

    const stock = Math.max(
        0,
        Math.floor(Number(product.stock) || 0)
    );

    const outOfStock = stock === 0;

    const cartItem = cartItems.find(
        (item) =>
            String(item.id) === String(product.id) &&
            item.variant_id == null
    );

    const alreadyInCart = Boolean(cartItem);

    const handleAddToCart = () => {

        if (
            alreadyInCart ||
            outOfStock ||
            quantity < 1 ||
            quantity > stock
        ) {
            return;
        }

        addToCart({
            ...product,
            quantity,
            variant_id: null,
            variant_name: null
        });

    };


    // ================= PRODUCT HIGHLIGHTS =================

    const includedCount = kit.included_items?.length || 0;

    const highlights = [
        { icon: PackageCheck, label: `${includedCount} Puja Essentials` },
        { icon: BookOpen, label: "Katha & Puja Vidhi Booklet" },
        { icon: Leaf, label: "Individually Packed" },
        { icon: House, label: "Ideal for Home Puja" }
    ];


    // ================= MAIN COMPONENT =================

    return (
        <section
            className={`${styles.productInfo} ${mobile.productInfo}`}
        >

            {/* ================= IMAGE GALLERY ================= */}

            <div className={`${styles.gallery} ${mobile.gallery}`}>

                <div className={styles.mainImage}>

                    {images.length > 0 ? (
                        <img
                            src={images[activeImage] || images[0]}
                            alt={product.name}
                            fetchPriority="high"
                        />
                    ) : (
                        <div className={styles.imagePlaceholder}>
                            <ImageOff size={40} strokeWidth={1.5} />
                            <span>Product image coming soon</span>
                        </div>
                    )}

                </div>


                {/* Gallery Thumbnails */}

                {images.length > 1 && (
                    <div className={styles.thumbnails}>

                        {images.map((image, index) => (
                            <button
                                type="button"
                                key={image}
                                onClick={() => setActiveImage(index)}
                                aria-label={`View product image ${index + 1}`}
                                aria-pressed={activeImage === index}
                                className={`${styles.thumbnail} ${
                                    activeImage === index
                                        ? styles.activeThumbnail
                                        : ""
                                }`}
                            >
                                <img
                                    src={image}
                                    alt={`${product.name} ${index + 1}`}
                                    loading="lazy"
                                />
                            </button>
                        ))}

                    </div>
                )}

            </div>


            {/* ================= PRODUCT DETAILS ================= */}

            <div
                className={`${styles.productDetails} ${mobile.productDetails}`}
            >

                {/* Product Category */}

                <span className={styles.productCategory}>
                    {product.category}
                </span>


                {/* Product Title */}

                <h1
                    className={`${styles.productTitle} ${mobile.productTitle}`}
                >
                    {product.name}
                </h1>


                {/* Hindi Title */}

                <p className={styles.hindiTitle}>
                    {kit.name_hi}
                </p>


                {/* ================= PRODUCT PRICE ================= */}

                <div className={styles.priceSection}>

                    <div className={styles.priceBox}>

                        <span
                            className={`${styles.salePrice} ${mobile.salePrice}`}
                        >
                            {formatPrice(salePrice)}
                        </span>

                        {mrp > salePrice && (
                            <span className={styles.mrp}>
                                {formatPrice(mrp)}
                            </span>
                        )}

                    </div>

                    <p className={styles.taxInfo}>
                        Inclusive of all taxes
                    </p>

                </div>


                {/* ================= DESCRIPTION ================= */}

                <p className={styles.shortDescription}>
                    {kit.short_description || product.description}
                </p>


                {/* ================= PRODUCT HIGHLIGHTS ================= */}

                <div
                    className={`${styles.highlights} ${mobile.highlights}`}
                >

                    {highlights.map((highlight) => {

                        const Icon = highlight.icon;

                        return (
                            <div
                                key={highlight.label}
                                className={`${styles.highlightItem} ${mobile.highlightItem}`}
                            >

                                <div className={styles.highlightIcon}>
                                    <Icon size={22} strokeWidth={1.8} />
                                </div>

                                <span className={styles.highlightLabel}>
                                    {highlight.label}
                                </span>

                            </div>
                        );

                    })}

                </div>


                {/* ================= CONTENTS NAVIGATION ================= */}

                <div
                    className={`${styles.contentsLinks} ${mobile.contentsLinks}`}
                >

                    <a href="#included-items">

                        <span>
                            What's Included ({includedCount})
                        </span>

                        <ChevronRight size={16} />

                    </a>

                    <a href="#excluded-items">

                        <span>
                            What's Not Included
                        </span>

                        <ChevronRight size={16} />

                    </a>

                </div>


                {/* ================= QUANTITY & STOCK ================= */}

                <div className={styles.purchaseSection}>

                    <div
                        className={`${styles.quantityRow} ${mobile.quantityRow}`}
                    >

                        <div className={styles.quantityBox}>

                            <span className={styles.quantityLabel}>
                                Quantity
                            </span>

                            <div className={styles.quantitySelector}>

                                <button
                                    type="button"
                                    aria-label="Decrease quantity"
                                    disabled={
                                        quantity <= 1 ||
                                        alreadyInCart ||
                                        outOfStock
                                    }
                                    onClick={() =>
                                        setQuantity((q) =>
                                            Math.max(1, q - 1)
                                        )
                                    }
                                >
                                    <Minus size={17} />
                                </button>

                                <span aria-live="polite">
                                    {alreadyInCart
                                        ? cartItem.quantity
                                        : quantity}
                                </span>

                                <button
                                    type="button"
                                    aria-label="Increase quantity"
                                    disabled={
                                        quantity >= stock ||
                                        alreadyInCart ||
                                        outOfStock
                                    }
                                    onClick={() =>
                                        setQuantity((q) =>
                                            Math.min(stock, q + 1)
                                        )
                                    }
                                >
                                    <Plus size={17} />
                                </button>

                            </div>

                        </div>


                        {/* Stock Status */}

                        <span
                            className={`${styles.stockStatus} ${
                                outOfStock
                                    ? styles.outOfStock
                                    : styles.inStock
                            }`}
                        >

                            <span className={styles.stockDot} />

                            {outOfStock
                                ? "Out of Stock"
                                : "In Stock"}

                        </span>

                    </div>


                    {/* ================= PURCHASE BUTTONS ================= */}

                    <div
                        className={`${styles.purchaseActions} ${mobile.purchaseActions}`}
                    >

                        <button
                            type="button"
                            className={`${styles.cartButton} ${
                                alreadyInCart && !outOfStock
                                    ? styles.cartAdded
                                    : ""
                            }`}
                            onClick={handleAddToCart}
                            disabled={
                                outOfStock ||
                                alreadyInCart ||
                                quantity > stock
                            }
                        >

                            {outOfStock ? (
                                "Out of Stock"
                            ) : alreadyInCart ? (
                                <>
                                    <Check size={19} />
                                    Added to Cart
                                </>
                            ) : (
                                <>
                                    <ShoppingCart size={19} />
                                    Add to Cart
                                </>
                            )}

                        </button>

                        <button
                            type="button"
                            className={styles.buyButton}
                            disabled
                            title="Buy Now checkout connection pending"
                        >
                            Buy Now
                        </button>

                    </div>

                </div>


                {/* ================= DELIVERY & SHIPPING ================= */}

                <div className={styles.deliverySection}>

                    <PincodeChecker />

                </div>

            </div>

        </section>
    );

};

export default KitProductInfo;