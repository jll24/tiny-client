import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Card, Button } from "react-bootstrap";

const ProfileCard = props => {
  const [hover, setHover] = useState(false);

  return (
    <>
      {!props.loggedInUser.following.includes(props.user._id) ? (
        <Col md={4}>
          <Card
            className="shadow m-2"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}>
            <Card.Body>
              <Row>
                <Col className="col-md-4">
                  <Card.Img
                    variant="top"
                    style={{ width: "70%", height: "70px" }}
                    src={props.user.photo}
                  />
                </Col>
                <Col className="col-md-8">
                  <Card.Title>
                    <Link
                      to={`/profile/${props.user.username}`}
                      className="username-link">
                      {props.user.firstname} {props.user.lastname}
                    </Link>
                  </Card.Title>
                  <Card.Link href="#" className="text-decoration-none">
                    <span
                      className="text-primary"
                      onClick={e =>
                        props.triggerFollowBtn(
                          e,
                          props.loggedInUser,
                          props.user
                        )
                      }>
                      <Button
                        style={{
                          backgroundColor: "#ff5f4a",
                          border: "1px solid #ff5f4a",
                          color: "white",
                          borderRadius: "15px",
                          textAlign: "center",
                          width: "100px",
                        }}>
                        Follow
                      </Button>
                    </span>
                  </Card.Link>
                </Col>
              </Row>
            </Card.Body>
            <Card.Footer style={!hover ? null : { height: "auto" }}>
              <div
                className={hover ? "" : "text-truncate"}
                dangerouslySetInnerHTML={{
                  __html: props.user.aboutme
                    ? props.user.aboutme
                    : `Hello, I am ${props.user.firstname}! `,
                }}></div>
            </Card.Footer>
          </Card>
        </Col>
      ) : null}
    </>
  );
};

export default ProfileCard;
