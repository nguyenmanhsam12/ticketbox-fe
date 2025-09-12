// components/Header.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

// Ant Design Icons
import {
  // DownOutlined,
  // UserOutlined,
  WalletOutlined,
  // LogoutOutlined,
  // CalendarOutlined,
} from '@ant-design/icons';
import { fetchAllCategoryApi } from '@/src/apis/category';
import BottomNav from '../Home/BottomNav';
import Logo from '../Header/Logo';
import SearchBar from '../Header/SearchBar';
import AccountDropdown from '../Header/AccountDropdown';
import LanguageDropdown from '../Header/LanguageDropdown';
import { usePathname } from 'next/navigation';
import Login from '../Header/Login';

export default function Header() {
  // const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
  // const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const pathname = usePathname();
  const [showLogin, setShowLogin] = useState(false);


  const hiddenPaths = ['/search', '/events'];

  const hideBottomNav = hiddenPaths.some((path) => pathname.startsWith(path));
  const hideTopNav = pathname === '/events';

  //biến phục cho việc hiển thị lóp phủ của search
  // const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    async function fetchAllCategory() {
      try {
        const res = await fetchAllCategoryApi();
        setCategories(res?.data);
      } catch (error) {
        console.error('Lỗi khi fetchAllCategory', error);
      }
    }
    fetchAllCategory();
  }, []);

  function closeLogin() {
    setShowLogin(false);
  }

  return (
    <header>
      {!hideTopNav && (
        <div className="bg-primary text-white shadow-md h-[76px]">
          <div className="container mx-auto px-4 py-4 max-w-7xl">
            {/* Desktop Layout (lg+) */}
            <div className="hidden lg:flex items-center justify-between">
              {/* Left: Logo */}
              <Logo size="lg" />

              {/* Center: Search Bar with Button */}
              <SearchBar categories={categories} />

            {/* Right: User and Language Actions */}
            <div className="flex items-center space-x-4">
              <Link href="/organizer/create-event">
                <button className="px-6 py-2 rounded-full border-2 border-white text-white font-medium hover:bg-white hover:text-green-600 transition-colors duration-200 whitespace-nowrap">
                  Tạo sự kiện
                </button>
              </Link>


                <Link
                  href="/my-wallet"
                  className="flex items-center space-x-2 p-2 rounded-md hover:bg-green-700 transition-colors duration-200"
                >
                  <WalletOutlined className="text-xl" />
                  <span className="whitespace-nowrap">Vé của tôi</span>
                </Link>

                <div className="cursor-pointer"
                onClick={() => setShowLogin(true)}
                >Đăng nhập</div>

                {/* Account Dropdown - Fixed hover issue */}
                {/* <AccountDropdown /> */}

                {/* Language Dropdown - Fixed hover issue */}
                <LanguageDropdown />
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Top Header Section */}

      {/* Bottom Navigation Section */}
      {!hideBottomNav && <BottomNav categories={categories} />}


      { showLogin && <Login  onClose={closeLogin} /> }
    </header>
  );
}
