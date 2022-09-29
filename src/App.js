import { useState, useEffect } from 'react';
import { ToastContainer, toast } from "react-toastify";

import logo from './firebase-logo.png';
import { getFirebaseToken, onMessageListener } from './firebase';

const toastOptions = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
};

export default function App() {
  const [showNotificationBanner, setShowNotificationBanner] = useState(Notification.permission === 'default');
  const [notification, setNotification] = useState({ title: '', body: '' });

  useEffect(() => {
    onMessageListener().then((payload) => {
      console.log('Received foreground message: ', payload);
      setNotification({ title: payload.notification.title, body: payload.notification.body });
      toast(<ToastifyNotification />, toastOptions);
    }).catch(err => console.log('failed: ', err));
  }, []);

  const handleGetFirebaseToken = () => {
    getFirebaseToken()
      .then(firebaseToken => {
        console.log('Firebase token: ', firebaseToken);
        if (firebaseToken) {
          setShowNotificationBanner(false);
        }
      })
      .catch((err) => console.error('An error occured while retrieving firebase token. ', err))
  }

  console.log('notification', notification);
  const ToastifyNotification = () => (
    <div className="push-notification">
      <h2 className="push-notification-title">{notification.title}</h2>
      <p className="push-notification-text">{notification.body}</p>
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
        Show toast notification
      </button>

      <ToastContainer />
    </div>
  );
}
