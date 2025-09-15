import { useState } from "react";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import { registerUser } from "@/src/apis/auth";
import { toast } from "react-toastify";

export default function Register({
  onClose,
  onOpen,
}: {
  onClose: () => void;
  onOpen: () => void;
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const passwordValidation = {
    length: password.length >= 8 && password.length <= 32,
    hasUpperLower: /(?=.*[a-z])(?=.*[0-9])/.test(password),
    hasSpecial: /[!$@%]/.test(password),
    hasCapital: /[A-Z]/.test(password),
  };

  const isPasswordValid = Object.values(passwordValidation).every(Boolean);
  const isFormValid = email && isPasswordValid && password === confirmPassword;

  const handleSubmit = async () => {
    if (isFormValid) {
      // Handle registration logic
      try {
        const res = await registerUser({ email, password});
        if(res.success) {
            toast.success('Đăng Ký thành công!');
            onClose();
            setEmail('');
            setPassword('');
            onOpen();
        }
      } catch (error) {
        console.log('register error' , error);
        toast.error(error?.response?.data?.message || 'Đăng Ký không thành công!' );
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-full w-full bg-[rgba(42,45,52,0.8)] fixed left-0 top-0 z-[999] max-h-screen">
      <div className="relative mx-8 rounded-xl bg-white h-auto w-full max-w-[400px]">
        {/* Close button */}
        <div
          className="absolute top-3 right-3 cursor-pointer z-10"
          onClick={onClose}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            className="text-white"
          >
            <path
              d="M18 6L6 18M6 6l12 12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <div className="flex m-0 p-0 flex-col gap-0 items-stretch">
          {/* Header section */}
          <div className="bg-[#2dc275] h-[112px] relative w-full rounded-t-xl flex items-end">
            <div className="flex items-center gap-4 pb-5 pl-6 w-full">
              <span className="font-bold text-[28px] text-white leading-8">
                Đăng ký tài khoản
              </span>
              <div className="w-12 h-12 bg-orange-400 rounded-full flex items-center justify-center ml-auto mr-12">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <div className="w-6 h-6 bg-orange-400 rounded-full relative">
                    <div className="absolute top-1 left-1 w-1 h-1 bg-black rounded-full"></div>
                    <div className="absolute top-1 right-1 w-1 h-1 bg-black rounded-full"></div>
                    <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-1 bg-black rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form section */}
          <div className="flex flex-col gap-4 pt-6 px-6 pb-6 bg-white rounded-b-xl">
            {/* Google login option */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 flex items-center gap-3">
              <div className="w-8 h-8 bg-[#4285f4] rounded-full flex items-center justify-center text-white font-bold text-sm">
                S
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-800">
                  Đăng nhập với tên Sam
                </div>
                <div className="text-xs text-gray-500">
                  nguyenthiennam04@gmail.com
                </div>
              </div>
              <svg
                className="w-5 h-5 text-[#4285f4]"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
            </div>

            <div className="text-center text-sm text-gray-500">Hoặc</div>

            <div className="flex flex-col gap-4">
              {/* Email input */}
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#2dc275] bg-gray-50"
                  placeholder="Nhập email của bạn"
                />
              </div>

              {/* Password input */}
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#2dc275] bg-gray-50"
                  placeholder="Nhập mật khẩu"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                </button>
              </div>

              {/* Confirm Password input */}
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#2dc275] bg-gray-50"
                  placeholder="Nhập lại mật khẩu"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                >
                  {showConfirmPassword ? (
                    <EyeInvisibleOutlined />
                  ) : (
                    <EyeOutlined />
                  )}
                </button>
              </div>

              {/* Password validation box */}
              {password && (
                <div
                  className={`rounded-lg p-3 ${
                    isPasswordValid
                      ? "bg-green-50 border border-green-200"
                      : "bg-red-50 border border-red-200"
                  }`}
                >
                  <div
                    className={`font-medium text-sm mb-2 ${
                      isPasswordValid ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {isPasswordValid
                      ? "✅ Mật khẩu hợp lệ"
                      : "❌ Mật khẩu chưa hợp lệ"}
                  </div>
                  <div className="space-y-1 text-sm">
                    <div
                      className={`flex items-center gap-2 ${
                        passwordValidation.length
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      <span className="w-1 h-1 rounded-full bg-current"></span>
                      Từ 8 - 32 ký tự
                    </div>
                    <div
                      className={`flex items-center gap-2 ${
                        passwordValidation.hasUpperLower
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      <span className="w-1 h-1 rounded-full bg-current"></span>
                      Bao gồm chữ thường và số
                    </div>
                    <div
                      className={`flex items-center gap-2 ${
                        passwordValidation.hasSpecial
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      <span className="w-1 h-1 rounded-full bg-current"></span>
                      Bao gồm ký tự đặc biệt (!,$,@,%,...)
                    </div>
                    <div
                      className={`flex items-center gap-2 ${
                        passwordValidation.hasCapital
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      <span className="w-1 h-1 rounded-full bg-current"></span>
                      Có ít nhất 1 ký tự in hoa
                    </div>
                  </div>
                </div>
              )}

              <div className="text-center">
                <span className="text-gray-500 text-sm">Đã có tài khoản? </span>
                <button
                  type="button"
                  className="text-[#2dc275] text-sm font-medium hover:underline"
                  onClick={ () => {
                    onClose();
                    onOpen();
                  }}
                >
                  Đăng nhập ngay
                </button>
              </div>

              {/* Submit button */}
              <button
                type="button"
                onClick={handleSubmit}
                className={`w-full py-2 font-semibold rounded-lg transition-colors ${
                  isFormValid
                    ? "bg-[#2dc275] text-white hover:bg-[#25a863]"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
                disabled={!isFormValid}
              >
                Tiếp tục
              </button>
            </div>

            {/* Footer text */}
            <div className="text-xs text-gray-500 leading-relaxed mt-2">
              Bằng việc tiếp tục, bạn đã đọc và đồng ý với{" "}
              <span className="text-[#2dc275] cursor-pointer hover:underline">
                Điều khoản sử dụng
              </span>{" "}
              và{" "}
              <span className="text-[#2dc275] cursor-pointer hover:underline">
                Chính sách bảo mật thông tin cá nhân
              </span>{" "}
              của Ticketbox
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
