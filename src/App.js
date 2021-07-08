import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store";
import "react-toastify/dist/ReactToastify.css";
import { PersistGate } from "redux-persist/integration/react";
import Register from "./Components/register";
import Login from "./Components/login";
import { useSelector } from "react-redux";
import Navbar from "./Components/navbar";
import Dashboard from "./Components/dashboard";
import PostJob from "./Components/postJob";
import { TokenProvider } from "./Context/tokenContext";
import GetResetToken from "./Components/getResetToken";
import ResetPassword from "./Components/resetPassword";
function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <TokenProvider>
          <MyApp />
        </TokenProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;

const MyApp = () => {
  const user = useSelector((state) => state.user);
  return (
    <BrowserRouter>
      {user?.name && <Navbar />}
      <Switch>
        <Route path="/" exact>
          <Register />
        </Route>
        <Route path="/login" exact>
          <Login />
        </Route>
        <Route path="/dashboard" exact>
          <Dashboard />
        </Route>
        <Route path="/postjob" exact>
          <PostJob />
        </Route>
        <Route path="/gettoken" exact>
          <GetResetToken />
        </Route>
        <Route path="/resetpassword" exact>
          <ResetPassword />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};
