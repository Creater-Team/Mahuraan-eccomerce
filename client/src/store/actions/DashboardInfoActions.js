import { api } from "../../api";
import {
  GET_ADMIN_CHART_FAIL,
  GET_ADMIN_CHART_REQ,
  GET_ADMIN_CHART_SUCC,
  GET_ADMIN_INFO_FAIL,
  GET_ADMIN_INFO_REQ,
  GET_ADMIN_INFO_SUCC,
} from "../constants/DashboardConsts";

export const getInfo = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_ADMIN_INFO_REQ,
    });
    const { data } = await api.get("/featured-info");
    if (data?.success) {
      dispatch({
        type: GET_ADMIN_INFO_SUCC,
        payload: data,
      });
    } else {
      dispatch({
        type: GET_ADMIN_INFO_FAIL,
        payload: data,
      });
    }
  } catch (error) {
    dispatch({
      type: GET_ADMIN_INFO_FAIL,
      payload: "Something went wrong.",
    });
  }
};

export const getChartInfo = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_ADMIN_CHART_REQ,
    });
    const { data } = await api.get("/featured-info/chart");
    if (data) {
      dispatch({
        type: GET_ADMIN_CHART_SUCC,
        payload: data,
      });
    } else {
      dispatch({
        type: GET_ADMIN_CHART_FAIL,
        payload: data,
      });
    }
  } catch (error) {
    dispatch({
      type: GET_ADMIN_CHART_FAIL,
      payload: error,
    });
  }
};
