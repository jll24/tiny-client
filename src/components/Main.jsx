import React,{ useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { Card, Button } from "react-bootstrap";

const Main = () => {
  const dispatch = useDispatch();
  const stories = useSelector(state => state.stories);
  const settings = useSelector(state => state.settings);
  
  useEffect(() => {
    axios.get(`${settings.API_URL}/stories`).then(res => {
      dispatch({ type: "LOAD_STORIES", payload: res.data.data });
    });   
  }, [dispatch, settings.API_URL]);

  function shuffle(uArray) {
    let i = uArray.length - 1;
    for (; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = uArray[i];
      uArray[i] = uArray[j];
      uArray[j] = temp;
    }
    return uArray;
  }
  const shuffleStories = shuffle(stories);

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexFlow: "row wrap-reverse",
          alignItems: "center",
          justifyContent: "space-around",
          paddingTop: "70px",
        }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "375px",
          }}>
          <h2
            style={{
              fontWeight: "700",
              textAlign: "center",
              fontSize: "30px",
            }}>
            #TRENDING
          </h2>
          <p style={{ textAlign: "center" }}>
            Catch up on the latest trends with just a tap!
          </p>
          {shuffleStories.slice(0, 3).map(story => {
            /* Add an if else statement here to show the top 5 or top 6 clapped story */
            return (
              <Card
                key={story._id}
                className="card"
                style={{
                  marginBottom: "5px",
                  height: "100px",
                  border: "2px solid lightgray",
                  width: "auto",
                }}>
                <Card.Body
                  className="cardBody"
                  style={{ display: "inline-flex", flexFlow: "wrap" }}>
                  <div
                    className="textContainer"
                    style={{
                      display: "flex",
                      flexFlow: "row wrap",
                      alignItems: "center",
                      justifyContent: "space-around",
                      height: "60px",
                      width: "335px",
                    }}>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        width: "50%",
                      }}>
                      <Card.Title
                        style={{
                          overflow: "hidden",
                          whiteSpace: "nowrap",
                          textOverflow: "ellipsis",
                        }}>
                        {story.title}
                      </Card.Title>
                      {/* <Card.Text */}                        
                      <div
                        dangerouslySetInnerHTML={{ __html: story.content }}
                        style={{
                          overflow: "hidden",
                          whiteSpace: "nowrap",
                          textOverflow: "ellipsis",
                        }}
                      />
                      {/* </Card.Text> */}
                    </div>
                    <Link to={`/stories/${story._id}`}>
                      <Button
                        style={{ backgroundColor: "#ff5f4a", border: "none" }}>
                        Read More
                      </Button>
                    </Link>
                  </div>
                </Card.Body>
              </Card>
            );
          })}
        </div>
        <div style={{ width: "375px", display: "flex" }}>
          <img
            src="https://res.cloudinary.com/jllacson/image/upload/v1639603498/sampleShop/5803490_micmwh.jpg"
            alt=""
            style={{ width: "100%" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Main;
