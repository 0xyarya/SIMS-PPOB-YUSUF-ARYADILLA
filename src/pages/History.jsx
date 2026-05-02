import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { transactionSlice } from "../redux/slices/transaction";
import { getToken } from "../authorization/getToken";

const History = () => {
  const dispatch = useDispatch();
  const [offset] = useState(0);
  const [limit, setLimit] = useState(5);
  function showMore() {
    setLimit(limit + 5);
    getTransaction();
  }

  const userToken = getToken();
  useEffect(() => {
    getTransaction();
  }, []);

  function getTransaction() {
    dispatch(transactionSlice({ userToken, offset, limit }));
  }

  const transaction = useSelector(
    (state) => state.transactionHistory.transaction
  );

  return (
    <>
      <div className="flex h-auto bg-transparent justify-center">
        <div className="w-full lg:w-10/12 md:w-10/12 sm:w-10/12 mt-24 ">
          <h2 className="text-xl font-sans font-semibold">Semua Transaksi</h2>
        </div>
      </div>
      <div className="flex h-auto bg-transparent justify-center">
        <div className="grid grid-cols-10 gap-3 w-full lg:w-10/12 md:w-10/12 sm:w-10/12 mt-6">
          <div className="col-span-12">
            {transaction?.map((item, idx) => {
              const date = new Date(item.created_on); // Your date here
              const dateCreated = date.toLocaleDateString("en-GB");
              const timer = date.toLocaleTimeString();
              return (
                <div key={idx}>
                  <div className="border-2 border-gray-300 shadow-sm rounded-md mb-5">
                    <div className="grid grid-cols-3 gap-2">
                      <div className="grid grid-rows-2 col-span-2 mx-5 mt-2">
                        <div
                          className={`text-2xl font-bold ${
                            item.transaction_type != "TOPUP"
                              ? "text-red-500"
                              : "text-green-500"
                          }`}
                        >
                          {item.transaction_type == "TOPUP" ? "+ " : "- "}
                          {item.total_amount.toLocaleString("en-US")}
                        </div>
                        <div className="text-xs mt-2 text-gray-500">
                          {dateCreated + " " + timer}
                        </div>
                      </div>
                      <div className="text-right my-5 me-3 text-gray-500 font-sans">
                        {item.description}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            <div
              className="text-red-500 text-center font-sans font-semibold text-lg cursor-pointer"
              onClick={() => showMore()}
            >
              Show more
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default History;
