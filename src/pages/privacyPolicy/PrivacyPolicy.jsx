import React from 'react'
import styles from "./PrivacyPolicy.module.css"

function PrivacyPolicy() {
  return (
    <main className={styles.privacyPolicy}>
      <h1>Privacy Policy</h1>
      <p><strong>Last Updated: 22 October 2026</strong></p>

      <p>
        Welcome to <strong>Poonjora</strong> (
        <a href="https://poonjora.in">https://poonjora.in</a>),
        an online store owned and operated by
        <strong> Shree Balaji Enterprises</strong>, India.
      </p>

      <p>
        At Poonjora, we value your trust and respect your privacy.
        This Privacy Policy explains how we collect, use, process,
        store, share, and protect your personal information when
        you access our website, create an account, place an order,
        or interact with our services.
      </p>

      <p>
        We handle personal information in accordance with applicable
        Indian laws, including applicable provisions of the Digital
        Personal Data Protection Act, 2023, and related rules as
        they come into force.
      </p>

      <section>
        <h2>1. Information We Collect</h2>
        <p>We may collect the following information when you use our website:</p>

        <h3>Personal Information</h3>
        <ul>
          <li>Full name</li>
          <li>Email address</li>
          <li>Mobile number</li>
        </ul>

        <h3>Shipping and Delivery Information</h3>
        <ul>
          <li>Delivery address</li>
          <li>City, state, and PIN code</li>
          <li>Address type and preferences</li>
        </ul>

        <h3>Account Information</h3>
        <p>
          When you sign in through Google, we may receive information
          such as your name, email address, and authentication identifiers
          necessary to create and manage your account.
        </p>

        <h3>Order and Transaction Information</h3>
        <ul>
          <li>Products ordered</li>
          <li>Order history</li>
          <li>Order value</li>
          <li>Shipping information</li>
          <li>Payment method, transaction reference, and payment status</li>
        </ul>

        <h3>Technical Information</h3>
        <p>
          Our website and service providers may process technical information,
          such as IP addresses, browser information, authentication logs,
          and device-related information, where necessary for security
          and website operation.
        </p>
      </section>

      <section>
        <h2>2. How We Use Your Information</h2>
        <p>We use customer information for the following purposes:</p>
        <ul>
          <li>Creating and managing customer accounts.</li>
          <li>Processing and confirming orders.</li>
          <li>Checking delivery availability.</li>
          <li>Arranging shipping and delivery.</li>
          <li>Processing payments, refunds, and cancellations.</li>
          <li>Providing order-related notifications.</li>
          <li>Responding to customer inquiries and complaints.</li>
          <li>Preventing fraud and unauthorized activity.</li>
          <li>Maintaining website functionality and security.</li>
          <li>Complying with applicable legal and regulatory obligations.</li>
        </ul>

        <p>
          We currently send only transactional and service-related communications,
          such as order confirmations, payment updates, shipping notifications,
          and refund information.
        </p>
        <p>We do not currently send promotional emails or marketing messages.</p>
      </section>

      <section>
        <h2>3. Account Authentication</h2>
        <p>Poonjora offers Google authentication for customer sign-in.</p>
        <p>
          When you sign in using Google, we may receive limited information
          required to authenticate your account.
        </p>
        <p>We use Supabase for authentication and account management.</p>
        <p>Poonjora does not collect or store your Google account password.</p>
      </section>

      
      <section>
        <h2>4. Payment Processing</h2>

        <p>
          Poonjora uses <strong>Cashfree Payments</strong>, an
          authorised third-party payment service provider, to
          securely process online payments.
        </p>

        <p>
          When customers choose to pay online, relevant payment
          and transaction information may be processed by Cashfree
          Payments to authorise payments, verify transactions,
          facilitate refunds, prevent fraud, and comply with
          applicable legal and regulatory requirements.
        </p>

        <p>
          Poonjora does not intentionally collect or store
          customers' complete card numbers, CVVs, or UPI PINs
          in its own database. Sensitive payment credentials
          are handled through the payment service provider's
          payment infrastructure.
        </p>

        <p>
          We may store payment references, transaction statuses,
          order amounts, payment methods, and related transaction
          information for order processing, payment verification,
          customer support, accounting, refunds, fraud prevention,
          and legal compliance.
        </p>

        <p>
          Cash on Delivery (COD) orders may also be recorded
          and managed through our order processing system,
          including the order amount, selected payment method,
          and payment status.
        </p>

        <p>
          Payment processing may also be subject to the privacy
          policy and applicable terms of Cashfree Payments.
          Customers may review the payment service provider's
          privacy practices on its official website.
        </p>
      </section>


      <section>
        <h2>5. Shipping and Delivery</h2>
        <p>
          We use Shiprocket and associated logistics services to support
          delivery serviceability checks and order fulfillment.
        </p>
        <p>
          To arrange deliveries, we may share relevant information with
          shipping and courier partners, including:
        </p>
        <ul>
          <li>Customer name</li>
          <li>Contact number</li>
          <li>Delivery address and PIN code</li>
          <li>Order and shipment details</li>
        </ul>
        <p>
          This information is used for shipping, tracking, delivery,
          and related customer support purposes.
        </p>
      </section>

      <section>
        <h2>6. Cookies and Local Storage</h2>
        <p>
          Poonjora uses or may use essential browser storage technologies
          to support website functionality, including:
        </p>
        <ul>
          <li>Shopping cart management</li>
          <li>Authentication and session management</li>
          <li>Remembering customer preferences</li>
          <li>Website security and functionality</li>
        </ul>
        <p>
          We do not currently use Google Analytics, Meta Pixel, or other
          advertising or visitor analytics tracking services.
        </p>
        <p>
          If we introduce non-essential tracking technologies in the future,
          we will update this Privacy Policy and obtain consent where required
          by applicable law.
        </p>
      </section>

      <section>
        <h2>7. Data Storage and Security</h2>
        <p>
          We use Supabase for database infrastructure, authentication,
          and certain backend services.
        </p>
        <p>
          We maintain technical and organizational safeguards designed to
          protect customer information from unauthorized access, disclosure,
          modification, and loss.
        </p>
        <p>
          Access to customer information is restricted according to its
          intended purpose and applicable access controls.
        </p>
        <p>
          Although we take reasonable precautions, no electronic storage
          or transmission method is completely secure.
        </p>
      </section>

      <section>
        <h2>8. Sharing of Personal Information</h2>
        <p>
          We may share personal information with third parties where
          reasonably necessary to operate our services, including:
        </p>
        <ul>
          <li>Authentication and cloud infrastructure providers.</li>
          <li>Payment service providers.</li>
          <li>Shipping and logistics partners.</li>
          <li>Transactional communication providers.</li>
          <li>Professional advisers where necessary.</li>
          <li>Government authorities or regulatory bodies when legally required.</li>
        </ul>
        <p>We do not sell customer personal information to third parties.</p>
      </section>

      <section>
        <h2>9. Account and Personal Data Deletion</h2>
        <p>
          Customers may request deletion of their Poonjora account and
          associated personal information by contacting:
        </p>
        <p>
          <strong>Email:</strong>{" "}
          <a href="mailto:support@poonjora.in">support@poonjora.in</a>
          <br />
          <strong>Subject:</strong> Account Deletion Request
        </p>
        <p>
          We may request reasonable verification of account ownership
          before processing a deletion request.
        </p>
        <p>
          Following verification, we will process eligible requests
          in accordance with applicable law.
        </p>
        <p>
          Certain information, including invoices, transaction records,
          and order details, may need to be retained for tax, accounting,
          fraud prevention, dispute resolution, or other legal obligations.
        </p>
        <p>We will inform customers about the outcome of their requests.</p>
      </section>

      <section>
        <h2>10. Your Privacy Rights</h2>
        <p>Subject to applicable law, customers may have rights to:</p>
        <ul>
          <li>Request information about their personal data.</li>
          <li>Request correction or updating of inaccurate information.</li>
          <li>Request deletion of eligible personal information.</li>
          <li>Withdraw consent where applicable.</li>
          <li>Raise grievances about the handling of their personal information.</li>
        </ul>
        <p>
          To exercise these rights, please contact{" "}
          <a href="mailto:support@poonjora.in">support@poonjora.in</a>.
        </p>
        <p>
          We will review and process requests in accordance with
          applicable legal requirements.
        </p>
      </section>

      <section>
        <h2>11. Data Retention</h2>
        <p>
          We retain personal information for as long as reasonably necessary
          to fulfill the purposes described in this Privacy Policy, including
          providing services, processing orders, maintaining records,
          resolving disputes, and complying with legal obligations.
        </p>
        <p>
          Certain payment, invoice, transaction, and accounting records
          may be retained for periods required by applicable law.
        </p>
        <p>
          When information is no longer required, we will delete or anonymize
          it as appropriate, subject to applicable legal requirements.
        </p>
      </section>

      <section>
        <h2>12. Children's Privacy</h2>
        <p>
          Poonjora is intended for customers who are legally capable
          of entering into purchase transactions.
        </p>
        <p>
          We do not knowingly process children's personal information
          in violation of applicable law.
        </p>
        <p>
          Where required, we will implement appropriate safeguards,
          including obtaining verifiable parental consent.
        </p>
      </section>

      <section>
        <h2>13. Third-Party Services</h2>
        <p>
          Our website uses or may use third-party services for authentication,
          backend infrastructure, shipping, payments, and transactional communications.
        </p>
        <p>
          These providers may process relevant information in accordance with
          their applicable privacy policies, agreements, and legal obligations.
        </p>
        <p>
          Customers may review the privacy policies of the relevant service
          providers for additional information.
        </p>
      </section>

      <section>
        <h2>14. Changes to This Privacy Policy</h2>
        <p>
          We may update this Privacy Policy to reflect changes in our business
          operations, website features, service providers, or applicable laws.
        </p>
        <p>
          Any changes will be published on this page with an updated revision date.
        </p>
        <p>
          Where legally required, we will provide additional notice or obtain
          consent before implementing relevant changes.
        </p>
      </section>

      <section>
        <h2>15. Contact Information</h2>
        <p>
          For questions, concerns, or requests regarding this Privacy Policy,
          please contact:
        </p>
        <p>
          <strong>Poonjora</strong><br />
          Owned and operated by <strong>Shree Balaji Enterprises</strong>
        </p>
        <p>
          <strong>Business Contact Address:</strong><br />
          SCO No. 4, C/o Shree Balaji Pooja Products<br />
          Shivalik Vihar, Near Durga Mata Mandir<br />
          Zirakpur, Punjab – 140603<br />
          India
        </p>
        <p>
          <strong>Email:</strong>{" "}
          <a href="mailto:support@poonjora.in">support@poonjora.in</a><br />
          <strong>Phone:</strong>{" "}
          <a href="tel:+919877956181">+91 98779 56181</a><br />
          <strong>Website:</strong>{" "}
          <a href="https://poonjora.in">https://poonjora.in</a>
        </p>
      </section>

      <section>
        <h2>16. Grievance Redressal</h2>
        <p>
          Poonjora is committed to addressing customer complaints and
          privacy-related concerns fairly and promptly.
        </p>
        <p>
          Customers may contact our designated Grievance Officer using
          the following details:
        </p>
        <p>
          <strong>Grievance Officer:</strong> Janinder Jain<br />
          <strong>Designation:</strong> Grievance Officer<br />
          <strong>Business:</strong> Shree Balaji Enterprises<br />
          <strong>Brand:</strong> Poonjora<br />
          <strong>Email:</strong>{" "}
          <a href="mailto:support@poonjora.in">support@poonjora.in</a><br />
          <strong>Phone:</strong>{" "}
          <a href="tel:+919877956181">+91 98779 56181</a>
        </p>
        <p>
          <strong>Address:</strong><br />
          SCO No. 4, C/o Shree Balaji Pooja Products<br />
          Shivalik Vihar, Near Durga Mata Mandir<br />
          Zirakpur, Punjab – 140603<br />
          India
        </p>
        <p>
          Consumer complaints will be acknowledged within 48 hours of receipt
          and redressed within one month, in accordance with the applicable
          Consumer Protection (E-Commerce) Rules, 2020.
        </p>
        <p>
          Privacy-related grievances and requests will be handled within
          the timelines prescribed by applicable data protection laws.
        </p>
      </section>

      <hr />

      <p>
        <strong>Poonjora — Owned and Operated by Shree Balaji Enterprises</strong>
      </p>
      <p>
        For assistance, contact{" "}
        <a href="mailto:support@poonjora.in">
          <strong>support@poonjora.in</strong>
        </a>.
      </p>
    </main>
  )
}

export default PrivacyPolicy