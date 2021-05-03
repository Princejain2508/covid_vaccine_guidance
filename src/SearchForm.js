import React, { useRef, useState ,useEffect } from "react";
import DatePicker from "react-date-picker";
import "./SearchForm.css";
import {
  callVaccinebyPin,
  callVaccinebydistrict,
  states,
  districtCall,
} from "./api.js";
import RenderHospitals from "./RenderHospitals.js";

const SearchForm = () => {
  const pinRef = useRef();
  const [date, onChangeDate] = useState(new Date());
  const [error, setError] = useState("");
  const [searchType, setSearchType] = useState("PinCode");
  const [statesIndia, setStatesIndia] = useState([]);
  const [selectedState, setSelectedState] = useState(null);
  const [DistirctState, setDistirctsState] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedDistrict_id, setSelectedDistrict_id] = useState(null);
  const [renderVaccineHospitals, setRenderVaccineHospitals] = useState(null);
  const [eighteenPlusOn, setEighteeenPlusOn] = useState(false);
  const[renderHospitals,setRenderHospitals]=useState([]);

  const age = (eighteenPlusOn? 18:45);
   

  useEffect(() => {
      setHospitals(); 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eighteenPlusOn,renderVaccineHospitals]);

const setHospitals = () =>{
    var response = renderVaccineHospitals?.map((element) => {
      if(element.sessions[0].min_age_limit === age)
        return (element);
        return null;
    });
    console.log(response);
    console.log(age);
    setRenderHospitals(response);
  };

  const callVaccinApibypin = async () => {
    var datee = parseInt(date.getDate());
    var month = parseInt(date.getMonth() + 1);
    var year = date.getFullYear();
    if (!pinRef.current.value || pinRef.current.value.length !== 6) {
      setError("Please Type a valid Pincode");
    } else {
      if (datee <= 9) datee = "0" + datee;
      if (month <= 9) month = "0" + month;
      var new_date = datee + "-" + month + "-" + year;

      const response = await callVaccinebyPin(pinRef.current.value, new_date);

      if (response.error) {
        setError("Please enter valid Details");
        setRenderVaccineHospitals(null);
        // console.log();
      } else if (response.centers.length) {
        setError("");
        setRenderVaccineHospitals(response.centers);
        console.log(response.centers);
      } else {
        setError("No Data Available For Above Selected Dates");
        setRenderVaccineHospitals(null);
      }
    }
  };

  const callStatesApi = async () => {
    var response = await states();
    setStatesIndia(response.states);
  };
  const callDictircsAPi = async (e) => {
    const stateId = e.target.childNodes[e.target.selectedIndex].getAttribute(
      "id"
    );
    setSelectedState(e.target.value);
    const response = await districtCall(stateId);
    setDistirctsState(response.districts);
  };
  const callVaccinApibyDiscript = async () => {
    const dates = new Date();
    var datee = parseInt(dates.getDate());
    var month = parseInt(dates.getMonth() + 1);
    var year = dates.getFullYear();
    if (datee <= 9) datee = "0" + datee;
    if (month <= 9) month = "0" + month;
    var new_date = datee + "-" + month + "-" + year;
    const response = await callVaccinebydistrict(selectedDistrict_id, new_date);
    if (response.error) {
      setError("Please enter valid Details");
      setRenderVaccineHospitals(null);

      // console.log();
    } else if (response.centers.length) {
      setError("");
      setRenderVaccineHospitals(response.centers);
      // console.log(response.centers);
    } else {
      setError("No Data Available For Above Selected Dates");
      setRenderVaccineHospitals(null);
    }
  };
  return (
    <div className="searchForm">
      <div className="searchForm__selectSearch">
        <button
          className={searchType === "PinCode" ? "selected" : null}
          onClick={() => {
            setSearchType("PinCode");
            setError("");
            setRenderVaccineHospitals(null);
          }}
        >
          Search By PinCode
        </button>
        <button
          className={searchType === "District" ? "selected" : null}
          onClick={() => {
            setSearchType("District");
            callStatesApi();
            setError("");
            setRenderVaccineHospitals(null);
          }}
        >
          Search By District
        </button>
      </div>
      {searchType === "PinCode" ? (
        <div className="searchForm__search">
          <input
            className="searchForm__searchPincode"
            ref={pinRef}
            type="number"
            placeholder="Enter PinCode"
          />
          <div className="searchForm__searchDateButton ">
            <DatePicker
              className="searchForm__searchDate"
              // type="date"
              onChange={onChangeDate}
              value={date}
              minDate={new Date()}
            />
            <button
              className={`searchForm__18Button ${
                eighteenPlusOn ? "selected" : "nothing"
              }`}
              onClick={() => setEighteeenPlusOn(!eighteenPlusOn)}
            >
              18+
            </button>
            <button
              className="searchForm__searchButton"
              onClick={() => callVaccinApibypin()}
            >
              Search
            </button>
          </div>
        </div>
      ) : searchType === "District" ? (
        <div className="searchForm__searchDistrict">
          <select
            className="searchForm__selectState"
            value={selectedState}
            onChange={(e) => callDictircsAPi(e)}
            style={{ width: "250px" }}
          >
            <option value="Select State" selected disabled>
              Select State
            </option>
            {statesIndia.map((stateEle, id) => (
              <option
                value={stateEle.state_name}
                key={id}
                id={stateEle.state_id}
              >
                {stateEle.state_name}
              </option>
            ))}
          </select>
          <select
            className="searchForm__selectDistrict"
            value={selectedDistrict}
            onChange={(e) => {
              setSelectedDistrict(e.target.value);
              setSelectedDistrict_id(
                e.target.childNodes[e.target.selectedIndex].getAttribute("id")
              );
            }}
            style={{ width: "250px" }}
          >
            <option value="Select Distict" selected disabled>
              Select Distirct
            </option>
            {DistirctState.map((stateEle, id) => (
              <option
                value={stateEle.district_name}
                key={id}
                id={stateEle.district_id}
              >
                {stateEle.district_name}
              </option>
            ))}
          </select>
          <div className="searchForm__buttonContainer">
            <button
              className={`searchForm__18Button2 ${
                eighteenPlusOn ? "selected" : "nothing"
              }`}
              onClick={() => setEighteeenPlusOn(!eighteenPlusOn)}
            >
              18+
            </button>
            <button
              className="searchForm__searchDistrictButton"
              onClick={() => callVaccinApibyDiscript()}
            >
              Search
            </button>
          </div>
        </div>
      ) : null}

      <div className="searchForm__error">{error}</div>

      <RenderHospitals
        hospitals={renderHospitals}
        age={age}
      />
    </div>
  );
};

export default SearchForm;
