import React, { useState, useId } from "react";

import {
    Plus,
    Minus,
    CircleHelp
} from "lucide-react";

import styles from "../PujaKitDetails.module.css";
import mobile from "../PujaKitDetailsMobile.module.css";

const KitFAQ = ({ kit }) => {

    // ================= STATE =================

    const [activeFAQ, setActiveFAQ] = useState(null);

    const faqId = useId();


    // ================= FAQ DATA =================

    const faqs = Array.isArray(kit?.faqs)
        ? [...kit.faqs]
            .filter(
                (faq) => faq?.question && faq?.answer
            )
            .sort(
                (a, b) =>
                    (a.sort_order ?? 0) -
                    (b.sort_order ?? 0)
            )
        : [];


    // ================= TOGGLE FAQ =================

    const toggleFAQ = (index) => {

        setActiveFAQ((previous) =>
            previous === index ? null : index
        );

    };


    // ================= EMPTY STATE =================

    if (faqs.length === 0) {
        return null;
    }


    // ================= MAIN COMPONENT =================

    return (

        <section
            id="kit-faq"
            className={`${styles.faqSection} ${mobile.faqSection}`}
            aria-labelledby={`${faqId}-heading`}
        >

            {/* ================= FAQ HEADING ================= */}

            <div className={styles.faqHeading}>

                <div className={styles.faqTitleRow}>

                    <CircleHelp
                        size={25}
                        strokeWidth={1.8}
                    />

                    <h2
                        id={`${faqId}-heading`}
                        className={`${styles.faqTitle} ${mobile.faqTitle}`}
                    >
                        Frequently Asked Questions
                    </h2>

                </div>

                <p className={styles.faqSubtitle}>
                    Everything you need to know about
                    this Puja Kit.
                </p>

            </div>


            {/* ================= FAQ LIST ================= */}

            <div className={styles.faqList}>

                {faqs.map((faq, index) => {

                    const isOpen = activeFAQ === index;

                    const questionId =
                        `${faqId}-question-${index}`;

                    const answerId =
                        `${faqId}-answer-${index}`;

                    return (

                        <div
                            key={`${faq.sort_order}-${index}`}
                            className={`${styles.faqItem} ${
                                isOpen
                                    ? styles.faqItemActive
                                    : ""
                            }`}
                        >

                            {/* ================= QUESTION ================= */}

                            <h3 className={styles.faqQuestionHeading}>

                                <button
                                    type="button"
                                    id={questionId}
                                    className={`${styles.faqQuestion} ${mobile.faqQuestion}`}
                                    onClick={() => toggleFAQ(index)}
                                    aria-expanded={isOpen}
                                    aria-controls={answerId}
                                >

                                    <span>
                                        {faq.question}
                                    </span>

                                    <span className={styles.faqToggleIcon}>

                                        {isOpen ? (
                                            <Minus
                                                size={19}
                                                strokeWidth={1.8}
                                            />
                                        ) : (
                                            <Plus
                                                size={19}
                                                strokeWidth={1.8}
                                            />
                                        )}

                                    </span>

                                </button>

                            </h3>


                            {/* ================= ANSWER ================= */}

                            <div
                                id={answerId}
                                role="region"
                                aria-labelledby={questionId}
                                hidden={!isOpen}
                                className={`${styles.faqAnswer} ${mobile.faqAnswer}`}
                            >

                                <p>{faq.answer}</p>

                            </div>

                        </div>

                    );

                })}

            </div>

        </section>

    );

};

export default KitFAQ;