'use client';
import { TagStatus, ticketTitle } from '@/src/ui/myTicket';
import {
  BorderOuterOutlined,
  ClockCircleOutlined,
  EnvironmentOutlined,
  RedEnvelopeOutlined,
  RightOutlined,
  UserOutlined,
  WalletOutlined,
} from '@ant-design/icons';
import { Divider } from 'antd';

import { useEffect, useState } from 'react';

export default function MyticketsPage() {
  const [activeTab, setActiveTab] = useState('all');

  const tabs = [
    { id: 'all', label: 'Tất cả' },
    { id: 'success', label: 'Thành công' },
    { id: 'processing', label: 'Đang xử lý' },
    { id: 'canceled', label: 'Đã hủy' },
  ];

  const [activeDiv, setActiveDiv] = useState<'upcoming' | 'ended'>('upcoming');

  useEffect(() => {
    const prevBackground = document.body.style.backgroundColor;

    document.body.style.backgroundColor = 'rgb(39,39,42)';

    return () => {
      document.body.style.backgroundColor = prevBackground;
    };
  }, []);

  return (
    <>
      <main className="ml-0 bg-[rgb(39,39,42)]">
        <div
          className="xl:max-w-[1280px] xl:pl-4 sm:max-w-[100vw] sm:px-2 md:px-3 box-border
                relative mx-auto"
        >
          <div className="hidden md:flex md:flex-row md:items-center md:justify-start mt-8 mb-8 md:gap-2">
            <span className="cursor-pointer text-[rgb(166,166,176)] font-normal text-xs leading-[21px]">
              Trang chủ
            </span>
            <RightOutlined className="w-3 h-2 text-[rgb(235,235,240)]" />
            <span className="text-[rgb(235,235,240)] font-normal text-xs leading-[21px]">
              Vé của tôi
            </span>
          </div>
          <div className="flex">
            {/* nav */}
            <nav className="hidden w-[270px] md:block">
              <div className="flex gap-[18px] items-center justify-center">
                <img
                  src="https://static.ticketbox.vn/avatar.png"
                  alt="image"
                  className="border-none rounded-[50%]
                                w-[34px] h-[34px] object-cover"
                />
                <div className="flex flex-col gap-[5px] text-white">
                  <span className={ticketTitle()}>Tài khoản của</span>
                  <span className={ticketTitle()}>Nguyễn Mạnh Sâm</span>
                </div>
              </div>
              <ul className="m-0 py-4 list-none">
                <div>
                  <li className="w-full flex items-start pl-4 font-normal text-sm leading-5">
                    <div className="cursor-pointer flex items-center py-2 px-4 text-white">
                      <UserOutlined className="fill-none w-6 h-6 mr-1" />
                      <span className={ticketTitle()}>Cài đặt tài khoản</span>
                    </div>
                  </li>
                  <ul className="list-none pl-8">
                    <li className="w-full flex items-start pl-4 font-normal text-sm leading-5">
                      <div className="cursor-pointer py-2 px-4 text-white">
                        <span className={ticketTitle()}>
                          Thông tin tài khoản
                        </span>
                      </div>
                    </li>
                  </ul>
                </div>
                <div>
                  <li className="w-full flex pl-4 text-sm leading-5 text-primary">
                    <div className="cursor-pointer flex items-center py-2 px-4">
                      <WalletOutlined className="w-6 h-6 fill-none mr-1" />
                      <span className={ticketTitle()}>Vé của tôi</span>
                    </div>
                  </li>
                </div>
                <div>
                  <li className="w-full flex pl-4 text-sm leading-5 text-white">
                    <div className="cursor-pointer flex items-center py-2 px-4">
                      <RedEnvelopeOutlined className="w-6 h-6 fill-none" />
                      <span className={ticketTitle()}>Sự kiện của tôi</span>
                    </div>
                  </li>
                </div>
              </ul>
            </nav>

            {/* right col */}
            <div className="md:bg-transparent m-auto w-[calc(100%-276px)] lg:pb-8 min-h-[50vh]">
              <div className="text-left text-2xl font-bold leading-6 pb-[1rem] bg-transparent text-white">
                Vé của tôi
              </div>
              <Divider style={{ borderColor: '#ffffff80' }}></Divider>
              <div className="relative pt-0 overflow-auto">
                <div className="flex gap-4 w-full justify-center md:mt-4">
                  {tabs.map((tab) => (
                    <div
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={TagStatus({ active: activeTab === tab.id })}
                    >
                      {tab.label}
                    </div>
                  ))}
                </div>

                <div className="flex gap-4 w-full justify-center md:mt-4">
                  <div
                    onClick={() => setActiveDiv('upcoming')}
                    className={`relative flex items-center justify-center p-3 font-bold text-sm leading-5 mb-[1rem] cursor-pointer 
                    ${
                      activeDiv === 'upcoming'
                        ? "text-white after:content-[''] after:absolute after:bottom-[3px] after:w-[25px] after:border-b-2 after:border-[rgb(45,194,117)]"
                        : 'text-gray-400'
                    }`}
                  >
                    Sắp diễn ra
                  </div>

                  <div
                    onClick={() => setActiveDiv('ended')}
                    className={`relative flex items-center justify-center p-3 font-bold text-sm leading-5 mb-[1rem] cursor-pointer 
                    ${
                      activeDiv === 'ended'
                        ? "text-white after:content-[''] after:absolute after:bottom-[3px] after:w-[25px] after:border-b-2 after:border-[rgb(45,194,117)]"
                        : 'text-gray-400'
                    }`}
                  >
                    Đã kết thúc
                  </div>
                </div>
              </div>
              {/* item */}
              <div className="flex mb-4 gap-[2px] w-full cursor-pointer">
                <div className="bg-[rgb(81,81,88)] p-4 relative w-32 rounded-tl-[4px] rounded-bl-[4px] items-stretch">
                  <div className="flex flex-col justify-center items-stretch gap-2 h-full text-white text-center">
                    <div className="text-[2.6rem]">17</div>
                    <div className="text-[1.2rem]">Tháng 08</div>
                    <div className="text-[1.2rem]">2025</div>
                  </div>
                </div>
                <div
                  className="bg-[rgb(81,81,88)] p-4 relative w-auto rounded-tr-[4px] rounded-br-[4px] items-stretch 
                flex flex-col text-white gap-4 flex-[1_1_0] before:box-border"
                >
                  <div className="font-bold text-[1.2rem] leading-[1.8rem] break-words overflow-hidden text-ellipsis line-clamp-2">
                    NGÀY AN LÀNH - khoá tu 1 ngày MÙA VU LAN
                  </div>
                  <div className="flex flex-wrap gap-[0.4rem]">
                    <div
                      className="bg-[rgb(45,194,117)] text-black border border-[rgb(45,194,117)]
                    text-[1rem] rounded-[3rem] py-[0.2rem] px-[0.6rem] font-normal"
                    >
                      Thành công
                    </div>
                    <div
                      className="bg-[rgb(56,56,61)] text-primary border border-primary
                    text-[1rem] rounded-[3rem] py-[0.2rem] px-[0.6rem] font-normal"
                    >
                      Vé điện tử
                    </div>
                  </div>

                  <div className="flex flex-col w-full gap-4">
                    <div className="flex gap-2 items-center">
                      <BorderOuterOutlined className='w-4 h-4 fill-none flex-[0_0_22px]'/>
                      <div className="text-[1rem] font-medium text-[rgb(196,196,207)]">Order code: 926678290</div>
                    </div>
                    <div className="flex gap-2 items-center">
                      <ClockCircleOutlined className='w-4 h-4 fill-none flex-[0_0_22px]'/>
                      <div className="text-[1rem] font-medium text-[rgb(196,196,207)]">16:23, 11 tháng 09, 2025 - 21:30, 28 tháng 09, 2025</div>
                    </div>
                    <div className="flex gap-2 items-stretch">
                      <EnvironmentOutlined className='w-6 h-6 fill-none flex-[0_0_22px]'/>
                      <div className="flex flex-col gap-2 text-[1rem] font-medium text-[rgb(196,196,207)]">
                        <span className="">Văn Miếu - Quốc Tử Giám</span>
                        <span>58, Phường Quốc Tử Giám, Quận Đống Đa, Thành Phố Hà Nội</span>

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
