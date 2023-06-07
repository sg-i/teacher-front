import logo from './logo.svg';
import { useEffect, useState } from 'react';
import './App.css';
import { AppContext } from './context';
import { Router, Route, Redirect, Link } from 'react-router-dom';
// import Login from './components/LoginPage/Login';
import { News } from './components/News/News';
import Login from './components/LoginPage/Login';
import AuthPage from './components/AuthPage/AuthPage';
import AuthService from './services/auth.service';
function App() {
  const [authState, setAuthState] = useState(false);
  const [load, setload] = useState(false);
  useEffect(() => {
    console.log('ща будт');
    AuthService.checkAuth()
      .then(function (res) {
        console.log('/login');
        console.log(res.data);
        setAuthState(res.data.authenticated);
      })
      .catch(function (err) {
        console.log(err);
      });
  }, []);

  return (
    <div className="App">
      <Link to="/">
        <button>/</button>
      </Link>
      <Link to="/login">
        <button>/login</button>
      </Link>
      <Link to="/news">
        <button>/news</button>
      </Link>
      {load &&
        (authState ? (
          <div>
            <button onClick={() => setAuthState(false)}>signout</button>
            <AppContext.Provider>
              <Route path="/" exact>
                {/* <News /> */}
                <Redirect to="/news" />
              </Route>
              <Route path="/news" exact>
                <News />
              </Route>
            </AppContext.Provider>
          </div>
        ) : (
          <div>
            Ты не авторизован
            <Redirect to="/login" />
            <Route path="/login">
              <div>It's Login page</div>
              <Login />
              <button onClick={() => setAuthState(true)}>signin</button>
            </Route>
          </div>
        ))}
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
