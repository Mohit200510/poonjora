import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import {
    ChevronRight,
    AlertCircle,
    RefreshCw,
    ArrowLeft
} from "lucide-react";

import { supabase } from "../../supabaseClient";
import Container from "../../components/common/Container";

import KitProductInfo from "./components/KitProductInfo";
import KitContents from "./components/KitContents";
import KitFAQ from "./components/KitFAQ";

import styles from "./PujaKitDetails.module.css";
import mobile from "./PujaKitDetailsMobile.module.css";

const SITE_URL = "https://poonjora.in";


// ================= LOADING SKELETON =================

const KitSkeleton = () => {

    return (
        <div
            className={styles.skeletonWrapper}
            role="status"
            aria-label="Loading Puja Kit"
        >

            <div
                className={`${styles.skeleton} ${styles.skeletonBreadcrumb}`}
            />

            <div
                className={`${styles.skeletonProduct} ${mobile.skeletonProduct}`}
            >

                <div
                    className={`${styles.skeleton} ${styles.skeletonImage} ${mobile.skeletonImage}`}
                />

                <div className={styles.skeletonDetails}>

                    <div
                        className={`${styles.skeleton} ${styles.skeletonCategory}`}
                    />

                    <div
                        className={`${styles.skeleton} ${styles.skeletonTitle}`}
                    />

                    <div
                        className={`${styles.skeleton} ${styles.skeletonHindi}`}
                    />

                    <div
                        className={`${styles.skeleton} ${styles.skeletonPrice}`}
                    />

                    <div
                        className={`${styles.skeleton} ${styles.skeletonDescription}`}
                    />

                    <div
                        className={`${styles.skeleton} ${styles.skeletonDescription}`}
                    />

                    <div
                        className={`${styles.skeleton} ${styles.skeletonHighlights}`}
                    />

                    <div className={styles.skeletonActions}>

                        <div className={styles.skeleton} />

                        <div className={styles.skeleton} />

                    </div>

                    <div
                        className={`${styles.skeleton} ${styles.skeletonDelivery}`}
                    />

                </div>

            </div>

        </div>
    );

};


// ================= MAIN PAGE =================

const PujaKitDetails = () => {

    const { slug } = useParams();


    // ================= STATE =================

    const [product, setProduct] = useState(null);
    const [kit, setKit] = useState(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [notFound, setNotFound] = useState(false);

    const [retryCount, setRetryCount] = useState(0);


    // ================= FETCH PUJA KIT =================

    useEffect(() => {

        let cancelled = false;

        const fetchKit = async () => {

            setLoading(true);
            setError("");
            setNotFound(false);
            setProduct(null);
            setKit(null);

            try {

                // Fetch published Puja Kit

                const {
                    data: kitData,
                    error: kitError
                } = await supabase
                    .from("puja_kit_details")
                    .select("*")
                    .eq("slug", slug)
                    .eq("is_published", true)
                    .maybeSingle();

                if (kitError) {
                    throw kitError;
                }

                if (!kitData) {

                    if (!cancelled) {
                        setNotFound(true);
                    }

                    return;

                }


                // Fetch connected product

                const {
                    data: productData,
                    error: productError
                } = await supabase
                    .from("products")
                    .select("*")
                    .eq("id", kitData.product_id)
                    .maybeSingle();

                if (productError) {
                    throw productError;
                }

                if (!productData) {

                    if (!cancelled) {
                        setNotFound(true);
                    }

                    return;

                }


                // Update state

                if (!cancelled) {
                    setKit(kitData);
                    setProduct(productData);
                }

            } catch (err) {

                console.error("Puja Kit fetch error:", err);

                if (!cancelled) {
                    setError(
                        "We couldn't load this Puja Kit. Please try again."
                    );
                }

            } finally {

                if (!cancelled) {
                    setLoading(false);
                }

            }

        };

        fetchKit();

        return () => {
            cancelled = true;
        };

    }, [slug, retryCount]);


    // ================= LOADING STATE =================

    if (loading) {

        return (
            <Container>

                <Helmet>
                    <title>Puja Kit | Poonjora</title>
                </Helmet>

                <KitSkeleton />

            </Container>
        );

    }


    // ================= ERROR STATE =================

    if (error || notFound || !product || !kit) {

        return (
            <Container>

                <Helmet>

                    <title>
                        {notFound
                            ? "Puja Kit Not Found | Poonjora"
                            : "Unable to Load Puja Kit | Poonjora"}
                    </title>

                    {notFound && (
                        <meta name="robots" content="noindex" />
                    )}

                </Helmet>

                <div className={styles.errorState}>

                    <div className={styles.errorIcon}>
                        <AlertCircle
                            size={36}
                            strokeWidth={1.5}
                        />
                    </div>

                    <h1>
                        {notFound
                            ? "Puja Kit Not Found"
                            : "Unable to Load Puja Kit"}
                    </h1>

                    <p>
                        {notFound
                            ? "This Puja Kit is currently unavailable."
                            : error || "Something went wrong."}
                    </p>

                    <div className={styles.errorActions}>

                        {!notFound && (

                            <button
                                type="button"
                                className={styles.retryButton}
                                onClick={() =>
                                    setRetryCount((count) => count + 1)
                                }
                            >
                                <RefreshCw size={17} />
                                Try Again
                            </button>

                        )}

                        <Link
                            to="/collections/products"
                            className={styles.backButton}
                        >
                            <ArrowLeft size={17} />
                            Browse Products
                        </Link>

                    </div>

                </div>

            </Container>
        );

    }


    // ================= SEO DATA =================

    const canonicalUrl =
        `${SITE_URL}/puja-kits/${kit.slug}`;

    const seoTitle =
        `${product.name} | Buy Online | Poonjora`;

    const seoDescription = (
        kit.short_description ||
        product.description ||
        `Explore ${product.name} at Poonjora.`
    ).replace(/\s+/g, " ").trim();

    const productImages = [
        ...new Set(
            [
                product.image_url,
                ...(product.images || [])
            ]
                .map((url) => url?.trim())
                .filter(Boolean)
        )
    ];

    const salePrice = Number(product.sale_price);

    const hasValidPrice =
        product.sale_price !== null &&
        product.sale_price !== "" &&
        Number.isFinite(salePrice) &&
        salePrice >= 0;

    const inStock = Number(product.stock) > 0;


    // ================= PRODUCT STRUCTURED DATA =================

    const productSchema = {

        "@context": "https://schema.org",

        "@type": "Product",

        "@id": `${canonicalUrl}#product`,

        name: product.name,

        description: seoDescription,

        url: canonicalUrl,

        sku: String(product.id),

        category: product.category,

        ...(productImages.length > 0 && {
            image: productImages
        }),

        ...(hasValidPrice && {

            offers: {

                "@type": "Offer",

                url: canonicalUrl,

                priceCurrency: "INR",

                price: salePrice.toFixed(2),

                availability: inStock
                    ? "https://schema.org/InStock"
                    : "https://schema.org/OutOfStock",

                itemCondition:
                    "https://schema.org/NewCondition",

                seller: {
                    "@type": "Organization",
                    name: "Poonjora"
                }

            }

        })

    };


    // ================= BREADCRUMB STRUCTURED DATA =================

    const breadcrumbSchema = {

        "@context": "https://schema.org",

        "@type": "BreadcrumbList",

        itemListElement: [

            {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: SITE_URL
            },

            {
                "@type": "ListItem",
                position: 2,
                name: "All Products",
                item: `${SITE_URL}/collections/products`
            },

            {
                "@type": "ListItem",
                position: 3,
                name: product.name,
                item: canonicalUrl
            }

        ]

    };


    // ================= MAIN PAGE =================

    return (

        <Container>

            {/* ================= SEO ================= */}

            <Helmet>

                <title>{seoTitle}</title>

                <meta
                    name="description"
                    content={seoDescription}
                />

                <link
                    rel="canonical"
                    href={canonicalUrl}
                />

                <meta
                    property="og:type"
                    content="product"
                />

                <meta
                    property="og:title"
                    content={seoTitle}
                />

                <meta
                    property="og:description"
                    content={seoDescription}
                />

                <meta
                    property="og:url"
                    content={canonicalUrl}
                />

                <meta
                    property="og:site_name"
                    content="Poonjora"
                />

                {productImages.length > 0 && (

                    <meta
                        property="og:image"
                        content={productImages[0]}
                    />

                )}

                <meta
                    name="twitter:card"
                    content={
                        productImages.length > 0
                            ? "summary_large_image"
                            : "summary"
                    }
                />

                <meta
                    name="twitter:title"
                    content={seoTitle}
                />

                <meta
                    name="twitter:description"
                    content={seoDescription}
                />

                {productImages.length > 0 && (

                    <meta
                        name="twitter:image"
                        content={productImages[0]}
                    />

                )}

                <script type="application/ld+json">

                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@graph": [
                            productSchema,
                            breadcrumbSchema
                        ]
                    }).replace(/</g, "\\u003c")}

                </script>

            </Helmet>


            {/* ================= BREADCRUMBS ================= */}

            <nav
                className={`${styles.breadcrumbs} ${mobile.breadcrumbs}`}
                aria-label="Breadcrumb"
            >

                <Link to="/">
                    Home
                </Link>

                <ChevronRight size={14} />

                <Link to="/collections/products">
                    All Products
                </Link>

                <ChevronRight size={14} />

                <span aria-current="page">
                    {product.name}
                </span>

            </nav>


            {/* ================= PRODUCT INFORMATION ================= */}

            <KitProductInfo
                key={`product-${product.id}`}
                product={product}
                kit={kit}
            />


            {/* ================= KIT CONTENTS ================= */}

            <KitContents
                key={`contents-${product.id}`}
                kit={kit}
            />


            {/* ================= FAQ ================= */}

            <KitFAQ
                key={`faq-${product.id}`}
                kit={kit}
            />

        </Container>

    );

};

export default PujaKitDetails;