import React from "react";
import { Picker } from "emoji-mart";

const Icons = ({ setContent, content, theme }) => {
  return (
    <div className="nav-item dropdown" style={{ zIndex: "10" }}>
      <button
        type="button"
        className="action_btn emoji_picker_btn"
        id="emojiDropdownBtn"
        data-bs-toggle="dropdown"
        aria-label="Insert emoji"
        aria-expanded="false"
      >
        <i className="far fa-smile" style={{ fontSize: "1.15rem" }} />
      </button>

      <div className="dropdown-menu p-0 border-0 shadow-lg" aria-labelledby="emojiDropdownBtn">
        <Picker
          theme={theme ? "dark" : "light"}
          showSkinTones={true}
          showPreview={false}
          onSelect={(emoji) => setContent(content + emoji.native)}
          i18n={{
            search: "Search",
            clear: "Clear",
            notfound: "No Emoji Found",
            skintext: "Choose skin tone",
            categories: {
              search: "Search Results",
              recent: "Frequently Used",
              smileys: "Smileys & Emotion",
              people: "People & Body",
              nature: "Animals & Nature",
              foods: "Food & Drink",
              activity: "Activity",
              places: "Travel & Places",
              objects: "Objects",
              symbols: "Symbols",
              flags: "Flags",
              custom: "Custom",
            },
          }}
        />
      </div>
    </div>
  );
};

export default Icons;
