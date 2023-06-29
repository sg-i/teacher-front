import { useEffect, useRef, useState } from 'react';
import './App.css';
import { AppContext } from './context';
import { Route, Redirect, useHistory } from 'react-router-dom';

import Login from './components/LoginPage/Login';
import AuthService from './services/auth.service';
import { Template } from './components/Template/Template';
function App() {
  let history = useHistory();
  const [authState, setAuthState] = useState(false);
  const [roleState, setRoleState] = useState('');
  const [load, setload] = useState(false);
  useEffect(() => {
    if (vkWidgetRef.current) {
      vkWidgetRef.current.style.bottom = '80px';
    }
    AuthService.checkAuth()
      .then(function (res) {
        setAuthState(res.data.authenticated);
        setRoleState(res.data.role);
        setload(true);
        setload(true);
      })
      .catch(function (err) {
        console.log(err);
      });
  }, []);
 

  const logout = () => {
    setload(false);
    AuthService.logout()
      .then(function (res) {
        setAuthState(false);
        setRoleState('');
        setload(true);
      })
      .catch(function (err) {
        console.log(err);
      });
    setload(true);
  };
  const vkWidgetRef = useRef(null);
  return (
    <div className="App">
      <AppContext.Provider value={{ isAuth: authState, role: roleState }}>
        {load &&
          (authState ? (
            <div style={{ transform: 'translateY(40px)' }}>
              <Route path="/">
                <div className="asd" style={{}}>
                  <div id="vk_community_messages"></div>
                </div>
                <Template logout={logout} />
              </Route>

              <Route path="/login" exact>
                <Redirect to="/" />
              </Route>
            </div>
          ) : (
            <div style={{ transform: 'translateY(51px)' }}>
              <Redirect to="/login" />
              <Route path="/login" exact>
                <Login />
              </Route>
            </div>
          ))}
      </AppContext.Provider>
    </div>
  );
}

export default App;
