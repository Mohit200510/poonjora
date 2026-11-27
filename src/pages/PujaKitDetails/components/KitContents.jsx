import React from "react";

import {
    Package,
    PackageCheck,
    ClipboardList,
    CheckCircle2
} from "lucide-react";

import styles from "../PujaKitDetails.module.css";
import mobile from "../PujaKitDetailsMobile.module.css";


// ================= CATEGORY LABELS =================

const includedCategories = {
    basic_puja: "Basic Puja Samagri",
    deepak_aarti: "Deepak & Aarti Essentials",
    bhog_offerings: "Bhog & Offerings",
    puja_sthapana: "Puja Sthapana Essentials",
    puja_guidance: "Puja Guidance"
};

const excludedCategories = {
    fresh_items: "Fresh Items",
    reusable_items: "Reusable Puja Items",
    other_requirements: "Other Requirements"
};


// Mobile-only labels; original names remain unchanged.
const mobileNames = {
    "Round Cotton Wicks": "Round Wicks",
    "Long Cotton Wicks": "Long Wicks",
    "Shri Satyanarayan Ji Photo": "Satyanarayan Photo",
    "Katha & Puja Vidhi Booklet": "Puja & Katha Booklet",
    "Yellow Puja Cloth": "Yellow Cloth",
    "Red Puja Cloth": "Red Cloth",
};

// ================= GROUP ITEMS =================

const groupItems = (items, categoryLabels) => {

    const sortedItems = [...items].sort(
        (a, b) =>
            (a.sort_order ?? 0) - (b.sort_order ?? 0)
    );

    const groups = {};

    sortedItems.forEach((item) => {

        const category = item.category || "other";

        if (!groups[category]) {
            groups[category] = [];
        }

        groups[category].push(item);

    });

    const orderedCategories = [
        ...Object.keys(categoryLabels),
        ...Object.keys(groups).filter(
            (category) =>
                !Object.prototype.hasOwnProperty.call(
                    categoryLabels,
                    category
                )
        )
    ];

    return orderedCategories
        .filter((category) => groups[category]?.length)
        .map((category) => ({
            key: category,
            title:
                categoryLabels[category] ||
                category
                    .replace(/_/g, " ")
                    .replace(/\b\w/g, (char) =>
                        char.toUpperCase()
                    ),
            items: groups[category]
        }));

};


// ================= IMAGE COMPONENT =================

const SamagriImage = ({ item }) => {

    const [imageError, setImageError] = React.useState(false);

    return (
        <div className={styles.samagriImage}>

            {item.image_url && !imageError ? (

                <img
                    src={item.image_url}
                    alt={item.name}
                    loading="lazy"
                    onError={() => setImageError(true)}
                />

            ) : (

                <div className={styles.samagriPlaceholder}>
                    <Package size={30} strokeWidth={1.4} />
                </div>

            )}

        </div>
    );

};


// ================= MAIN COMPONENT =================

const KitContents = ({ kit }) => {

    const includedItems = Array.isArray(kit.included_items)
        ? kit.included_items
        : [];

    const excludedItems = Array.isArray(kit.excluded_items)
        ? kit.excluded_items
        : [];

    const includedGroups = groupItems(
        includedItems,
        includedCategories
    );

    const excludedGroups = groupItems(
        excludedItems,
        excludedCategories
    );


    return (
        <div className={`${styles.kitContents} ${mobile.kitContents}`}>

            {/* ================= INCLUDED ITEMS ================= */}

            {includedItems.length > 0 && (

                <section
                    id="included-items"
                    className={styles.contentsSection}
                    aria-labelledby="included-heading"
                >

                    {/* Section Heading */}

                    <div className={styles.contentsHeading}>

                        <div className={styles.contentsTitleRow}>

                            <PackageCheck
                                size={25}
                                strokeWidth={1.8}
                            />

                            <h2
                                id="included-heading"
                                className={`${styles.contentsTitle} ${mobile.contentsTitle}`}
                            >
                                What's Included in the Kit
                            </h2>

                        </div>

                        <p className={styles.contentsSubtitle}>
                            {includedItems.length} items included
                            in your Puja Kit.
                        </p>

                    </div>


                    {/* Included Categories */}

                    {includedGroups.map((group) => (

                        <div
                            key={group.key}
                            className={styles.samagriGroup}
                        >

                            <div className={styles.categoryHeading}>

                                <h3>{group.title}</h3>

                                <span>
                                    {group.items.length} items
                                </span>

                            </div>


                            {/* Samagri Cards */}

                            <div
                                className={`${styles.samagriCards} ${mobile.samagriCards}`}
                            >

                                {group.items.map((item, index) => (

                                    <article
                                        key={`${group.key}-${item.sort_order}-${index}`}
                                        className={`${styles.samagriCard} ${mobile.samagriCard}`}
                                    >

                                        <SamagriImage
                                            key={item.image_url || item.name}
                                            item={item}
                                        />

                                        <div className={styles.samagriInfo}>

                                            <h4 className={styles.samagriName} title={item.name}>
                                                <span className={styles.samagriFullName}>{item.name}</span>
                                                <span className={styles.samagriMobileName}>{mobileNames[item.name] || item.name}</span>
                                            </h4>

                                            {item.name_hi && (
                                                <p className={styles.samagriHindi} title={item.name_hi}>
                                                    {item.name_hi}
                                                </p>
                                            )}

                                            <span className={styles.samagriQuantity}>

                                                {[
                                                    item.quantity,
                                                    item.unit
                                                ]
                                                    .filter(
                                                        (value) =>
                                                            value !== null &&
                                                            value !== undefined &&
                                                            value !== ""
                                                    )
                                                    .join(" ")}

                                            </span>

                                        </div>

                                    </article>

                                ))}

                            </div>

                        </div>

                    ))}

                </section>

            )}


            {/* ================= EXCLUDED ITEMS ================= */}

            {excludedItems.length > 0 && (

                <section
                    id="excluded-items"
                    className={styles.contentsSection}
                    aria-labelledby="excluded-heading"
                >

                    {/* Section Heading */}

                    <div className={styles.contentsHeading}>

                        <div className={styles.contentsTitleRow}>

                            <ClipboardList
                                size={25}
                                strokeWidth={1.8}
                            />

                            <h2
                                id="excluded-heading"
                                className={`${styles.contentsTitle} ${mobile.contentsTitle}`}
                            >
                                What's Not Included
                            </h2>

                        </div>

                        <p className={styles.contentsSubtitle}>
                            Please arrange the following items
                            separately before your puja.
                        </p>

                    </div>


                    {/* Excluded Categories */}

                    {excludedGroups.map((group) => (

                        <div
                            key={group.key}
                            className={styles.samagriGroup}
                        >

                            <div className={styles.categoryHeading}>

                                <h3>{group.title}</h3>

                                <span>
                                    {group.items.length} items
                                </span>

                            </div>


                            {/* Excluded Items List */}

                            <div
                                className={`${styles.excludedList} ${mobile.excludedList}`}
                            >

                                {group.items.map((item, index) => (

                                    <div
                                        key={`${group.key}-${item.sort_order}-${index}`}
                                        className={`${styles.excludedItem} ${mobile.excludedItem}`}
                                    >

                                        <CheckCircle2
                                            size={17}
                                            strokeWidth={1.7}
                                            className={styles.excludedIcon}
                                        />

                                        <div className={styles.excludedInfo}>

                                            <span className={styles.excludedName}>
                                                {item.name}
                                            </span>

                                            {item.name_hi && (
                                                <span className={styles.excludedHindi}>
                                                    {item.name_hi}
                                                </span>
                                            )}

                                        </div>

                                        {item.quantity_text && (

                                            <span className={styles.excludedQuantity}>
                                                {item.quantity_text}
                                            </span>

                                        )}

                                    </div>

                                ))}

                            </div>

                        </div>

                    ))}


                    {/* Additional Information */}

                    <p className={styles.contentsNote}>
                        Puja requirements may vary according to
                        family traditions and regional customs.
                        Please consult your Pandit Ji if additional
                        samagri is required.
                    </p>

                </section>

            )}

        </div>
    );

};

export default KitContents;