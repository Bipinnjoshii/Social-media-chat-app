import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GLOBALTYPES } from "../redux/actions/globalTypes";
import { createPost, updatePost } from "../redux/actions/postAction";
import Icons from "./Icons";
import { imageShow, videoShow } from "../utils/mediaShow";

const StatusModal = () => {
  const { auth, theme, status, socket } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);
  const [stream, setStream] = useState(false);
  const [tracks, setTracks] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const videoRef = useRef();
  const refCanvas = useRef();

  const handleChangeImages = (e) => {
    const files = [...e.target.files];
    let err = "";
    let newImages = [];

    files.forEach((file) => {
      if (!file) return (err = "File does not exist.");

      if (file.size > 1024 * 1024 * 5) {
        return (err = "The image/video largest is 5mb.");
      }

      return newImages.push(file);
    });

    if (err) dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err } });
    setImages([...images, ...newImages]);
  };

  const deleteImages = (index) => {
    const newArr = [...images];
    newArr.splice(index, 1);
    setImages(newArr);
  };

  const handleStream = () => {
    setStream(true);
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((mediaStream) => {
          videoRef.current.srcObject = mediaStream;
          videoRef.current.play();

          const track = mediaStream.getTracks();
          setTracks(track[0]);
        })
        .catch((err) => console.log(err));
    }
  };

  const handleCapture = () => {
    const width = videoRef.current.clientWidth;
    const height = videoRef.current.clientHeight;

    refCanvas.current.setAttribute("width", width);
    refCanvas.current.setAttribute("height", height);

    const ctx = refCanvas.current.getContext("2d");
    ctx.drawImage(videoRef.current, 0, 0, width, height);
    let URL = refCanvas.current.toDataURL();
    setImages([...images, { camera: URL }]);
  };

  const handleStopStream = () => {
    if (tracks && tracks.stop) {
      tracks.stop();
    }
    setStream(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (images.length === 0 && !content.trim()) {
      return dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: "Please add your content or an image/video." },
      });
    }

    setIsSubmitting(true);
    if (status.onEdit) {
      await dispatch(updatePost({ content, images, auth, status }));
    } else {
      await dispatch(createPost({ content, images, auth, socket }));
    }
    setIsSubmitting(false);

    setContent("");
    setImages([]);
    if (tracks && tracks.stop) tracks.stop();
    dispatch({ type: GLOBALTYPES.STATUS, payload: false });
  };

  useEffect(() => {
    if (status.onEdit) {
      setContent(status.content || "");
      setImages(status.images || []);
    }
  }, [status]);

  return (
    <div className="status_modal">
      <form onSubmit={handleSubmit}>
        <div className="status_header">
          <h5 className="m-0">{status.onEdit ? "Edit Post" : "Create Post"}</h5>
          <button
            type="button"
            className="close_modal_btn"
            aria-label="Close modal"
            onClick={() => dispatch({ type: GLOBALTYPES.STATUS, payload: false })}
          >
            &times;
          </button>
        </div>

        <div className="status_body">
          <textarea
            onChange={(e) => setContent(e.target.value)}
            value={content}
            name="content"
            aria-label="Post text content"
            placeholder={`${auth.user ? auth.user.username : 'Student'}, share a project, critique, or update...`}
          />

          <div className="d-flex align-items-center justify-content-end mb-2">
            <Icons setContent={setContent} content={content} theme={theme} />
          </div>

          <div className="show_images">
            {images.map((img, index) => (
              <div key={index} className="file_img position-relative">
                {img.camera ? (
                  imageShow(img.camera, theme)
                ) : img.url ? (
                  <>
                    {img.url.match(/video/i)
                      ? videoShow(img.url)
                      : imageShow(img.url)}
                  </>
                ) : (
                  <>
                    {img.type && img.type.match(/video/i)
                      ? videoShow(URL.createObjectURL(img))
                      : imageShow(URL.createObjectURL(img))}
                  </>
                )}
                <button
                  type="button"
                  className="delete_media_btn"
                  aria-label="Remove file"
                  onClick={() => deleteImages(index)}
                >
                  &times;
                </button>
              </div>
            ))}
          </div>

          {stream && (
            <div className="stream position-relative mt-2">
              <video
                width="100%"
                height="100%"
                ref={videoRef}
                autoPlay
                muted
              />

              <button
                type="button"
                className="stop_stream_btn"
                aria-label="Stop camera"
                onClick={handleStopStream}
              >
                &times;
              </button>
              <canvas style={{ display: "none" }} ref={refCanvas} />
            </div>
          )}

          <div className="input_images">
            {stream ? (
              <button
                type="button"
                className="action_btn camera_btn"
                aria-label="Capture snapshot"
                onClick={handleCapture}
              >
                <i className="fas fa-camera" />
              </button>
            ) : (
              <>
                <button
                  type="button"
                  className="action_btn camera_btn"
                  aria-label="Open camera"
                  onClick={handleStream}
                >
                  <i className="fas fa-camera" />
                </button>
                <div className="file_upload">
                  <label htmlFor="file" className="action_btn file_label_btn" aria-label="Upload photos or videos">
                    <i className="fas fa-image" />
                  </label>
                  <input
                    onChange={handleChangeImages}
                    type="file"
                    name="file"
                    id="file"
                    multiple
                    accept="image/*,video/*"
                    aria-label="Select files to upload"
                  />
                </div>
              </>
            )}
          </div>
        </div>

        <div className="status_footer mt-3">
          <button
            className="btn btn-primary w-100"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Publishing..." : status.onEdit ? "Update Post" : "Share with Studio"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default StatusModal;
