import React from "react";
import { FaReply } from "react-icons/fa6";

function ReplyComment() {
  return (
    <div className="replies-container">
        <div className="reply-comment">
          <div className="comment-status-counts">
            <div>+</div>
            <div>3</div>
            <div>-</div>
          </div>
          <div className="comment-body">
            <div className="comment-titles">
              <div className="title">
                <img className="users-img" src="../public/images/avatars/image-maxblagun.png" alt="hlelo" />
                <div className="title-name">balo-battar</div>
                <p className="data-commented">3 month ago</p>
              </div>
              <button type="button" className="reply-button">
                <FaReply /> Reply
              </button>
            </div>
            <div className="user-paragraph data-commented">If you're still new, I'd recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first.</div>
          </div>
        </div>
    </div>
  );
}

export default ReplyComment;
