import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getChartInfo } from "../../../store/actions/DashboardInfoActions";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import Load from "../../../components/Loading/Load";
import Loading from "../../../components/Loading/Loading";

const Chart = () => {
  const dispatch = useDispatch();
  const { data, successChart } = useSelector((state) => state.chartInfo);
  //   const [info, setInfo] = useState([]);

  useEffect(() => {
    dispatch(getChartInfo());
  }, []);

  return (
    <div className="p-5 bg-white">
      {successChart ? (
        <div
          style={{
            width: "50%",
            height: "500px",
          }}
        >
          <p className="my-4">Summary of last month orders</p>
          <div className="shadow-md p-5 border rounded">
            <ResponsiveContainer width="100%" height="100%" aspect={4 / 2}>
              <AreaChart data={data}>
                <CartesianGrid strokeDasharray="2 2" />
                <XAxis dataKey="date" />
                <Tooltip />
                <Legend />

                <Area type="monotone" dataKey="orders" stroke="#001f3f" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default Chart;
