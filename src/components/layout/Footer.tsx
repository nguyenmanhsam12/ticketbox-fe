'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
export default function Footer() {

  const pathname = usePathname();

  if(pathname.includes('/events')){
    return null;
  }
  
  return (
    <footer className="bg-gray-800 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Hotline Section */}
          <div>
            <h3 className="text-base font-semibold mb-4 text-gray-300">Hotline</h3>
            <div className="mb-3">
              <p className="text-sm text-gray-400 mb-1">📞 Thứ 2 - Chủ Nhật (8:00 - 23:00)</p>
              <p className="text-lg font-bold text-green-400">1900.6408</p>
            </div>
            
            <div className="mb-6">
              <h4 className="text-sm font-semibold mb-2 text-gray-300">Email</h4>
              <div className="flex items-center">
                <span className="text-sm text-gray-400">✉️ support@ticketbox.vn</span>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold mb-2 text-gray-300">Văn phòng chính</h4>
              <p className="text-sm text-gray-400 leading-relaxed">
                📍 Tầng 12, Tòa nhà Viettel, 285 Cách Mạng Tháng Tám, Phường 
                12, Quận 10, TP. Hồ Chí Minh
              </p>
            </div>
          </div>

          {/* Customer Info Section */}
          <div>
            <div className="mb-6">
              <h3 className="text-base font-semibold mb-4 text-gray-300">Dành cho Khách hàng</h3>
              <p className="text-sm text-gray-400">Điều khoản sử dụng cho khách hàng</p>
            </div>

            <div>
              <h3 className="text-base font-semibold mb-4 text-gray-300">Dành cho Bạn Tổ chức</h3>
              <p className="text-sm text-gray-400">Điều khoản sử dụng cho bạn tổ chức</p>
            </div>
          </div>

          {/* Company Info Section */}
          <div>
            <h3 className="text-base font-semibold mb-4 text-gray-300">Về công ty chúng tôi</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="#" className="hover:text-white transition-colors">Quy chế hoạt động</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Chính sách bảo mật thông tin</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Cơ chế giải quyết tranh chấp khiếu nại</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Chính sách bảo mật thanh toán</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Chính sách đổi trả và kiểm hàng</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Điều kiện vận chuyển và giao nhận</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Phương thức thanh toán</Link></li>
            </ul>
          </div>

          {/* App Download & Social Section */}
          <div>
            {/* Ticketbox App */}
            <div className="mb-6">
              <h3 className="text-base font-semibold mb-4 text-gray-300">Ứng dụng Ticketbox</h3>
              <div className="space-y-3">
                <Link href="#" className="block">
                  <div className="flex items-center bg-black rounded-lg px-3 py-2 hover:bg-gray-900 transition-colors">
                    <div className="w-8 h-8 mr-3">
                      <svg viewBox="0 0 24 24" className="w-full h-full">
                        <path fill="#34A853" d="M1.04 12L8.73 4.24l8.61 8.04-8.59 7.68L1.04 12z"/>
                        <path fill="#EA4335" d="M8.73 4.24L17.4 12l-8.67 7.76V4.24z"/>
                        <path fill="#FBBC04" d="M1.04 12l7.69-7.76v15.52L1.04 12z"/>
                        <path fill="#4285F4" d="M17.4 12l8.59-7.76-8.59 7.76z"/>
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Tải về từ</p>
                      <p className="text-sm font-semibold">Google Play</p>
                    </div>
                  </div>
                </Link>
                
                <Link href="#" className="block">
                  <div className="flex items-center bg-black rounded-lg px-3 py-2 hover:bg-gray-900 transition-colors">
                    <div className="w-8 h-8 mr-3">
                      <svg viewBox="0 0 24 24" className="w-full h-full" fill="white">
                        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Tải về từ</p>
                      <p className="text-sm font-semibold">App Store</p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>

            {/* Check-in App */}
            <div className="mb-6">
              <h3 className="text-base font-semibold mb-4 text-gray-300">Ứng dụng check-in cho Bạn tổ chức</h3>
              <div className="space-y-3">
                <Link href="#" className="block">
                  <div className="flex items-center bg-black rounded-lg px-3 py-2 hover:bg-gray-900 transition-colors">
                    <div className="w-8 h-8 mr-3">
                      <svg viewBox="0 0 24 24" className="w-full h-full">
                        <path fill="#34A853" d="M1.04 12L8.73 4.24l8.61 8.04-8.59 7.68L1.04 12z"/>
                        <path fill="#EA4335" d="M8.73 4.24L17.4 12l-8.67 7.76V4.24z"/>
                        <path fill="#FBBC04" d="M1.04 12l7.69-7.76v15.52L1.04 12z"/>
                        <path fill="#4285F4" d="M17.4 12l8.59-7.76-8.59 7.76z"/>
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Tải về từ</p>
                      <p className="text-sm font-semibold">Google Play</p>
                    </div>
                  </div>
                </Link>
                
                <Link href="#" className="block">
                  <div className="flex items-center bg-black rounded-lg px-3 py-2 hover:bg-gray-900 transition-colors">
                    <div className="w-8 h-8 mr-3">
                      <svg viewBox="0 0 24 24" className="w-full h-full" fill="white">
                        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Tải về từ</p>
                      <p className="text-sm font-semibold">App Store</p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>

            {/* Social Media & Language */}
            <div>
              <h3 className="text-base font-semibold mb-4 text-gray-300">Follow us</h3>
              <div className="flex space-x-3 mb-4">
                <Link href="#" className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                  <span className="text-white text-sm font-bold">f</span>
                </Link>
                <Link href="#" className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-500 rounded-full flex items-center justify-center hover:from-purple-700 hover:to-pink-600 transition-colors">
                  <span className="text-white text-sm">📷</span>
                </Link>
                <Link href="#" className="w-8 h-8 bg-black rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors">
                  <span className="text-white text-sm">🎵</span>
                </Link>
                <Link href="#" className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors">
                  <span className="text-white text-sm">📞</span>
                </Link>
                <Link href="#" className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                  <span className="text-white text-sm">in</span>
                </Link>
              </div>

              <div>
                <h4 className="text-sm font-semibold mb-2 text-gray-300">Ngôn ngữ</h4>
                <div className="flex space-x-2">
                  <button className="w-8 h-6 bg-red-500 rounded flex items-center justify-center">
                    <span className="text-white text-xs">🇻🇳</span>
                  </button>
                  <button className="w-8 h-6 bg-gray-600 rounded flex items-center justify-center hover:bg-gray-500 transition-colors">
                    <span className="text-white text-xs">🇬🇧</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="bg-gray-900 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
            {/* Company Info */}
            <div className="flex-1">
              <div className="flex items-center mb-2">
                <div className="text-white text-xl font-bold mr-2">ticketbox</div>
                <div className="text-xs text-green-400 bg-green-400/20 px-2 py-1 rounded">BE HAPPY</div>
              </div>
              <p className="text-sm text-gray-400 mb-2">
                Nền tảng quản lý và phân phối vé sự kiện hàng đầu Việt Nam
              </p>
              <p className="text-xs text-gray-500">© 2017</p>
            </div>

            {/* Legal Info */}
            <div className="flex-1 lg:mx-8">
              <h4 className="text-sm font-semibold text-gray-300 mb-2">Công ty TNHH Ticketbox</h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                Đại diện theo pháp luật: Phạm Thị Hường<br/>
                Giấy chứng nhận đăng ký doanh nghiệp số: 0313605444, cấp lần đầu ngày 07/01/2016 bởi Sở Kế Hoạch và Đầu Tư TP. Hồ Chí Minh
              </p>
            </div>

            {/* Certification */}
            <div className="flex items-center">
              <div className="bg-red-600 text-white px-3 py-2 rounded-lg text-center">
                <div className="text-xs font-bold">ĐÃ ĐĂNG KÝ</div>
                <div className="text-xs">BỘ CÔNG THƯƠNG</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}