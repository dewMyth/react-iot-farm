import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useHistory, useParams } from "react-router-dom";

import DashboardNavbar from "./DashboardNavbar";
import LiveDataCard from "./LiveDataCard";

import { Container, Row, Col, Spinner } from "react-bootstrap";

import { db, fs } from "../firebase.config";

//Humidity
const humidity_text = "Humidity";
const humidity_color = "border-left-primary";
const humidity_icon = "fas fa-tint";

//Solar Status
const solar_status_text = "Solar Status";
const solar_status_color = "border-left-warning";
const solar_status_icon = "fas fa-solar-panel";

//Moisture Status
const moisture_text = "Moisture";
const moisture_color = "border-left-success";
const moisture_icon = "fas fa-water";

//fertilizer Status
const fertilizer_status_text = "Fertilizer Status";
const fertilizer_status_color = "border-left-success";
const fertilizer_status_icon = "fas fa-hand-holding-seedling";

//fertilizer Delay
const fertilizer_delay_text = "Fertilizer Delay";
const fertilizer_delay_color = "border-left-success";
const fertilizer_delay_icon = "fas fa-water";

//Light Status
const light_text = "Light";
const light_color = "border-left-success";
const light_icon = "fas fa-lightbulb";

//Temperature
const temp_text = "Temperature";
const temp_color = "border-left-success";
const temp_icon = "fas fa-thermometer-half";

//Motor Status
const motor_status_text = "Motor";
const motor_status_color = "border-left-success";
const motor_status_icon = "fas fa-water";

//Motor Delay
const motor_delay_text = "Motor Delay";
const motor_delay_color = "border-left-success";
const motor_delay_icon = "fas fa-water";

//Voltage Status
const voltage_text = "Voltage";
const voltage_color = "border-left-danger";
const voltage_icon = "fas fa-bolt";

const Profile = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  //   const [deviceId, setDeviceId] = useState("");
  const [liveData, setLiveData] = useState({});
  const [records, setRecords] = useState([]);

  console.log(useParams());
  //   let deviceId = useParams();

  const { logout, currentUser } = useAuth();
  const history = useHistory();

  async function handleLogout() {
    setError("");
    try {
      await logout();
      history.push("/login");
    } catch {
      setError("cannot logout");
    }
  }

  let { deviceId } = useParams();

  useEffect(() => {
    (async () => {
      try {
        await db
          .ref("FirebaseIOT/Live_data/" + deviceId)
          .on("value", function (snapshot) {
            setLiveData(snapshot.val());
          });
        setLoading(true);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  return (
    <React.Fragment>
      <DashboardNavbar
        handleLogout={handleLogout}
        error={error}
        currentUser={currentUser}
      />

      <Container>
        <Row className="mt-4">
          <Col>
            <h1>Current Stats</h1>
          </Col>
          <Col className="text-right">
            <h1>
              My Device : {loading ? deviceId : <Spinner animation="grow" />}
            </h1>
          </Col>
        </Row>

        <hr />
        <br />
        <Container>
          <Row>
            <Col sm>
              <LiveDataCard
                color={humidity_color}
                text={humidity_text}
                icon={humidity_icon}
                value={`${liveData.humidity * 10}%`}
                loading={loading}
              />
            </Col>
            <div className="mobile-space">
              <br />
            </div>
            <Col sm>
              <LiveDataCard
                color={temp_color}
                text={temp_text}
                icon={temp_icon}
                value={`${liveData.temperature} °C`}
                loading={loading}
              />
            </Col>
            <div className="mobile-space">
              <br />
            </div>
            <Col sm>
              <LiveDataCard
                color={moisture_color}
                text={moisture_text}
                icon={moisture_icon}
                value={liveData.moisture}
                loading={loading}
              />
            </Col>
            <div className="mobile-space">
              <br />
            </div>

            <div className="mobile-space">
              <br />
            </div>
          </Row>
          <br />
          <Row>
            <Col sm>
              <LiveDataCard
                color={light_color}
                text={light_text}
                icon={light_icon}
                value={liveData.light}
                loading={loading}
              />
            </Col>
            <Col sm>
              <LiveDataCard
                color={solar_status_color}
                text={solar_status_text}
                icon={solar_status_icon}
                value={liveData.solar_status}
                loading={loading}
              />
            </Col>
          </Row>
          <br />

          <Row>
            <Col sm>
              <LiveDataCard
                color={fertilizer_status_color}
                text={fertilizer_status_text}
                icon={fertilizer_status_icon}
                value={liveData.fertilizer_status ? "Applied" : "Not Applied"}
                loading={loading}
              />
            </Col>

            <Col sm>
              <LiveDataCard
                color={fertilizer_delay_color}
                text={fertilizer_delay_text}
                icon={fertilizer_delay_icon}
                value={`${liveData.fertilizer_delay / 1000} seconds`}
                loading={loading}
              />
            </Col>
          </Row>

          <br />
          <Row>
            <Col sm>
              <LiveDataCard
                color={motor_status_color}
                text={motor_status_text}
                icon={motor_status_icon}
                value={liveData.motor_status ? "On" : "Off"}
                loading={loading}
              />
            </Col>

            <Col sm>
              <LiveDataCard
                color={motor_delay_color}
                text={motor_delay_text}
                icon={motor_delay_icon}
                value={`${liveData.motor_delay / 1000} seconds`}
                loading={loading}
              />
            </Col>
            <Col sm>
              <LiveDataCard
                color={voltage_color}
                text={voltage_text}
                icon={voltage_icon}
                value={liveData.voltage}
                loading={loading}
              />
            </Col>
          </Row>
        </Container>

        {/* <Container className="mt-4">
          <Row>
            <Col md={6}>
              <VoltageLineChart records={records} />
            </Col>
          </Row>
        </Container> */}
      </Container>
    </React.Fragment>
  );
};

export default Profile;
