import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";

import { db, fs } from "../firebase.config";

//Bootstrap Imports
import { Container, Row, Col, Spinner } from "react-bootstrap";

import DashboardNavbar from "./DashboardNavbar";
import LiveDataCard from "./LiveDataCard";
import VoltageLineChart from "./VoltageLineChart";

import "../css/style.css";

const Dashboard = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [deviceId, setDeviceId] = useState("");
  const [liveData, setLiveData] = useState({});
  const [records, setRecords] = useState([]);

  const { logout, currentUser } = useAuth();
  const history = useHistory();

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

  //Voltage Status
  const voltage_text = "Voltage";
  const voltage_color = "border-left-danger";
  const voltage_icon = "fas fa-bolt";

  useEffect(() => {
    (async () => {
      try {
        await fs
          .collection("users")
          .doc(currentUser.uid)
          .get()
          .then((snapshot) => {
            setDeviceId(snapshot.data().deviceId);
            if (deviceId === null) {
              //handle here
            } else {
              db.ref("FirebaseIOT/Live_data/" + snapshot.data().deviceId).on(
                "value",
                function (snapshot) {
                  setLiveData(snapshot.val());
                }
              );
            }
          });
        setLoading(true);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        await db
          .ref("FirebaseIOT/Keep_record/1001")
          .once("value", function (snapshot) {
            let tempRecordArray = [];
            snapshot.forEach(function (childsnapshot) {
              if (childsnapshot.val().voltage) {
                let tempObj = {
                  id: childsnapshot.key,
                  humidity: childsnapshot.val().humidity,
                  light: childsnapshot.val().light,
                  moisture: childsnapshot.val().moisture,
                  motor_status: childsnapshot.val().motor_status,
                  solar_status: childsnapshot.val().solar_status,
                  temperature: childsnapshot.val().temperature,
                  voltage: childsnapshot.val().voltage,
                };
                tempRecordArray.push(tempObj);
              }
            });
            setRecords(tempRecordArray);
          });
        console.log("Records Updated");
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  async function handleLogout() {
    setError("");
    try {
      await logout();
      history.push("/login");
    } catch {
      setError("cannot logout");
    }
  }

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
                value={liveData.humidity}
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
            <Col sm>
              <LiveDataCard
                color={voltage_color}
                text={voltage_text}
                icon={voltage_icon}
                value={liveData.voltage}
                loading={loading}
              />
            </Col>
            <div className="mobile-space">
              <br />
            </div>
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
        </Container>

        <Container className="mt-4">
          <Row>
            <Col md={6}>
              <VoltageLineChart records={records} />
            </Col>
          </Row>
        </Container>
      </Container>
    </React.Fragment>
  );
};

export default Dashboard;
