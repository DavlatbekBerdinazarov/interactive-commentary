import React from "react";
import data from "./data"; // Assuming 'data.json' is in the same directory as your component
import "./App.css";
import { useState, useEffect, useRef } from "react";
import { FaReply } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [events, setEvents] = useState(data.comments);
  const [commentOn, setCommentOn] = useState(false);
  const [comments, setComments] = useState("");
  const [timeAgo, setTimeAgo] = useState("");

  const textAreaRef = useRef(null);

  useEffect(() => {
    // Function to calculate the time difference
    const calculateTimeAgo = () => {
      const currentDate = new Date();
      const commentDate = new Date(); // Use the current time as the comment timestamp
      const timeDifference = currentDate - commentDate;

      // Convert milliseconds to minutes
      const minutes = Math.floor(timeDifference / (1000 * 60));

      // Update the state with the time ago string
      setTimeAgo(`${minutes} minute${minutes === 1 ? "" : "s"} ago`);
    };

    // Calculate time ago initially
    calculateTimeAgo();

    // Update the time every minute
    const interval = setInterval(calculateTimeAgo, 60000);

    // Clean up interval on component unmount
    return () => clearInterval(interval);
  }, []);

  const resetInputs = () => {
    setComments("");
  };

  const newEvents = (item) => {
    setEvents((prev) => {
      return [...prev, item];
    });
  };

  const newReplyEvents = (item) => {
    setEvents((prevEvents) => {
      return prevEvents.map((event) => {
        // Check if the current event matches the eventId
        if (event.id) {
          // Check if the event already has a replies array
          if (event.replies) {
            // If yes, update the replies array by adding the new reply
            return { ...event, replies: [...event.replies, item] };
          } else {
            // If no replies array exists, create a new one with the new reply
            return { ...event, replies: [newReply] };
          }
        }
        // If the current event is not the one we're looking for, return it as it is
        return event;
      });
    });
  }


  const handleSubmit = (e) => {
    e.preventDefault();

    const event = {
      id: uuidv4(),
      content: comments,
      createdAt: timeAgo,
      score: Math.floor(Math.random() * 20),
      user: {
        image: {
          png: "./images/avatars/image-juliusomo.png",
        },
        username: "juliusomo",
      },
      replies: []
    };
    newReplyEvents(event)
    newEvents(event);
    resetInputs();
  };

const handleReplyButtonClick = (eventId) => {
  setCommentOn(!commentOn);
  // Focus the text area when the "Reply" button is clicked
  textAreaRef.current.focus();

  // Update the events array by mapping over it
  setEvents((prevEvents) => {
    return prevEvents.map((event) => {
      // Check if the current event matches the eventId
      if (event.id === eventId) {
        // Check if the event already has a replies array
        if (event.replies) {
          // If yes, update the replies array by adding the new reply
          return { ...event, replies: [...event.replies, newReply] };
        } else {
          // If no replies array exists, create a new one with the new reply
          return { ...event, replies: [newReply] };
        }
      }
      // If the current event is not the one we're looking for, return it as it is
      return event;
    });
  });
};


  const handleDeleteButton = (id) => {
    const filteredEvents = events.filter((item) => {
      return item.id !== id;
    });
    setEvents(filteredEvents);
  };

  const handleDeleteButtonReply = (replyId) => {
    setEvents((prevEvents) => {
      return prevEvents.map((event) => {
        if (event.replies && event.replies.length > 0) {
          const a = event.replies.filter((c) => {
            return c.id !== replyId;
          });
          return { ...event, replies: a };
        }
        return event;
      });
    });
  };

  // console.log(events);

  return (
    <div className="container">
      <div className="comment-container">
        {events.map((item) => (
          <div>
            <div className="main-comment" key={item.id}>
              <div className="comment-status-counts">
                <div>+</div>
                <div>{item.score}</div>
                <div>-</div>
              </div>
              <div className="comment-body">
                <div className="comment-titles">
                  <div className="title">
                    <img
                      className="users-img"
                      src={item.user.image.png}
                      alt=""
                    />
                    <div className="title-name">{item.user.username}</div>
                    {item.user.username == "juliusomo" && (
                      <p className="you">you</p>
                    )}
                    <p className="data-commented">{item.createdAt}</p>
                  </div>
                  {item.user.username === "juliusomo" ? (
                    <div style={{ display: "flex" }}>
                      <button
                        type="button"
                        className="reply-button-delete"
                        onClick={() => handleDeleteButton(item.id)}
                      >
                        <MdDelete /> Delete
                      </button>
                      <button
                        type="button"
                        className="reply-button"
                        onClick={handleReplyButtonClick}
                      >
                        <MdEdit /> Edit
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      className="reply-button"
                      onClick={handleReplyButtonClick}
                    >
                      <FaReply /> Reply
                    </button>
                  )}
                </div>
                <div className="user-paragraph data-commented">
                  {item.content}
                </div>
              </div>
            </div>
            {item.replies && (
              <div className="replies-container">
                {item.replies.map((reply) => (
                  <div className="reply-comment" key={reply.id}>
                    <div className="comment-status-counts">
                      <div>+</div>
                      <div>{reply.score}</div>
                      <div>-</div>
                    </div>
                    <div className="comment-body">
                      <div className="comment-titles">
                        <div className="title">
                          <img
                            className="users-img"
                            src={reply.user.image.png}
                            alt="hlelo"
                          />
                          <div className="title-name">
                            {reply.user.username}
                          </div>
                          {reply.user.username == "juliusomo" && (
                            <p className="you">you</p>
                          )}
                          <p className="data-commented">{reply.createdAt}</p>
                        </div>
                        {reply.user.username === "juliusomo" ? (
                          <div style={{ display: "flex" }}>
                            <button
                              type="button"
                              className="reply-button-delete"
                              onClick={() => handleDeleteButtonReply(reply.id)}
                            >
                              <MdDelete /> Delete
                            </button>
                            <button
                              type="button"
                              className="reply-button"
                              onClick={handleReplyButtonClick}
                            >
                              <MdEdit /> Edit
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            className="reply-button"
                            onClick={handleReplyButtonClick}
                          >
                            <FaReply /> Reply
                          </button>
                        )}
                      </div>
                      <div className="user-paragraph data-commented">
                        <span
                          style={{ color: "rgb(92,7,165)", marginRight: "3px" }}
                        >
                          @{item.user.username}
                        </span>
                        {reply.content}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
        {
          <div className="main-comment" style={{ height: "130px" }}>
            <div className="titles">
              <img
                src="./images/avatars/image-juliusomo.png"
                style={{
                  width: "33px",
                  marginTop: "20px",
                  position: "relative",
                  top: "-30px",
                }}
                alt=""
              />
              <form className="titles" onSubmit={handleSubmit}>
                <textarea
                  ref={textAreaRef}
                  className="textarea"
                  name=""
                  id=""
                  cols="60"
                  rows="3"
                  placeholder="Add a comment.."
                  onChange={(e) => setComments(e.target.value)}
                  value={comments}
                ></textarea>
                <input className="btn" type="submit" value="SEND" />
              </form>
            </div>
          </div>
        }
      </div>
    </div>
  );
}

export default App;
