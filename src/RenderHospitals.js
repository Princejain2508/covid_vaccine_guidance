import React from "react";
import "./RenderHospitals.css";

const RenderHospitals = ({ hospitals,age }) => {

  console.log(age);

  return (
    <div className="list_parent">
      {hospitals? <div className="renderHospitals__heading">
        <div className="hospitalsName">Hospital Name</div>
        <div className="dosesAvailable">Doses Available</div>
        <div className="date">Date</div>
        <div className="ageGroups">Age Group</div>
      </div> : null}
      {hospitals?.map((hospital, i) => (
        <div className="renderHospitals" key={i}>
          {hospital? ( 
            
              <div key="0" className="render__Hospital">
               <div className="hospitalName"><div> <h3 className="renderHospitals__hospitalName">{hospital.name}</h3></div>
               <div className="hospital_additional"><span>{hospital.district_name}{","}</span><span>{hospital.state_name}{","}</span><span>{hospital.pincode}</span></div></div>
                <div className="doseAvailableInHospital" >
                  <b id="no0fdoses">
                  {hospital.sessions[0].available_capacity}
                </b> {" "} Doses available
                </div>
                 <div className="date_Searched">
                {hospital.sessions[0].date}
                </div>
                <div className="ageGroup">{age}+ patient</div>
              </div>
          ) : null}
        </div>
      ))}
    </div>
  );
  
};


export default RenderHospitals;



/* 
 React from "react";

const RenderHospitalsAbove45 = ({ hospitals,eighteenPlus }) => {
  console.log(hospitals);
  return (
    <div className="list_parent">
      {hospitals?.map((hospital, i) => (
        <div className="renderHospitals" key={i}>
          {hospital.sessions[0].min_age_limit === 45 ? ( 
            <>
              <div key="0">
                <h3>{hospital.name}</h3>
                <b id="no0fdoses">
                  {hospital.sessions[0].available_capacity}
                </b>{" "}
                doses available on dated:
                {hospital.sessions[0].date}
              </div>
              <span>45+ patient</span>
            </>
          ) : null}
        </div>
      ))}
    </div>
  );
};







export default RenderHospitalsAbove45;

return (
    <div className="list_parent">
      {renderHospitals?.map((hospital, i) => (
        <div>{hospital?<div className="renderHospitals" key={i}>
              <div key="0">
                <h3>{hospital.name}</h3>
                <b id="no0fdoses">
                  {hospital.sessions[0].available_capacity}
                </b>{" "}
                doses available on dated:
                {hospital.sessions[0].date}
              </div>
              <span>45+ patient</span>
        </div>:null}</div>
      ))}
    </div>
  );
*/
