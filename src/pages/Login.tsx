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
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Login with Mobile Number</h2>

      {!otpSent ? (
        <>
          <input
            type="text"
            placeholder="Enter mobile number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            className="w-full mb-3 border rounded px-3 py-2"
          />
          <button
            onClick={handleSendOtp}
            className="w-full bg-indigo-600 text-white py-2 rounded cursor-pointer hover:bg-indigo-700 disabled:opacity-60"
            disabled={mobile.trim() === "" || auth.loading}
          >
            {auth.loading ? "Sending..." : "Send OTP"}
          </button>
        </>
      ) : (
        <>
          {mobile && (
            <p className="mb-3">
              OTP sent to <span className="font-semibold">{mobile}</span>
            </p>
          )}
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full mb-3 border rounded px-3 py-2"
          />
          <button
            onClick={handleValidateOtp}
            className="w-full bg-green-600 text-white py-2 rounded cursor-pointer hover:bg-green-700 disabled:opacity-60"
            disabled={otp.trim() === "" || auth.loading}
          >
            {auth.loading ? "Verifying..." : "Validate OTP"}
          </button>
        </>
      )}

      {auth.error && <p className="mt-3 text-red-600 text-sm">{auth.error}</p>}
    </div>
  );
}
