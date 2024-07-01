import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route } from 'react-router-dom';
// import NavBar from './components/NavBar';  // Assuming NavBar is in components folder
import { FaMarker, FaDatabase, FaLevelDownAlt, FaMailBulk } from "react-icons/fa";
import { FaCheck, FaUsersViewfinder } from "react-icons/fa6";
import DataPage from './components/DataPage';
import InputPage from './components/InputPage';
import PreviewPage from './components/PreviewPage';
import EmailPage from './components/EmailPage';
import TemplatePage from './components/TemplatePage';
import './App.css';
// import Navbar from '../components/Navbar';
function NavBar() {
    return (
      <nav className="nav">
        <div className="company-name">MAIL.ME <FaMarker /></div>
      </nav>
    );
  }
function App() {
  const [data, setData] = useState({ name: '', id: '', category: '' });
  const [inputText, setInputText] = useState('');
  const [email, setEmail] = useState({ to: '', cc: '' });
  const [preview, setPreview] = useState({ name: '', id: '', category: '', text: '', to: '', cc: '' });
  const [customHeader, setCustomHeader] = useState('');
  const [customFooter, setCustomFooter] = useState('');

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
    if (name === 'customHeader') {
      setCustomHeader(value);
    } else if (name === 'customFooter') {
      setCustomFooter(value);
    }
  };

  useEffect(() => {
    const replacePlaceholders = (text, name, id) => {
      return text.replace('{name}', name).replace('{order id}', id);
    };

    const headerText = replacePlaceholders(customHeader || `Welcome {name}.\n Your order id {order id}.`, data.name, data.id);
    const footerText = replacePlaceholders(customFooter || 'Thanks for your attention.', data.name, data.id);
    const formattedText = `${headerText}\n\n${inputText}\n\n${footerText}`;
    setPreview({ ...data, text: formattedText, to: email.to, cc: email.cc });
  }, [data, inputText, email, customHeader, customFooter]);

  const handleSendClick = () => {
    const emailData = {
      to: preview.to,
      cc: preview.cc,
      subject: 'New Message from MAIL.ME',
      text: preview.text
    };

    axios.post('http://localhost:3001/send-email', emailData)
      .then(response => {
        alert('Email sent successfully!');
      })
      .catch(error => {
        console.error('Failed to send email:', error);
        alert('Failed to send email: ' + error.message);
      });

    const excelData = {
      name: data.name,
      id: data.id,
      category: data.category,
      text: preview.text,
      to: email.to
    };

    axios.post('http://localhost:3001/save-data', excelData)
      .then(response => {
        alert('Data saved to MongoDB successfully!');
      })
      .catch(error => {
        console.error('Failed to save data:', error);
        alert('Failed to save data: ' + error.message);
      });
  };

  const handleTemplateClick = (template) => {
    let header = '';
    let content = '';
    let footer = '';

    switch (template) {
      case 'NEWS':
        header = 'Latest News for {name}';
        content = 'Here are the latest updates and news...';
        footer = 'Stay tuned for more news.';
        break;
      case 'OFFER':
        header = 'Special Offer for {name}';
        content = 'We are excited to offer you...';
        footer = 'Don’t miss out on this special offer!';
        break;
      case 'INVITATION':
        header = 'You’re Invited, {name}';
        content = 'We are pleased to invite you to...';
        footer = 'We look forward to seeing you!';
        break;
      case 'WELCOME':
        header = 'Welcome {name}!';
        content = 'We are thrilled to welcome you...';
        footer = 'Thanks for joining us!';
        break;
      case 'PROMOTIONAL':
        header = 'Exclusive Promotion for {name}';
        content = 'Check out our latest promotion...';
        footer = 'Enjoy your shopping!';
        break;
      default:
        break;
    }

    setCustomHeader(header);
    setInputText(content);
    setCustomFooter(footer);
  };

  return (
    <div className="App">
    <NavBar/>
      <div className="content">
        <div className="upper">
          <DataPage data={data} handleDataChange={handleDataChange} />
          <InputPage
            inputText={inputText}
            handleInputChange={handleInputChange}
            customHeader={customHeader}
            customFooter={customFooter}
            handleCustomChange={handleCustomChange}
          />
          <PreviewPage preview={preview} />
          <EmailPage email={email} handleEmailChange={handleEmailChange} handleSendClick={handleSendClick} />
        </div>
        <TemplatePage handleTemplateClick={handleTemplateClick} />
      </div>
    </div>
  );
}

export default App;
