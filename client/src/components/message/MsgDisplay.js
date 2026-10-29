import React from 'react';
import Avatar from '../Avatar';
import { imageShow, videoShow } from '../../utils/mediaShow'; 
import moment from 'moment';

const MsgDisplay = ({ user, msg, theme, isMe }) => {
  const formattedTime = msg && msg.createdAt ? moment(msg.createdAt).format('h:mm A') : '';

  return (
    <>
      {!isMe && user && (
        <div className="chat_title">
          <Avatar src={user.avatar} size="small-avatar" />
          <span>{user.username}</span>
        </div>
      )}

      {msg && msg.text && (
        <div className="chat_text">
          {msg.text}
        </div>
      )}

      {msg && msg.media && msg.media.length > 0 && (
        <div className="d-flex flex-wrap gap-2 my-1" style={{ maxWidth: '360px' }}>
          {msg.media.map((item, index) => (
            <div
              key={index}
              style={{
                borderRadius: '14px',
                overflow: 'hidden',
                maxWidth: '100%',
                boxShadow: 'var(--shadow-sm)',
                border: '1px solid var(--border-color)',
              }}
            >
              {item.url && item.url.match(/video/i)
                ? videoShow(item.url, theme)
                : imageShow(item.url, theme)}
            </div>
          ))}
        </div>
      )}

      {formattedTime && (
        <div className="chat_time">
          {formattedTime}
        </div>
      )}
    </>
  );
};

export default MsgDisplay;
