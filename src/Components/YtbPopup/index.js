import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import "./style.css";
export default function YoutubePopup(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // const handleUrlTrailer = (urlTrailer) => {
  //   urlTrailer.includes("https://www.youtube.com/embed/") ? urlTrailer : null;
  //   urlTrailer.includes("https://www.youtube.com/watch") ? urlTrailer : null;
  //   return urlTrailer;
  // };
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>

      <Modal
        className="modal"
        show={show}
        onHide={handleClose}
        animation={true}
      >
        <Modal.Body>
          <div style={{ padding: "56.25% 0 0 0", position: "relative" }}>
            <iframe
              id="ytplayer"
              src={`${props.trailer}`}
              // src={handleUrlTrailer}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
              }}
              frameBorder={0}
              allow="autoplay; fullscreen"
              allowFullScreen
            />
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
