import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';
// import WhiteButton from '../../WhiteButton/index';
import './AuthPage.scss';
const API_URL = 'http://localhost:8080/api';
let test2 = '';
function AuthPage() {
  const [authStated, setAuthStated] = React.useState(false);
  const [load, setload] = React.useState(true);
  function createMarkup(html) {
    return { __html: html };
  }
  React.useEffect(() => {
    // axios
    //   .get('/checkAuth')
    //   .then(function (res) {
    //     console.log('/login');
    //     console.log(res.data);
    //     setAuthStated(res.data.authenticated);
    //     setload(true);
    //   })
    //   .catch(function (err) {
    //     console.log(err);
    //   });
  }, []);

  return (
    <div>
      {load &&
        (authStated ? (
          <div>
            <Redirect to="control" />
            redirect
          </div>
        ) : (
          <div>
            <div className="d-flex">
              <div className="controlAuthWrap">
                <div className="controlTitle">
                  <svg
                    style={{ marginTop: 3 }}
                    className="logoDiamonHeader"
                    width="43"
                    height="42"
                    viewBox="0 0 43 42"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0)">
                      <path
                        d="M42.8679 13.1793C35.4246 3.85734 35.742 4.09088 35.3446 4.05282L23.6931 2.51991C20.756 2.13346 18.7609 2.63574 17.7422 2.72573C17.4003 2.77068 17.1605 3.07788 17.2065 3.41183C17.2525 3.74578 17.5674 3.98047 17.9089 3.93511C18.9421 3.84258 20.795 3.37016 23.5263 3.72929L31.5274 4.78191C30.9286 4.9011 22.0991 6.65854 21.4998 6.77781L11.4725 4.78191L14.9385 4.3259C15.2804 4.28095 15.5202 3.97374 15.4742 3.6398C15.4282 3.30577 15.113 3.07149 14.7718 3.11652L7.65582 4.05266C7.65481 4.05274 7.6538 4.0529 7.65279 4.05307L7.64339 4.0543C7.63381 4.05561 7.62449 4.05766 7.615 4.05938C7.60887 4.06053 7.60257 4.06135 7.59653 4.06267C7.5914 4.06373 7.58628 4.0648 7.58124 4.06595C7.5741 4.06767 7.56705 4.06972 7.55999 4.07161C7.54907 4.07456 7.53816 4.07743 7.52741 4.08096C7.52295 4.08244 7.51876 4.08424 7.5143 4.0858C7.51237 4.08646 7.51044 4.08719 7.50859 4.08793C7.50238 4.09023 7.49591 4.09236 7.48978 4.09474C7.47853 4.09925 7.46761 4.10426 7.45669 4.10942C7.4519 4.11164 7.4472 4.11369 7.4425 4.11599C7.43721 4.11861 7.43208 4.12115 7.42696 4.12386C7.42201 4.12649 7.4173 4.12944 7.41235 4.13231C7.14108 4.28669 7.27352 4.2976 0.132107 13.1793C-0.0163767 13.3653 -0.0419078 13.6182 0.0667675 13.8289C0.318216 14.3162 -0.350549 13.3544 13.4353 31.2279C13.6431 31.4969 14.0348 31.5504 14.3103 31.3475C14.5857 31.1445 14.6404 30.7619 14.4327 30.4929L2.32401 14.8171L12.1083 17.8273C12.343 18.4318 19.5097 36.8951 19.6427 37.2376L16.1949 32.7742C15.9871 32.5052 15.5955 32.4517 15.3199 32.6546C15.0445 32.8576 14.9898 33.2402 15.1975 33.5092C18.8077 38.182 19.1797 38.6662 19.2054 38.6945C19.6615 39.1966 20.2923 39.5141 20.8957 39.6136C20.9849 39.6284 22.0316 39.6281 22.1191 39.6114C22.8799 39.4671 23.5224 39.0474 23.8258 38.6572L36.0198 22.8709C36.2274 22.6018 36.1727 22.2192 35.8973 22.0163C35.6217 21.8135 35.2302 21.867 35.0224 22.1359L23.357 37.238C23.7296 36.2779 30.6176 18.5328 30.8915 17.8274L40.6759 14.8172L36.7784 19.8627C36.5707 20.1318 36.6254 20.5144 36.9008 20.7173C37.1764 20.9203 37.568 20.8668 37.7758 20.5977C43.0081 13.8175 42.7262 14.2285 42.9327 13.8299C43.0419 13.619 43.0166 13.3656 42.8679 13.1793ZM21.4999 8.32614L29.0366 16.7241H13.9634L21.4999 8.32614ZM1.60661 13.317L7.53295 5.89392L11.5508 16.3766L1.60661 13.317ZM8.7073 5.47688C9.94422 5.72305 18.8134 7.48852 20.321 7.78859L12.8038 16.1649L8.7073 5.47688ZM21.569 38.4024H21.431L13.4899 17.9443H29.5101L21.569 38.4024ZM30.196 16.1648L22.6788 7.78859C23.6788 7.5895 32.7549 5.78302 34.2925 5.47688L30.196 16.1648ZM31.449 16.3764L35.4669 5.89376L41.3933 13.3169L31.449 16.3764Z"
                        fill="black"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0">
                        <rect width="43" height="42" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  <div className="mr-5 ml-10">SET</div>
                  <div className="mr-5">|</div>
                  <div>CONTROL</div>
                </div>
                <form method="POST" action={`/api/login`}>
                  <div className="inputDiv">
                    <input
                      autocomplete="off"
                      name="username"
                      className="inputControlAuth"
                      placeholder="login"
                      type="text"
                    />
                  </div>
                  <div className="inputDiv">
                    <input
                      autocomplete="off"
                      type="password"
                      name="password"
                      className="inputControlAuth"
                      placeholder="password"
                      type="password"
                    />
                  </div>
                  <div>
                    <input className="buttonAuthLogin" type="submit" value="Войти" />
                  </div>
                </form>{' '}
              </div>
            </div>
          </div>
        ))}
    </div>
  );

  // if (authState) {
  //   console.log('trueeee');
  //   return <Redirect to="control" />;
  // } else {
  //   console.log('faalllss');
  //   return (
  //     <div>Hi</div>
  // <div>
  //   <div dangerouslySetInnerHTML={{ __html: '<b>hfdi</b>' }} />
  // </div>

  // );
  // }
}
export default AuthPage;
