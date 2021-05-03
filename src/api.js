import axios from "axios";

const url = "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/";

export const callVaccinebyPin = async (pinCode, date) => {
  try {
    const res = await axios(url + "calendarByPin/", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
      params: {
        pincode: pinCode,
        date: date,
      },
    });
    if (res.status === 401) {
      return { error: "inavid Session" };
    }
    if (res.status === 200 && res.data !== "fail") {
      return res.data;
    }
    return { error: "Failed to Load Data, Sorry!" };
  } catch (err) {
    return { error: "Failed to Load Data, Sorry!" };
  }
};

export const callVaccinebydistrict = async (distictId, date) => {
  try {
    const res = await axios(url + "calendarByDistrict/", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
      params: {
        district_id: distictId,
        date: date,
      },
    });
    if (res.status === 401) {
      return { error: "inavid Session" };
    }
    if (res.status === 200 && res.data !== "fail") {
      return res.data;
    }
    return { error: "Failed to Load Data, Sorry!" };
  } catch (err) {
    return { error: "Failed to Load Data, Sorry!" };
  }
};

export const states = async () => {
  try {
    const res = await axios(
      "https://cdn-api.co-vin.in/api/v2/admin/location/states",
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      },
    );
    if (res.status === 401) {
      return { error: "inavid Session" };
    }
    if (res.status === 200 && res.data !== "fail") {
      return res.data;
    }
    return { error: "Failed to Load Data, Sorry!" };
  } catch (err) {
    return { error: "Failed to Load Data, Sorry!" };
  }
};

export const districtCall = async (stateID) => {
  try {
    const res = await axios(
      "https://cdn-api.co-vin.in/api/v2/admin/location/districts/" + stateID,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      },
    );
    if (res.status === 401) {
      return { error: "inavid Session" };
    }
    if (res.status === 200 && res.data !== "fail") {
      return res.data;
    }
    return { error: "Failed to Load Data, Sorry!" };
  } catch (err) {
    return { error: "Failed to Load Data, Sorry!" };
  }
};
