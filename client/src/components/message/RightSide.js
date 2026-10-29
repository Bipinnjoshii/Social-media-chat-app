import React, { useEffect, useState, useRef } from "react";
import UserCard from "../UserCard";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import MsgDisplay from "./MsgDisplay";
import Icons from "../Icons";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";
import { imageShow, videoShow } from "../../utils/mediaShow";
import { imageUpload } from "../../utils/imageUpload";
import { addMessage, getMessages, MESSAGE_TYPES } from "../../redux/actions/messageAction";
import LoadingIcon from "../LoadingIcon";

const RightSide = () => {
  const { auth, message, theme, socket } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [user, setUser] = useState({});
  const [text, setText] = useState("");
  const [page, setPage] = useState(0);
  const [data, setData] = useState([]);
  const { id } = useParams();
  const [media, setMedia] = useState([]);
  const [loadMedia, setLoadMedia] = useState(false);

  const refDisplay = useRef();
  const pageEnd = useRef();

  useEffect(() => {
    const newData = (message.data || []).filter(
      (item) => item.sender === auth?.user?._id || item.sender === id
    );
    setData(newData);
  }, [message.data, auth?.user?._id, id]);

  useEffect(() => {
    const newUser = (message.users || []).find((u) => u._id === id);
    if (newUser) {
      setUser(newUser);
    }
  }, [message.users, id]);

  const handleChangeMedia = (e) => {
    const files = [...e.target.files];
    let err = "";
    let newMedia = [];

    files.forEach((file) => {
      if (!file) {
        return (err = "File does not exist.");
      }
      if (file.size > 1024 * 1024 * 5) {
        return (err = "Image size must be less than 5 MB.");
      }
      return newMedia.push(file);
    });
    if (err) {
      dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err } });
    }
    setMedia([...media, ...newMedia]);
  };

  const handleDeleteMedia = (index) => {
    const newArr = [...media];
    newArr.splice(index, 1);
    setMedia(newArr);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim() && media.length === 0) return;
    const currentText = text;
    const currentMedia = media;
    setText("");
    setMedia([]);

    setLoadMedia(true);

    let newArr = [];
    if (currentMedia.length > 0) newArr = await imageUpload(currentMedia);

    const msg = {
      sender: auth?.user?._id,
      recipient: id,
      text: currentText,
      media: newArr,
      createdAt: new Date().toISOString(),
    };
    setLoadMedia(false);
    await dispatch(addMessage({ msg, auth, socket }));
    if (refDisplay.current) {
      refDisplay.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  };

  useEffect(() => {
    if (id && auth?.token) {
      const getMessagesData = async () => {
        dispatch({ type: MESSAGE_TYPES.GET_MESSAGES, payload: { messages: [] } });
        setPage(1);
        await dispatch(getMessages({ auth, id }));
        if (refDisplay.current) {
          refDisplay.current.scrollIntoView({ behavior: "smooth", block: "end" });
        }
      };

      getMessagesData();
    }
  }, [id, dispatch, auth]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage((p) => p + 1);
        }
      },
      { threshold: 0.1 }
    );
    if (pageEnd.current) observer.observe(pageEnd.current);
  }, [setPage]);

  useEffect(() => {
    if (message.resultData >= (page - 1) * 9 && page > 1 && auth?.token) {
      dispatch(getMessages({ auth, id, page }));
    }
  }, [message.resultData, page, id, auth, dispatch]);

  useEffect(() => {
    if (refDisplay.current) {
      refDisplay.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [text, data]);

  return (
    <>
      <div className="message_header">
        {user && user._id && (
          <div className="w-100 d-flex justify-content-between align-items-center">
            <UserCard user={user}>
              <div className="d-flex align-items-center gap-2">
                <span className="badge rounded-pill" style={{ background: "rgba(16, 185, 129, 0.12)", color: "#10B981", fontSize: "0.72rem", padding: "4px 8px" }}>
                  Active
                </span>
              </div>
            </UserCard>
          </div>
        )}
      </div>

      <div
        className="chat_container"
        style={{ height: media.length > 0 ? "calc(100% - 210px)" : "" }}
      >
        <div className="chat_display" ref={refDisplay}>
          <button style={{ marginTop: "-25px", opacity: 0, height: "1px" }} ref={pageEnd}>
            Load..
          </button>

          {data.map((msg, index) => {
            const isMe = msg.sender === auth?.user?._id;
            return (
              <div
                key={index}
                className={`chat_row ${isMe ? "you_message" : "other_message"}`}
              >
                <MsgDisplay
                  user={isMe ? auth?.user : user}
                  msg={msg}
                  theme={theme}
                  isMe={isMe}
                />
              </div>
            );
          })}

          {loadMedia && (
            <div className="chat_row you_message">
              <LoadingIcon size="small" />
            </div>
          )}
        </div>
      </div>

      {media.length > 0 && (
        <div className="show_media">
          {media.map((item, index) => (
            <div key={index} id="file_media">
              {item.type.match(/video/i)
                ? videoShow(URL.createObjectURL(item), theme)
                : imageShow(URL.createObjectURL(item), theme)}
              <span onClick={() => handleDeleteMedia(index)}>&times;</span>
            </div>
          ))}
        </div>
      )}

      <form className="chat_input" onSubmit={handleSubmit}>
        <input
          placeholder="Write a message..."
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <Icons setContent={setText} content={text} theme={theme} />
        <div className="file_upload" title="Attach image or video">
          <i className="fas fa-image" style={{ fontSize: "1.1rem" }} />
          <input
            type="file"
            name="file"
            id="file"
            multiple
            accept="image/*,video/*"
            onChange={handleChangeMedia}
          />
        </div>
        <button
          type="submit"
          disabled={!text.trim() && media.length === 0}
          className="btn-send"
          title="Send message"
        >
          <i className="fas fa-paper-plane" style={{ fontSize: "0.95rem" }} />
        </button>
      </form>
    </>
  );
};

export default RightSide;
