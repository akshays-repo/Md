import React from "react";
import { FaTelegramPlane } from "react-icons/fa";
import { AiOutlinePaperClip } from "react-icons/ai";

import LeftSideChat from "./leftSideChat";
import RightSideChat from "./rightSideChat";
import "./style.scss";
const MessageDetail = () => {
  return (
    <div className="chatmain">
      <div className="messagedetail">
        <div className="left">
          <img className="useravatar" src="https://i.pravatar.cc/300" />
        </div>
        <div className="right">
          <span>User Name</span>
          <p>online</p>
        </div>
      </div>
      <div className="chat">
        <LeftSideChat message=" Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Nulla quis lorem ut libero malesuada feugiat." />
        <RightSideChat message="Proin eget tortor risus. Nulla porttitor accumsan tincidunt. Sed porttitor lectus nibh. Quisque velit nisi, pretium" />
        <LeftSideChat message=" lacinia eget " />
        <RightSideChat message="ullamcorper sit amet ligula. Vivamus suscipit tortor eget felis porttitor volutpat. Vivamus magna justo," />
        <LeftSideChat message=" Vivamus magna justo" />
        <LeftSideChat message=". Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Pellentesque in ipsum id orci porta dapibus." />
        <RightSideChat message=" elit, eget" />
        <LeftSideChat message=" Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Nulla quis lorem ut libero malesuada feugiat." />
        <RightSideChat message="Proin eget tortor risus. Nulla porttitor accumsan tincidunt. Sed porttitor lectus nibh. Quisque velit nisi, pretium" />
        <LeftSideChat message=" lacinia eget " />
        <RightSideChat message="ullamcorper sit amet ligula. Vivamus suscipit tortor eget felis porttitor volutpat. Vivamus magna justo," />
        <LeftSideChat message=" Vivamus magna justo" />
        <LeftSideChat message=". Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Pellentesque in ipsum id orci porta dapibus." />
        <RightSideChat message=" elit, eget" />
        <LeftSideChat message=" Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Nulla quis lorem ut libero malesuada feugiat." />
        <RightSideChat message="Proin eget tortor risus. Nulla porttitor accumsan tincidunt. Sed porttitor lectus nibh. Quisque velit nisi, pretium" />
        <LeftSideChat message=" lacinia eget " />
        <RightSideChat message="ullamcorper sit amet ligula. Vivamus suscipit tortor eget felis porttitor volutpat. Vivamus magna justo," />
        <LeftSideChat message=" Vivamus magna justo" />
        <LeftSideChat message=". Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Pellentesque in ipsum id orci porta dapibus." />
        <RightSideChat message=" elit, eget" />
        <LeftSideChat message=" Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Nulla quis lorem ut libero malesuada feugiat." />
        <RightSideChat message="Proin eget tortor risus. Nulla porttitor accumsan tincidunt. Sed porttitor lectus nibh. Quisque velit nisi, pretium" />
        <LeftSideChat message=" lacinia eget " />
        <RightSideChat message="ullamcorper sit amet ligula. Vivamus suscipit tortor eget felis porttitor volutpat. Vivamus magna justo," />
        <LeftSideChat message=" Vivamus magna justo" />
        <LeftSideChat message=". Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Pellentesque in ipsum id orci porta dapibus." />
        <RightSideChat message=" elit, eget" />
      </div>

      <div className="message-sentbox">
        <div>
          <label className="paper-clip">
            <AiOutlinePaperClip />
            <input type="file" />
          </label>
        </div>

        <div>
          <input type="text" placeholder="Type something" />{" "}
        </div>

        <div>
          <button className="sent-button">
            {" "}
            <FaTelegramPlane />
          </button>
        </div>
      </div>
    </div>
  );
};
export default MessageDetail;
