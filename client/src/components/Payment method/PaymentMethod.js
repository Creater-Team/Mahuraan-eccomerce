import React, { useState } from "react";
import Modal from "react-responsive-modal";
import { motion, AnimatePresence } from "framer-motion";

const PaymentMethod = ({ open, onCloseModal, totalAmount }) => {
  const [showZaad, setShowZaad] = useState(false);
  const [showEdahab, setShowEdahab] = useState(false);
  const [showEvc, setShowEvc] = useState(false);

  return (
    <div>
      <Modal open={open} onClose={onCloseModal}>
        <div className="my-6 modal overflow-hidden">
          <h2 className="text-2xl font-bold text-blue-700">
            LOCAL PAYMENT METHODS
          </h2>
          <div className="text-gray-400 font-light mb-4">
            Choose your preferred method to pay.
          </div>

          {/* pay with zaad */}

          <div className="border p-3">
            <div className="edahab p-2">
              <div
                className="header flex justify-between items-center cursor-pointer w-full "
                onClick={() => {
                  setShowEdahab(false);
                  setShowZaad(!showZaad);
                  setShowEvc(false);
                }}
              >
                <span className=" font-medium  text-xl">Zaad</span>
                <span>
                  {showZaad ? (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </>
                  ) : (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </>
                  )}
                </span>
              </div>
              <div>
                <AnimatePresence initial={false}>
                  {showZaad && (
                    <motion.section
                      key="content"
                      initial="collapsed"
                      animate="open"
                      exit="collapsed"
                      variants={{
                        open: { opacity: 1, height: "auto" },
                        collapsed: { opacity: 0, height: 0 },
                      }}
                      transition={{
                        duration: 0.4,
                        ease: [0.04, 0.62, 0.23, 0.98],
                      }}
                    >
                      <div className="w-full">
                        <form>
                          <input
                            type="number"
                            className="p-3 mt-3 shadow-sm rounded w-full  border outline-none"
                            placeholder="Please enter your number"
                          />
                          <button className="bg-indigo-700 shadow-md my-3  py-2 px-5 rounded transition-all hover:bg-indigo-600  text-white">
                            PAY - ${totalAmount}
                          </button>
                        </form>
                      </div>
                    </motion.section>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* pay with edahab */}
          <div className="border p-3">
            <div className="edahab p-2">
              <div
                className="header flex justify-between items-center cursor-pointer w-full "
                onClick={() => {
                  setShowEdahab(!showEdahab);
                  setShowZaad(false);
                  setShowEvc(false);
                }}
              >
                <span className=" font-medium  text-xl">Edahab</span>
                <span>
                  {showEdahab ? (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </>
                  ) : (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </>
                  )}
                </span>
              </div>
              <div>
                <AnimatePresence initial={false}>
                  {showEdahab && (
                    <motion.section
                      key="content"
                      initial="collapsed"
                      animate="open"
                      exit="collapsed"
                      variants={{
                        open: { opacity: 1, height: "auto" },
                        collapsed: { opacity: 0, height: 0 },
                      }}
                      transition={{
                        duration: 0.4,
                        ease: [0.04, 0.62, 0.23, 0.98],
                      }}
                    >
                      <div className="w-full">
                        <form>
                          <input
                            type="number"
                            className="p-3 mt-3 shadow-sm rounded w-full  border outline-none"
                            placeholder="Please enter your number"
                          />
                          <button className="bg-indigo-700 shadow-md my-3  py-2 px-5 rounded transition-all hover:bg-indigo-600  text-white">
                            PAY - ${totalAmount}
                          </button>
                        </form>
                      </div>
                    </motion.section>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* EVC/PLUS */}

          <div className="border p-3">
            <div className="edahab p-2">
              <div
                className="header flex justify-between items-center cursor-pointer w-full "
                onClick={() => {
                  setShowEdahab(false);
                  setShowZaad(false);
                  setShowEvc(!showEvc);
                }}
              >
                <span className=" font-medium  text-xl">EVC PLUS</span>
                <span>
                  {showEvc ? (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </>
                  ) : (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </>
                  )}
                </span>
              </div>
              <div>
                <AnimatePresence initial={false}>
                  {showEvc && (
                    <motion.section
                      key="content"
                      initial="collapsed"
                      animate="open"
                      exit="collapsed"
                      variants={{
                        open: { opacity: 1, height: "auto" },
                        collapsed: { opacity: 0, height: 0 },
                      }}
                      transition={{
                        duration: 0.4,
                        ease: [0.04, 0.62, 0.23, 0.98],
                      }}
                    >
                      <div className="w-full">
                        <form>
                          <input
                            type="number"
                            className="p-3 mt-3 shadow-sm rounded w-full  border outline-none"
                            placeholder="Please enter your number"
                          />
                          <button className="bg-indigo-700 shadow-md my-3  py-2 px-5 rounded transition-all hover:bg-indigo-600  text-white">
                            PAY - ${totalAmount}
                          </button>
                        </form>
                      </div>
                    </motion.section>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default PaymentMethod;
