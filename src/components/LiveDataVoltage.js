import React from "react";
import "../css/cards.css";
import classnames from "classnames";

import { ProgressBar } from "react-bootstrap";

const LiveDataVoltage = (props) => {
  return (
    <div className={classnames("card shadow h-100 py-2", props.color)}>
      <div className="card-body">
        <div className="row no-gutters align-items-center">
          <div className="col mr-2">
            <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
              {props.text}
            </div>
            <ProgressBar
              now={(props.value / 5) * 100}
              label={`${(props.value / 5) * 100}%`}
            />
            {/* <div className="h5 mb-0 font-weight-bold text-gray-800">
              {props.loading ? props.value : <Spinner animation="border" />}
            </div> */}
          </div>
          <div className="col-auto">
            <i className={classnames("fa-2x text-gray-300", props.icon)}></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveDataVoltage;
