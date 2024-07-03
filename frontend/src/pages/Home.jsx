import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FaMarker,
  FaDatabase,
  FaLevelDownAlt,
  FaMailBulk,
} from "react-icons/fa";
import { FaCheck, FaUsersViewfinder } from "react-icons/fa6";
import CanvasTextEditor from "./CanvasTextEditor.jsx";
import styles from "../css/Home.module.css";

function NavBar() {
  const navStyles = {
    backgroundColor: '#1f1f1f',
    color: '#bb86fc',
    padding: '10px',
    display: 'flex',
    fontSize: '20px',
    justifyContent: 'space-between', // Aligns items with space between them
    alignItems: 'center', // Centers items vertically
  };

  const listStyles = {
    listStyleType: 'none', // Removes default list styling
    margin: 0, // Removes default margin
    padding: 0, // Removes default padding
    fontSize: '18px',

  };

  return (
    <nav style={navStyles}>
      <div className="company-name">
        MAIL.ME <FaMarker />
      </div>
      <ul style={listStyles}>
        <li>
          <a href="dash" style={{ color: '#03dac6', fontWeight:'bold',textDecoration: 'none', fontFamily:'sans-serif' }}>Dashboard</a>
        </li>
      </ul>
    </nav>
  );
}


const DataSection = ({ data, handleDataChange }) => (
  <div className={`${styles.section} ${styles["data-section"]}`}>
    <div className={styles["section-title"]}>
      DATA <FaDatabase />
    </div>
    <input
      type="text"
      name="name"
      placeholder="Name"
      value={data.name}
      onChange={handleDataChange}
      className={styles.input}
    />
    <input
      type="text"
      name="id"
      placeholder="ID"
      value={data.id}
      onChange={handleDataChange}
      className={styles.input}
    />
    <input
      type="text"
      name="category"
      placeholder="Category"
      value={data.category}
      onChange={handleDataChange}
      className={styles.input}
    />
  </div>
);

const InputSection = ({
  inputText,
  handleInputChange,
  customHeader,
  customFooter,
  handleCustomChange,
  canvasText,
  handleCanvasTextChange,
}) => (
  <div className={`${styles.section} ${styles["input-section"]}`}>
    <div className={styles["section-title"]}>
      INPUT <FaLevelDownAlt />
    </div>
    <h4>ADD CUSTOM HEADER</h4>
    <div className={styles["custom-inputs"]}>
      <input
        type="text"
        name="customHeader"
        placeholder="USE {name} to add name and {order id} to add order id"
        value={customHeader}
        onChange={handleCustomChange}
        className={styles.input}
      />
    </div>
    <h4>ADD CONTENT</h4>
    <textarea
      className={`${styles.input} ${styles["input-textarea"]}`}
      placeholder="Enter your text here"
      value={inputText}
      onChange={handleInputChange}
    />
    <h4>CANVAS TEXT EDITOR</h4>
    <CanvasTextEditor
      initialText={canvasText}
      onTextChange={handleCanvasTextChange}
    />
    <h4>ADD CUSTOM FOOTER</h4>
    <input
      type="text"
      name="customFooter"
      placeholder="Custom Footer"
      value={customFooter}
      onChange={handleCustomChange}
      className={styles.input}
    />
  </div>
);

const PreviewSection = ({ preview }) => (
  <div className={`${styles.section} ${styles["preview-section"]}`}>
    <div className={styles["section-title"]}>
      PREVIEW <FaUsersViewfinder />
    </div>
    <div className={styles["preview-box"]}>
      <p>
        <strong>Name:</strong> {preview.name}
      </p>
      <p>
        <strong>ID:</strong> {preview.id}
      </p>
      <p>
        <strong>Category:</strong> {preview.category}
      </p>
      <div className={styles["preview-text"]}>
        <p>
          {preview.text.split("\n").map((line, index) => (
            <span key={index}>
              {line}
              <br />
            </span>
          ))}
        </p>
      </div>
      <p>
        <strong>To:</strong> {preview.to}
      </p>
      <p>
        <strong>CC:</strong> {preview.cc}
      </p>
    </div>
  </div>
);

const EmailSection = ({ email, handleEmailChange, handleSendClick }) => (
  <div className={`${styles.section} ${styles["email-section"]}`}>
    <div className={styles["section-title"]}>
      EMAIL <FaMailBulk />
    </div>
    <input
      type="text"
      name="to"
      placeholder="To"
      value={email.to}
      onChange={handleEmailChange}
      className={styles.input}
    />
    <input
      type="text"
      name="cc"
      placeholder="CC"
      value={email.cc}
      onChange={handleEmailChange}
      className={styles.input}
    />
    <button className={styles["send-button"]} onClick={handleSendClick}>
      SEND <FaCheck />
    </button>
  </div>
);

const TemplateSection = ({ handleTemplateClick }) => (
  <div className={`${styles.section} ${styles["template-section"]}`}>
    <div className={styles["section-title"]}>TEMPLATE</div>
    <div className={styles["template-boxes"]}>
      <div
        className={styles["template-box"]}
        onClick={() => handleTemplateClick("NEWS")}
      >
        NEWS <br />
      </div>
      <div
        className={styles["template-box"]}
        onClick={() => handleTemplateClick("OFFER")}
      >
        OFFER <br />
      </div>
      <div
        className={styles["template-box"]}
        onClick={() => handleTemplateClick("INVITATION")}
      >
        INVITATION <br />
      </div>
      <div
        className={styles["template-box"]}
        onClick={() => handleTemplateClick("WELCOME")}
      >
        WELCOME <br />
      </div>
      <div
        className={styles["template-box"]}
        onClick={() => handleTemplateClick("PROMOTIONAL")}
      >
        PROMOTIONAL <br />
      </div>
    </div>
  </div>
);

const copyToClipboard = (content) => {
  navigator.clipboard
    .writeText(content)
    .then(() => alert("Content copied to clipboard"))
    .catch((error) => console.error("Failed to copy:", error));
};

function Home() {
  const [data, setData] = useState({ name: "", id: "", category: "" });
  const [inputText, setInputText] = useState("");
  const [email, setEmail] = useState({ to: "", cc: "" });
  const [preview, setPreview] = useState({
    name: "",
    id: "",
    category: "",
    text: "",
    to: "",
    cc: "",
  });
  const [customHeader, setCustomHeader] = useState("");
  const [customFooter, setCustomFooter] = useState("");
  const [chatInput, setChatInput] = useState("");
  const [chatHistory, setChatHistory] = useState("");
  const [canvasText, setCanvasText] = useState("");

  const handleDataChange = (event) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
  };

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleEmailChange = (event) => {
    const { name, value } = event.target;
    setEmail({ ...email, [name]: value });
  };

  const handleCustomChange = (event) => {
    const { name, value } = event.target;
    if (name === "customHeader") {
      setCustomHeader(value);
    } else if (name === "customFooter") {
      setCustomFooter(value);
    }
  };

  const handleChatInputChange = (event) => {
    setChatInput(event.target.value);
  };

  const handleChatClick = () => {
    setChatHistory(chatHistory + `You: ${chatInput}\n`);
    setChatInput("");
  };

  useEffect(() => {
    const replacePlaceholders = (text, name, id) => {
      return text.replace("{name}", name).replace("{order id}", id);
    };

    const headerText = replacePlaceholders(
      customHeader || `Welcome {name}.\n Your order id {order id}.`,
      data.name,
      data.id
    );
    const footerText = replacePlaceholders(
      customFooter || "Thanks for your attention.",
      data.name,
      data.id
    );
    const formattedText = `${headerText}\n\n${inputText}\n\nCanvas Text:\n${canvasText}\n\n${footerText}`;
    setPreview({ ...data, text: formattedText, to: email.to, cc: email.cc });
  }, [data, inputText, email, customHeader, customFooter, canvasText]);

  const handleSendClick = () => {
    const emailData = {
      to: preview.to,
      cc: preview.cc,
      subject: "New Message from MAIL.ME",
      text: preview.text,
    };

    axios
      .post("http://localhost:3001/send-email", emailData)
      .then((response) => {
        alert("Email sent successfully!");
      })
      .catch((error) => {
        console.error("Failed to send email:", error);
        alert("Failed to send email: " + error.message);
      });
    const token = localStorage.getItem("authToken");
    const eemail = localStorage.getItem("email");

    if (!token) {
      console.error("No token found, authorization denied");
      return;
    }
    const excelData = {
      name: data.name,
      id: data.id,
      category: data.category,
      text: preview.text,
      to: email.to,
      user_id: "h",
    };

    axios
      .post(
        "http://localhost:5001/api/emails/postemails",
        excelData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        alert("Data saved to MongoDB successfully!");
      })
      .catch((error) => {
        console.error("Failed to save data:", error);
        alert("Failed to save data: " + error.message);
      });
  };

  const handleButtonClick = () => {
    // Replace 'https://example.com' with the actual URL you want to open
    window.open("http://localhost:5174/", "_blank");
  };

  const handleTemplateClick = (template) => {
    let header = "";
    let content = "";
    let footer = "";

    switch (template) {
      case "NEWS":
        header = "Latest News for {name}";
        content = "Here are the latest updates and news...";
        footer = "Stay tuned for more news.";
        break;
      case "OFFER":
        header = "Special Offer for {name}";
        content = "We are excited to offer you...";
        footer = "Don’t miss out on this special offer!";
        break;
      case "INVITATION":
        header = "You’re Invited, {name}";
        content = "We are pleased to invite you to...";
        footer = "We look forward to seeing you!";
        break;
      case "WELCOME":
        header = "Welcome {name}!";
        content = "We are thrilled to welcome you...";
        footer = "Thanks for joining us!";
        break;
      case "PROMOTIONAL":
        header = "Exclusive Promotion for {name}";
        content = "Check out our latest promotion...";
        footer = "Enjoy your shopping!";
        break;
      default:
        break;
    }

    setCustomHeader(header);
    setInputText(content);
    setCustomFooter(footer);
  };

  useEffect(() => {
    // Set the background color of the body when the component mounts
    document.body.style.backgroundColor = "#333";

    // Reset the background color when the component unmounts
    return () => {
      document.body.style.backgroundColor = "";
    };
  }, []);

  return (
    <div className={styles.App}>
      <NavBar />
      <div className={styles.content}>
        <div className={styles.upper}>
          <DataSection data={data} handleDataChange={handleDataChange} />
          <InputSection
            inputText={inputText}
            handleInputChange={handleInputChange}
            customHeader={customHeader}
            customFooter={customFooter}
            handleCustomChange={handleCustomChange}
            canvasText={canvasText}
            handleCanvasTextChange={setCanvasText}
          />
          <PreviewSection preview={preview} />
          <EmailSection
            email={email}
            handleEmailChange={handleEmailChange}
            handleSendClick={handleSendClick}
          />
        </div>
        <div className={styles.lower}>
          <button
            className={styles["single-button"]}
            onClick={handleButtonClick}
          >
            CHAT UP!
          </button>
        </div>
        <TemplateSection handleTemplateClick={handleTemplateClick} />
      </div>
    </div>
  );
}

export default Home;
