import React, { useEffect } from "react";
import GoogleLogin from "react-google-login";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/actions/userActions";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading/Loading";

const Login = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.userInfo);
  const { loading } = useSelector((state) => state.user);

  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo && userInfo.userId) {
      navigate("/");
    }
  }, [userInfo]);

  const responseGoogle = (data) => {
    const token = data.profileObj;
    if (token) {
      dispatch(
        login({
          email: token.email,
          username: token.name,
          img: token.imageUrl,
          password: token.googleId,
        })
      );
    }
  };

  return (
    <div className="my-24 px-3">
      {loading ? (
        <Loading />
      ) : (
        <div className="border p-3 m-auto md:w-2/6">
          <h2 className="text-xl font-bold text-center ">Sign in </h2>

          {/* google login */}
          <GoogleLogin
 clientId="766167193093-g55msghcpsdp7r4rrlmbsfp8cgt2922s.apps.googleusercontent.com"
            render={(renderProps) => (
              <button
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                className="mt-8  text-gray-600 flex justify-start border border-bg-slate-900 w-full py-2 items-center"
              >
                <span className="mx-3">
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 52 51"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      width="50.3924"
                      height="50.3924"
                      transform="translate(0.828979 0.255676)"
                      fill="white"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M49.2058 26.0002C49.2058 24.288 49.0521 22.6417 48.7668 21.0612H26.0253V30.4015H39.0204C38.4606 33.4198 36.7594 35.9771 34.2021 37.6893V43.7478H42.0058C46.5716 39.5442 49.2058 33.3539 49.2058 26.0002Z"
                      fill="#4285F4"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M26.025 49.5975C32.5445 49.5975 38.0103 47.4353 42.0055 43.7475L34.2018 37.6889C32.0396 39.1377 29.2738 39.9938 26.025 39.9938C19.7359 39.9938 14.4128 35.7463 12.514 30.0389H4.4469V36.295C8.42007 44.1865 16.5859 49.5975 26.025 49.5975Z"
                      fill="#34A853"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12.5143 30.0396C12.0314 28.5908 11.757 27.0433 11.757 25.4518C11.757 23.8603 12.0314 22.3128 12.5143 20.864V14.6079H4.4472C2.81183 17.8676 1.87891 21.5554 1.87891 25.4518C1.87891 29.3481 2.81183 33.0359 4.4472 36.2957L12.5143 30.0396Z"
                      fill="#FBBC05"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M26.025 10.9088C29.5701 10.9088 32.753 12.1271 35.2555 14.5198L42.1811 7.59421C37.9994 3.69786 32.5335 1.30518 26.025 1.30518C16.5859 1.30518 8.42007 6.71616 4.4469 14.6076L12.514 20.8637C14.4128 15.1564 19.7359 10.9088 26.025 10.9088Z"
                      fill="#EA4335"
                    />
                  </svg>
                </span>{" "}
                Continue with Google
              </button>
            )}
            buttonText="Login"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={"single_host_origin"}
          />
          {/* facebook login */}
          <button
            style={{ background: "#1877F2" }}
            className="mt-4 text-white flex justify-start border border-bg-slate-900 w-full rounded py-2 items-center"
          >
            <span className="px-2">
              <svg
                width="32"
                height="32"
                viewBox="0 0 52 52"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  width="50.3924"
                  height="50.3924"
                  transform="translate(0.828979 0.879059)"
                  fill="#1877F2"
                />
                <path
                  d="M50.1715 26.2222C50.1715 12.8865 39.3608 2.07583 26.0252 2.07583C12.6895 2.07583 1.87878 12.8865 1.87878 26.2222C1.87878 38.2743 10.7088 48.2638 22.2523 50.0752V33.202H16.1214V26.2222H22.2523V20.9025C22.2523 14.8508 25.8572 11.508 31.3727 11.508C34.0145 11.508 36.7778 11.9796 36.7778 11.9796V17.9219H33.733C30.7335 17.9219 29.798 19.7832 29.798 21.6927V26.2222H36.4949L35.4243 33.202H29.798V50.0752C41.3415 48.2638 50.1715 38.2743 50.1715 26.2222Z"
                  fill="white"
                />
              </svg>
            </span>
            <span>Continue with facebook</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default Login;
