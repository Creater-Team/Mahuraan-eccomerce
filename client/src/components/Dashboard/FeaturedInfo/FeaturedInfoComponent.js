import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import FeaturedInfo from ".";
import { getInfo } from "../../../store/actions/DashboardInfoActions";

const FeaturedInfoComponent = () => {
  const dispatch = useDispatch();
  const { data, success, loading, error } = useSelector(
    (state) => state.adminFeatures
  );

  useEffect(() => {
    dispatch(getInfo());
  }, []);

  return (
    <div className="p-3 my-3 flex space-x-10 justify-between flex-wrap">
      {loading
        ? ""
        : success && (
            <>
              {" "}
              <div
                style={{
                  flexBasis: "20%",
                }}
              >
                <FeaturedInfo
                  count={data.avgRev === null ? 0.0 : data.avgRev}
                  text={"Average review"}
                  svg={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                      />
                    </svg>
                  }
                />
              </div>
              <div
                style={{
                  flexBasis: "20%",
                }}
              >
                <FeaturedInfo
                  count={`$${Number(data.earnings).toFixed(2)}`}
                  text="Total earnings"
                  svg={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  }
                />
              </div>
              <div
                style={{
                  flexBasis: "20%",
                }}
              >
                <FeaturedInfo
                  count={data.bending}
                  text="Not delivered"
                  svg={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  }
                />
              </div>
              <div
                style={{
                  flexBasis: "20%",
                }}
              >
                <FeaturedInfo
                  count={data.products}
                  text="Total products"
                  svg={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                      />
                    </svg>
                  }
                />
              </div>
            </>
          )}
    </div>
  );
};

export default FeaturedInfoComponent;
