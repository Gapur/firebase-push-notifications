import { ToastContainer, toast } from "react-toastify";

import logo from './firebase-logo.png';

const toastOptions = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
};

export default function App() {
  const ToastifyNotification = () => (
    <div className="push-notification">
      <h2 className="push-notification-title">New Message</h2>
      <p className="push-notification-text">You received a test push notification</p>
    </div>
  );

  return (
    <div className="app">
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
