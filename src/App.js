import logo from './logo.svg';
import { useEffect, useState } from 'react';
import './App.css';
import { AppContext } from './context';
import { Router, Route, Redirect, Link, useHistory } from 'react-router-dom';
// import Login from './components/LoginPage/Login';
import { News } from './components/Template/News/News';
import Login from './components/LoginPage/Login';
import AuthPage from './components/AuthPage/AuthPage';
import AuthService from './services/auth.service';
import { Template } from './components/Template/Template';
function App() {
  let history = useHistory();
  const [authState, setAuthState] = useState(false);
  const [roleState, setRoleState] = useState('');
  const [load, setload] = useState(false);
  useEffect(() => {
    AuthService.checkAuth()
      .then(function (res) {
        console.log('/login');
        console.log(res.data);
        setAuthState(res.data.authenticated);
        setRoleState(res.data.role);
        setload(true);
        setload(true);
      })
      .catch(function (err) {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    console.log('authstate', authState);
  }, [authState]);

  const logout = () => {
    setload(false);
    AuthService.logout()
      .then(function (res) {
        console.log('/logout');
        setAuthState(false);
        setRoleState('');
        setload(true);
      })
      .catch(function (err) {
        console.log(err);
      });
    setload(true);
  };

  return (
    <div className="App">
      <AppContext.Provider value={{ isAuth: authState, role: roleState }}>
        {/* <Route path="/login" exact>
          <div>It's Login page</div>
          df
          <Login />
        </Route> */}

        {/* {authState ? <Redirect to="/news" /> : <Redirect to="/login" />} */}
        {load &&
          (authState ? (
            <div>
              <Route path="/">
                <Template logout={logout} />
                {/* <News /> */}
                {/* </Template> */}
                {/* <Route path="/news">sdfs</Route> */}
              </Route>

              <Route path="/login" exact>
                <Redirect to="/" />
              </Route>
            </div>
          ) : (
            <div>
              <Redirect to="/login" />
              <Route path="/login" exact>
                <Login />
              </Route>
              {/* <Route to="/news">
                <Redirect to="/login" />
              </Route> */}
            </div>
          ))}
      </AppContext.Provider>
    </div>
  );

  // if (authState) {
  //   return (
  //     <div className="App">
  //       <Link to="/">
  //         <button>/</button>
  //       </Link>
  //       <Link to="/login">
  //         <button>/login</button>
  //       </Link>
  //       <Link to="/news">
  //         <button>/news</button>
  //       </Link>
  //       <button onClick={() => setAuthState(false)}>signout</button>
  //       <AppContext.Provider>
  //         <Route path="/" exact>
  //           {/* <News /> */}
  //           <Redirect to="/news" />
  //         </Route>
  //         <Route path="/news" exact>
  //           <News />
  //         </Route>
  //       </AppContext.Provider>
  //     </div>
  //   );
  // } else {
  //   return (
  //     <div>
  //       Ты не авторизован
  //       <Redirect to="/login" />
  //       <Route path="/login">
  //         <div>It's Login page</div>
  //         <button onClick={() => setAuthState(true)}>signin</button>
  //       </Route>
  //     </div>
  //   );
  // }
}

export default App;
