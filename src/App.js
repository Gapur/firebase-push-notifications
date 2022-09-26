import { useState } from 'react';
import { ToastContainer, toast } from "react-toastify";

import logo from './firebase-logo.png';
import { getFirebaseToken } from './firebase';

const toastOptions = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
};

export default function App() {
  const [showNotificationBanner, setShowNotificationBanner] = useState(Notification.permission === 'default');

  const handleGetFirebaseToken = () => {
    getFirebaseToken()
      .then(firebaseToken => {
        if (firebaseToken) {
          setShowNotificationBanner(false);
        }
      })
      .catch((err) => console.error('An error occured while retrieving firebase token. ', err))
  }

  const ToastifyNotification = () => (
    <div className="push-notification">
      <h2 className="push-notification-title">New Message</h2>
      <p className="push-notification-text">You received a test push notification</p>
    </div>
  );

  return (
    <div className="app">
      {showNotificationBanner && <div className="notification-banner">
        <span>The app needs permission to</span>
        <a
          href="#"
          className="notification-banner-link"
          onClick={handleGetFirebaseToken}
        >
          enable push notifications.
        </a>
      </div>}

      <img src={logo} className="app-logo" alt="logo" />

      <button
        className="btn-primary"
        onClick={() => toast(<ToastifyNotification />, toastOptions)}
      >
        Show notification
      </button>

      <ToastContainer />
    </div>
  );
}
