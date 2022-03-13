import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import Link from "react-router-dom/Link";

import { fs } from "../firebase.config";

import DashboardNavbar from "./DashboardNavbar";

import { Container, Spinner, Card } from "react-bootstrap";

import "../css/style.css";

const Dashboard = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { logout, currentUser } = useAuth();
  const history = useHistory();

  const [devices, setDevices] = useState([]);

  //Get the current user's devices
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        await fs
          .collection("users")
          .doc(currentUser.uid)
          .get()
          .then((snapshot) => {
            setDevices(snapshot.data().deviceIds);
          });
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    })();
  }, []);

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       await fs
  //         .collection("users")
  //         .doc(currentUser.uid)
  //         .get()
  //         .then((snapshot) => {
  //           setDeviceId(snapshot.data().deviceId);
  //           if (deviceId === null) {
  //             //handle here
  //           } else {
  //             db.ref("FirebaseIOT/Live_data/" + snapshot.data().deviceId).on(
  //               "value",
  //               function (snapshot) {
  //                 setLiveData(snapshot.val());
  //               }
  //             );
  //           }
  //         });
  //       setLoading(true);
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   })();
  // }, []);

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       await db
  //         .ref("FirebaseIOT/Keep_record/1001")
  //         .once("value", function (snapshot) {
  //           let tempRecordArray = [];
  //           snapshot.forEach(function (childsnapshot) {
  //             if (childsnapshot.val().voltage) {
  //               let tempObj = {
  //                 id: childsnapshot.key,
  //                 humidity: childsnapshot.val().humidity,
  //                 light: childsnapshot.val().light,
  //                 moisture: childsnapshot.val().moisture,
  //                 motor_status: childsnapshot.val().motor_status,
  //                 solar_status: childsnapshot.val().solar_status,
  //                 temperature: childsnapshot.val().temperature,
  //                 voltage: childsnapshot.val().voltage,
  //               };
  //               tempRecordArray.push(tempObj);
  //             }
  //           });
  //           setRecords(tempRecordArray);
  //         });
  //       console.log("Records Updated");
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   })();
  // }, []);

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
      <Container>
        <Card style={{ width: "350px" }}>
          <Card.Body>
            <h2>My Devices</h2>
            <div className="row">
              {loading ? (
                <>
                  <Spinner animation="border" />
                </>
              ) : (
                devices.map((deviceId) => {
                  return (
                    <div
                      className="card card-block"
                      key={deviceId.id}
                      style={{ width: "18rem", margin: "0px 10px 0px 10px" }}
                    >
                      <img
                        className="card-img-top"
                        src="https://i.imgur.com/73cwR7F.jpg"
                        alt="Card image cap"
                      />
                      <div className="card-body">
                        <h5 className="card-title">{deviceId.deviceId}</h5>
                        <p className="card-text">
                          Some quick example text to build on the card title and
                          make up the bulk of the card's content.
                        </p>
                        <Link
                          to={`/profile/${deviceId.deviceId}`}
                          className="btn btn-primary"
                        >
                          View More
                        </Link>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </Card.Body>
        </Card>
      </Container>

      {/* <Container>
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
      </Container> */}
    </React.Fragment>
  );
};

export default Dashboard;
