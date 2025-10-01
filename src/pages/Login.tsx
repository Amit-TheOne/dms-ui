import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { generateOtp, validateOtp } from "../redux/features/authSlice";
import { useNavigate } from "react-router-dom";


export default function Login() {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const handleSendOtp = async () => {
    const result = await dispatch(generateOtp(mobile));
    if (generateOtp.fulfilled.match(result)) setOtpSent(true);
  };

  const handleValidateOtp = async () => {
    const result = await dispatch(validateOtp({ mobile_number: mobile, otp }));
    if (validateOtp.fulfilled.match(result)) navigate("/upload");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-200 via-blue-100 to-indigo-400 px-2 py-8 overflow-hidden">
      <div className="w-full max-w-lg mx-auto bg-white/90 rounded-2xl shadow-xl p-8 sm:p-8 -mt-40">
        <h2 className="text-3xl text-center font-extrabold mb-5 text-indigo-800 drop-shadow-lg">
          Login with Mobile Number
        </h2>
        <h3 className="text-center text-base font-medium text-indigo-900 mb-6 tracking-wide">
          Secure OTP authentication with number
        </h3>

        {!otpSent ? (
          <>
            <input
              type="text"
              placeholder="Enter mobile number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className="w-full mb-4 border-2 border-indigo-200 px-3 py-2 rounded-lg bg-indigo-50 text-indigo-800 font-semibold focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
            />
            <button
              onClick={handleSendOtp}
              className="w-full bg-gradient-to-r from-indigo-600 to-blue-500 text-white font-bold rounded-full shadow-lg hover:from-indigo-700 hover:to-blue-600 transition text-lg tracking-wide py-2 mt-2 disabled:opacity-60"
              disabled={mobile.trim() === "" || auth.loading}
            >
              {auth.loading ? "Sending..." : "Send OTP"}
            </button>
          </>
        ) : (
          <>
            {mobile && (
              <p className="mb-3 text-center text-blue-700 font-semibold">
                OTP sent to <span className="font-bold">{mobile}</span>
              </p>
            )}
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full mb-4 border-2 border-green-200 px-3 py-2 rounded-lg bg-green-50 text-green-800 font-semibold focus:ring-2 focus:ring-green-400 focus:outline-none transition"
            />
            <button
              onClick={handleValidateOtp}
              className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white font-bold rounded-full shadow-lg hover:from-green-600 hover:to-green-700 transition text-lg tracking-wide py-2 mt-2 disabled:opacity-60"
              disabled={otp.trim() === "" || auth.loading}
            >
              {auth.loading ? "Verifying..." : "Validate OTP"}
            </button>
          </>
        )}

        {auth.error && <p className="mt-4 text-red-600 text-center text-sm font-semibold">{auth.error}</p>}
      </div>
    </div>
  );
}
