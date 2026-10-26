import { BrowserRouter as Router, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import io from 'socket.io-client'

import PageRender from "./customRouter/PageRender";
import PrivateRouter from "./customRouter/PrivateRouter";
import Login from "./pages/login";
import Register from "./pages/register";
import Home from "./pages/home";
import Alert from "./components/alert/Alert";
import Header from "./components/header/Header";
import StatusModal from "./components/StatusModal";
import { refreshToken } from "./redux/actions/authAction";
import { getPosts } from "./redux/actions/postAction";
import { getSuggestions } from "./redux/actions/suggestionsAction";
import { getNotifies } from "./redux/actions/notifyAction";

import AdminDashboard from "./pages/adminDashboard";
import { GLOBALTYPES } from "./redux/actions/globalTypes";
import SocketClient from "./SocketClient";

function App() {
  const { auth, status, modal, userType, theme } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshToken());

    const socket = io(process.env.REACT_APP_API_URL || window.location.origin);
    dispatch({type: GLOBALTYPES.SOCKET, payload: socket })
    return () => socket.close()
  }, [dispatch]);

  // Apply real dark / light theme class to body
  useEffect(() => {
    if (theme) {
      document.body.classList.add("theme-dark");
      document.body.classList.remove("theme-light");
    } else {
      document.body.classList.add("theme-light");
      document.body.classList.remove("theme-dark");
    }
  }, [theme]);

  useEffect(() => {
    if (auth.token) {
      dispatch(getPosts(auth.token));
      dispatch(getSuggestions(auth.token));
      dispatch(getNotifies(auth.token));
    }
  }, [dispatch, auth.token]);

  useEffect(() => {
    if (!("Notification" in window)) {
      // Notification API not supported
    } else if (Notification.permission === "default") {
      Notification.requestPermission();
    }
  }, []);

  return (
    <Router>
      <Alert />
      <div className={`App ${theme ? "theme-dark" : "theme-light"} ${(status || modal) && "mode"}`}>
        <div className="main">
          {userType === "user" && auth.token && <Header />}
          {status && <StatusModal />}
          {auth.token && <SocketClient /> }
          <Route
            exact
            path="/"
            component={
              userType === "user"
                ? auth.token
                  ? Home
                  : Login
                : auth.token
                ? AdminDashboard
                : Login
            }
          />

          {userType === "user" && (
            <>
              <Route exact path="/register" component={Register} />
              <div className="wrap_page">
                <PrivateRouter exact path="/:page" component={PageRender} />
                <PrivateRouter exact path="/:page/:id" component={PageRender} />
              </div>
            </>
          )}
        </div>
      </div>
    </Router>
  );
}

export default App;
