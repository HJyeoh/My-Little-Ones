import React, { useState } from "react";

const Payment = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    cardNumber: "",
    expiration: "",
    cvv: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic
    console.log(formData);
  };

  return (
    <section className="bg-white py-8 dark:bg-gray-900">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">Payment</h2>

          <div className="mt-6 sm:mt-8 lg:grid lg:grid-cols-2 lg:gap-12">
            {/* Left Section: Form Fields */}
            <form
              onSubmit={handleSubmit}
              className="w-full rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6 lg:p-8"
            >
              <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="fullName" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                    Full name (as displayed on card)*
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                    placeholder="Bonnie Green"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="cardNumber" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                    Card number*
                  </label>
                  <input
                    type="text"
                    id="cardNumber"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleChange}
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pe-10 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                    placeholder="xxxx-xxxx-xxxx-xxxx"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="expiration" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                    Card expiration*
                  </label>
                  <input
                    type="text"
                    id="expiration"
                    name="expiration"
                    value={formData.expiration}
                    onChange={handleChange}
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 ps-9 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                    placeholder="12/23"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="cvv"
                    className="mb-2 flex items-center gap-1 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    CVV*
                  </label>
                  <input
                    type="number"
                    id="cvv"
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleChange}
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                    placeholder="•••"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="flex w-full items-center justify-center rounded-lg bg-blue-500 text-white px-5 py-2.5 text-sm font-medium hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Pay Now
              </button>
            </form>

            {/* Right Section: Price Details */}
            <div className="mt-6 sm:mt-8 lg:mt-0 lg:ml-8">
              <div className="space-y-4 rounded-lg border border-gray-100 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-800">
                <div className="space-y-2">
                  <dl className="flex items-center justify-between gap-4">
                    <dt className="text-sm text-gray-900 dark:text-white">Total amount</dt>
                    <dd className="text-sm font-semibold text-gray-900 dark:text-white">RM499.99</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Payment;
