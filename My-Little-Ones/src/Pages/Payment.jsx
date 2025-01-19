import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Payment = () => {
  const { state } = useLocation();
  const [paymentMethod, setPaymentMethod] = useState("");
  const [selectedBank, setSelectedBank] = useState(null);
  const [showTouchNgoImage, setShowTouchNgoImage] = useState(false); // State to track TouchNGo image visibility
  const navigate = useNavigate();
  const totalAmount = state?.totalAmount || 0;
  const formattedTotalAmount = (Math.round(totalAmount * 100) / 100).toFixed(2);

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
    if (method === "TouchNGo") {
      setShowTouchNgoImage(true); // Show the TouchNGo image when selected
    } else {
      setShowTouchNgoImage(false); // Hide the image if another method is selected
    }
    if (method !== "Bank") {
      setSelectedBank(null); // Reset bank if payment method is not Bank
    }
  };

  const handleBankSelection = (bank) => {
    setSelectedBank(bank);
    const bankLinks = {
      Maybank: "https://www.maybank2u.com.my/",
      CIMB: "https://www.cimbclicks.com.my/clicks/#/",
      "BANK SIMPANAN NASIONAL": "https://www.mybsn.com.my/mybsn/login/login.do",
      RHB: "https://onlinebanking.rhbgroup.com/my/login",
      "Public Bank": "https://www.pbebank.com/",
    };

    if (bankLinks[bank]) {
      window.location.href = bankLinks[bank]; // Navigate to the bank's website
    }
  };

  // Determine the button color for "TouchNGo"
  const touchNgoButtonClass =
    paymentMethod === "TouchNGo"
      ? "bg-pink-500 hover:bg-pink-600"
      : "bg-gray-300 hover:bg-gray-300 text-gray-900";
  // Determine the button color for "Bank"
  const bankButtonClass =
    paymentMethod === "Bank"
      ? "bg-pink-500 hover:bg-pink-600"
      : "bg-gray-300 hover:bg-gray-300 text-gray-900";
  // Determine if any bank is selected, for pink color
  const bankListClass = selectedBank
    ? "bg-pink-500 text-white"
    : "bg-gray-200 text-gray-900";

  return (
    <section className="bg-white py-8 dark:bg-gray-900">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
            Payment
          </h2>

          <div className="mt-6 sm:mt-8 lg:grid lg:grid-cols-2 lg:gap-12">
            {/* Left Section: Payment Method Selection */}
            <div className="w-full rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6 lg:p-8">
              <h3 className="text-lg font-semibold">Select Payment Method</h3>
              <div className="mt-4">
                <button
                  onClick={() => handlePaymentMethodChange("TouchNGo")}
                  className={`w-full py-2 px-4 border border-gray-300 rounded-md text-center ${touchNgoButtonClass}`}
                >
                  TouchNGo
                </button>
                <button
                  onClick={() => handlePaymentMethodChange("Bank")}
                  className={`w-full py-2 px-4 border border-gray-300 rounded-md text-center mt-2 ${bankButtonClass}`}
                >
                  Bank
                </button>
              </div>

              {paymentMethod === "Bank" && (
                <div className="mt-4">
                  <h4 className="font-semibold">Select Bank</h4>
                  <ul className="list-none">
                    {[
                      "Maybank",
                      "CIMB",
                      "Public Bank",
                      "RHB",
                      "BANK SIMPANAN NASIONAL",
                    ].map((bank) => (
                      <li
                        key={bank}
                        onClick={() => handleBankSelection(bank)}
                        className={`cursor-pointer py-2 border-b hover:bg-gray-200 ${
                          selectedBank === bank ? bankListClass : ""
                        }`}
                      >
                        {bank}
                      </li>
                    ))}
                  </ul>
                  {selectedBank && (
                    <p className="mt-2 text-sm text-gray-900">
                      Selected Bank: {selectedBank}
                    </p>
                  )}
                </div>
              )}

              {/* Conditionally render TouchNGo image */}
              {showTouchNgoImage && (
                <div className="mt-4">
                  <img
                    src="src/Components/Assets/TNGPAYMENT.jpg"
                    alt="TouchNGo"
                    className="w-full h-auto"
                  />
                </div>
              )}
            </div>

            {/* Right Section: Price Details */}
            <div className="mt-6 sm:mt-8 lg:mt-0 lg:ml-8">
              <div className="space-y-4 rounded-lg border border-gray-100 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-800">
                <div className="space-y-2">
                  <dl className="flex items-center justify-between gap-4">
                    <dt className="text-sm text-gray-900 dark:text-white">
                      Total amount
                    </dt>
                    <dd className="text-sm font-semibold text-gray-900 dark:text-white">
                      RM{formattedTotalAmount}
                    </dd>
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
