import React from 'react';
import {
  EmailShareButton, EmailIcon,
  FacebookShareButton, FacebookIcon,
  LinkedinShareButton, LineIcon,
  PinterestShareButton, PinterestIcon,
  RedditShareButton, RedditIcon,
  TelegramShareButton, TelegramIcon,
  TwitterShareButton, TwitterIcon,
  WhatsappShareButton, WhatsappIcon
} from "react-share";

const ShareModal = ({ url, theme, setIsShare }) => {
  return (
    <div className="share_modal">
      <div className="share_modal-container">
        <div className="share_modal-header">
          <span className="fw-semibold">Share to...</span>
          <button
            type="button"
            className="close_modal_btn"
            aria-label="Close share dialog"
            onClick={() => setIsShare(false)}
          >
            &times;
          </button>
        </div>
        <div className="share_modal-body">
          <FacebookShareButton url={url} aria-label="Share on Facebook">
            <FacebookIcon round={true} size={36} />
          </FacebookShareButton>

          <TwitterShareButton url={url} aria-label="Share on Twitter">
            <TwitterIcon round={true} size={36} />
          </TwitterShareButton>

          <EmailShareButton url={url} aria-label="Share via Email">
            <EmailIcon round={true} size={36} />
          </EmailShareButton>

          <TelegramShareButton url={url} aria-label="Share on Telegram">
            <TelegramIcon round={true} size={36} />
          </TelegramShareButton>

          <WhatsappShareButton url={url} aria-label="Share on WhatsApp">
            <WhatsappIcon round={true} size={36} />
          </WhatsappShareButton>

          <PinterestShareButton url={url} aria-label="Share on Pinterest">
            <PinterestIcon round={true} size={36} />
          </PinterestShareButton>

          <RedditShareButton url={url} aria-label="Share on Reddit">
            <RedditIcon round={true} size={36} />
          </RedditShareButton>

          <LinkedinShareButton url={url} aria-label="Share on LinkedIn">
            <LineIcon round={true} size={36} />
          </LinkedinShareButton>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
