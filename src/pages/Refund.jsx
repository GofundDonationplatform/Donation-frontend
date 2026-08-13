import React from "react";

export default function Refund() {
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto max-w-4xl rounded-2xl bg-white p-6 shadow-sm md:p-10">
        <h1 className="mb-3 text-3xl font-bold text-indigo-700">
          Donation Refund Policy
        </h1>

        <p className="mb-8 text-sm text-gray-500">
          Last updated: August 2026
        </p>

        <p className="leading-7 text-gray-700">
          Donations made through GFSSGA Impact Network are intended to support
          fundraising campaigns and causes selected by the donor. Because
          donations may be processed or transferred through third-party
          payment providers, refund requests are reviewed according to the
          circumstances of the transaction and the applicable payment
          provider's rules.
        </p>

        <h2 className="mt-8 text-xl font-semibold text-gray-900">
          1. General Refund Policy
        </h2>
        <p className="mt-2 leading-7 text-gray-700">
          Donations are generally non-refundable once successfully processed.
          However, we may review requests involving duplicate donations,
          technical payment errors, unauthorized transactions, or other
          circumstances where a refund may be appropriate.
        </p>

        <h2 className="mt-8 text-xl font-semibold text-gray-900">
          2. Duplicate Donations
        </h2>
        <p className="mt-2 leading-7 text-gray-700">
          If you believe you accidentally made the same donation more than
          once, contact us as soon as possible with the relevant transaction
          information so that the transaction can be reviewed.
        </p>

        <h2 className="mt-8 text-xl font-semibold text-gray-900">
          3. Unauthorized Transactions
        </h2>
        <p className="mt-2 leading-7 text-gray-700">
          If you believe a transaction was made without your authorization,
          contact us immediately. You may also need to contact your bank or
          payment provider to report the transaction and follow their
          dispute process.
        </p>

        <h2 className="mt-8 text-xl font-semibold text-gray-900">
          4. Technical or Payment Errors
        </h2>
        <p className="mt-2 leading-7 text-gray-700">
          If a technical problem results in an incorrect charge, duplicate
          transaction, or payment failure where funds were nevertheless
          deducted, we will review the available transaction information and
          work with the relevant payment provider where necessary.
        </p>

        <h2 className="mt-8 text-xl font-semibold text-gray-900">
          5. Incorrect Donation Amount
        </h2>
        <p className="mt-2 leading-7 text-gray-700">
          If you entered an incorrect donation amount, contact us promptly.
          Requests are reviewed based on the status of the transaction and
          whether the payment provider can reverse or refund the transaction.
        </p>

        <h2 className="mt-8 text-xl font-semibold text-gray-900">
          6. Campaign Cancellation or Removal
        </h2>
        <p className="mt-2 leading-7 text-gray-700">
          The cancellation or removal of a campaign does not automatically
          guarantee that previous donations will be refunded. Any available
          remedy will depend on the circumstances, transaction status, and
          applicable payment-provider rules.
        </p>

        <h2 className="mt-8 text-xl font-semibold text-gray-900">
          7. How to Request a Refund
        </h2>
        <p className="mt-2 leading-7 text-gray-700">
          Send a refund request to{" "}
          <a
            href="mailto:gfssgaimpactnetwork@gmail.com"
            className="font-medium text-indigo-600 underline"
          >
            gfssgaimpactnetwork@gmail.com
          </a>
          .
        </p>

        <p className="mt-3 leading-7 text-gray-700">
          Please include your full name, donation amount, campaign name,
          transaction reference if available, date of the transaction, and a
          brief explanation of the reason for your request.
        </p>

        <h2 className="mt-8 text-xl font-semibold text-gray-900">
          8. Review and Processing
        </h2>
        <p className="mt-2 leading-7 text-gray-700">
          Refund requests are reviewed individually. Where a refund is
          approved, the processing time may depend on the payment provider
          and the financial institution involved. We cannot guarantee a
          specific processing time controlled by a third party.
        </p>

        <h2 className="mt-8 text-xl font-semibold text-gray-900">
          9. Third-Party Payment Providers
        </h2>
        <p className="mt-2 leading-7 text-gray-700">
          Payments may be processed by third-party providers. Their own
          refund, dispute, chargeback, and payment policies may also apply.
        </p>

        <h2 className="mt-8 text-xl font-semibold text-gray-900">
          10. Contact Us
        </h2>
        <p className="mt-2 leading-7 text-gray-700">
          For refund questions, contact{" "}
          <a
            href="mailto:gfssgaimpactnetwork@gmail.com"
            className="font-medium text-indigo-600 underline"
          >
            gfssgaimpactnetwork@gmail.com
          </a>
          .
        </p>
      </div>
    </div>
  );
}
