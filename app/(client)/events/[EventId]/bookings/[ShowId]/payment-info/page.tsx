/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { cancelCartApi } from '@/src/apis/cart';
import { createOrderApi } from '@/src/apis/order';
import { fetchPaymentMethodApi } from '@/src/apis/paymentmethod';
import CancelOrderModal from '@/src/components/modal/CancelOrderModal';
import ExpireModal from '@/src/components/modal/ExpireModal';
import { formatDate, formatPrice } from '@/src/helpers/format.helper';
import useCountDown from '@/src/hooks/useCountDown';
import {
  fetchCartByBookingCode,
  fetchEventByShowId,
  useFetch,
} from '@/src/hooks/useFetch';
import { RootState } from '@/src/redux/store/store';
import { CalendarOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { Divider } from 'antd';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

export default function PaymentInfo() {
  const params = useParams<{ EventId: string; ShowId: string }>();
  const ShowId = params?.ShowId;
  const EventId = params?.EventId;
  const [isExpireModalOpen, setIsExpireModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookingCode] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(`booking_code_${ShowId}`);
    }
    return null;
  });
  const router = useRouter();
  const [paymentMethodData, setPaymentMethodData] = useState<any>([]);
  const user = useSelector((state:RootState) => state.auth.user);
  const [selectedMethod, setSelectedMethod] = useState<number | null>(null);

  const handleExpireOk = async () => {
    await cancelCartApi(cartData?.booking_code);
    setIsExpireModalOpen(false);
    router.push(`/events/${EventId}/bookings/${ShowId}/select-ticket`);
  };

  const { data: showData } = useFetch(
    ShowId ? ['event-by-showId', ShowId] : null,
    () => fetchEventByShowId(ShowId),
    {}
  );

  const {
    data: cartData,
    error: ErrorCart,
    isLoading: LoadingCart,
  } = useFetch(
    bookingCode ? ['cart-by-booking-code', bookingCode, ShowId] : null,
    () => fetchCartByBookingCode(bookingCode, ShowId),
    {},
    `/events/${EventId}/bookings/${ShowId}/select-ticket`
  );
  const { minutes, seconds, isExpired } = useCountDown(
    cartData?.expired_at,
    () => {
      // callback khi hết hạn
      setIsExpireModalOpen(true);
    }
  );

  const handleCancel = async () => {
    await cancelCartApi(cartData?.booking_code);
    localStorage.removeItem('booking_code');
    setIsModalOpen(false);
    router.push(`/events/${EventId}/bookings/${ShowId}/select-ticket`);
  };

  useEffect(() => {
    async function fetchPaymentMethod() {
      try {
        const res = await fetchPaymentMethodApi();
        setPaymentMethodData(res?.data);
      } catch (error) {
        console.log('Có lỗi ở fetchPaymentMethod', error);
      }
    }
    fetchPaymentMethod();
  }, []);

  const handlePayment = async () => {    
    if(!selectedMethod) {
      toast.error('Vui lòng chọn phương thức thanh toán!');
      return;
    }
    try {
      const res = await createOrderApi({ bookingCode : cartData?.booking_code, showId : ShowId, paymentMethodId : selectedMethod });
      if(res?.success) {
        window.location.href = res?.data;
      }
    } catch (error) {
      console.log('Có lỗi ở handlePayment',error);
      
    }
  }

  return (
    <main>
      <div className="w-full h-full bg-[rgb(0,0,0)] box-border">
        <div
          className="w-full text-[rgb(255,255,255)] overflow-hidden 
                      bg-[url('https://images.tkbcdn.com/2/1560/600/Upload/eventcover/2024/03/18/437B6C.jpg')] bg-center bg-cover bg-no-repeat"
        >
          <div className="w-full bg-[rgb(0,0,0,0.5)] backdrop-blur-[15px] px-6">
            <div className="max-w-[1168px] flex gap-6 h-[13.5rem] mx-auto p-3 justify-center">
              {/* text-info */}
              <div className="flex-[1_1_0%]">
                <p className="font-semibold text-[1.5rem] overflow-hidden break-keep line-clamp-3 m-0">
                  {showData?.event?.name}
                </p>
                <Divider style={{ borderColor: '#ffffff80' }}></Divider>
                <div className="flex items-center mt-3 gap-2">
                  <CalendarOutlined className="w-6" />
                  <span className="font-bold text-lg text-">
                    {formatDate(showData?.time_start)}
                  </span>
                </div>
                <div className="flex items-center mt-3 gap-2">
                  <EnvironmentOutlined className="w-6" />
                  <span className="font-bold text-lg text-">
                    {showData?.event?.province}
                  </span>
                </div>
              </div>
              {/* count-info */}
              <div className="w-[11.875rem] h-full">
                <div
                  className="w-full border border-[rgb(255,255,255,0.376)] overflow-hidden h-full rounded-xl
                                      bg-[rgb(255,255,255,0.25)] flex backdrop-blur-[1rem] flex-col justify-center gap-5 py-4"
                >
                  <p className="text-center w-full px-4">
                    Hoàn tất đặt vé trong
                  </p>
                  <div className="flex justify-center items-center w-full">
                    <span className="flex justify-center items-center">
                      <span
                        className="text-white bg-[rgb(255,66,78)] font-bold w-16 h-16 flex items-center justify-center rounded-[1.25rem]
                                                  text-2xl"
                      >
                        {String(minutes).padStart(2, '0')}
                      </span>
                      <span className="mx-2 font-bold">:</span>
                    </span>
                    <span className="flex justify-center items-center">
                      <span
                        className="text-white bg-[rgb(255,66,78)] font-bold w-16 h-16 flex items-center justify-center rounded-[1.25rem]
                                                  text-2xl"
                      >
                        {String(seconds).padStart(2, '0')}
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* payment-info */}
      <div className="bg-[rgb(0,0,0)] pt-0 h-[661px]">
        <div className="w-full">
          <div className="max-w-[1168px] mx-auto bg-transparent px-6">
            <div className="flex justify-between gap-x-6">
              {/* left */}
              <div className="flex-grow">
                <div>
                  <div className="text-[#4ade80] uppercase my-8 text-xl font-bold">
                    Thanh toán
                  </div>

                  {/* Thông tin nhận vé */}
                  <div className="cursor-default mb-3">
                    <div className="bg-[rgb(56,56,61)] rounded-xl w-full py-3 px-4">
                      <div className="text-[#4ade80] text-sm font-medium">
                        Thông tin nhận vé
                      </div>
                      <div className="text-[rgb(255,255,255)] text-sm mt-2">
                        Vé điện tử sẽ được hiển thị trong mục {'Vé của tôi'} của
                        tài khoản <br />
                        { user.email }
                      </div>
                    </div>
                  </div>

                  {/* Mã khuyến mãi */}
                  <div className="mb-3 bg-[rgb(56,56,61)] rounded-xl w-full py-3 px-4">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-[#4ade80] text-sm font-medium">
                        Mã khuyến mãi
                      </span>
                      <span className="text-[#4ade80] text-sm cursor-pointer">
                        Chọn voucher
                      </span>
                    </div>
                    <button className="border border-gray-500 rounded-full px-2 py-1 text-gray-400 text-sm flex items-center gap-2">
                      <span className="text-lg">+</span>
                      <span>Thêm khuyến mãi</span>
                    </button>
                  </div>

                  {/* Phương thức thanh toán */}
                  <div className="mb-3 bg-[rgb(56,56,61)] rounded-xl w-full py-3 px-4">
                    <div className="text-[#4ade80] text-sm font-medium mb-4">
                      Phương thức thanh toán
                    </div>
                    <div className="space-y-3">
                      {/* VNPAY */}
                      {paymentMethodData?.map((item, index) => (
                        <div className="flex items-center gap-3"
                          key={index}
                        >
                          <input
                            type="radio"
                            name="payment"
                            value={item.id}
                            className="w-4 h-4 accent-[rgb(74,222,128)]"
                            checked={selectedMethod === item.id}
                            onChange={() => setSelectedMethod(item.id)}
                          />
                          <img
                            src={item?.logoUrl}
                            alt={item?.name}
                            className="w-6 h-6"
                          />
                          <span className="text-white text-sm">
                            {item?.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* right */}
              <div className="flex-[0_0_30%] max-w-[25rem] mt-[93px]">
                {/* Thông tin đặt vé */}
                <div className="bg-white rounded-lg p-4 mb-4">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-800 font-bold text-sm">
                      Thông tin đặt vé
                    </span>
                    <span
                      className="text-blue-500 text-sm cursor-pointer"
                      onClick={() => setIsModalOpen(true)}
                    >
                      Chọn lại vé
                    </span>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between">
                      <span className="text-gray-700 font-bold text-sm">
                        Loại vé
                      </span>
                      <span className="text-gray-700 font-bold text-sm">
                        Số lượng
                      </span>
                    </div>

                    {cartData?.cart_items?.map((item, index) => (
                      <React.Fragment key={index}>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-600 text-sm">
                            {item?.name}
                          </span>
                          <span className="text-gray-600 text-sm">
                            {item?.quantity}
                          </span>
                        </div>

                        <div className="flex justify-between items-center text-sm text-gray-500">
                          <span>{formatPrice(item?.price)}</span>
                          <span>{formatPrice(item?.price)}</span>
                        </div>

                        <Divider
                          variant="dashed"
                          className="border border-[rgb(187,185,185)] my-1"
                        />
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                {/* Thông tin đơn hàng */}
                <div className="bg-white rounded-lg p-4 mb-4">
                  <div className="text-gray-800 font-bold text-sm mb-4">
                    Thông tin đơn hàng
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-700 font-bold text-sm">
                      Tạm tính
                    </span>
                    <span className="text-gray-600 text-sm">
                      {formatPrice(cartData?.total_amount)}
                    </span>
                  </div>
                  <hr className="my-3" />
                  <div className="flex justify-between mb-4">
                    <span className="text-gray-800 font-bold text-sm">
                      Tổng tiền
                    </span>
                    <span className="text-[#4ade80] font-bold text-base">
                      {formatPrice(cartData?.total_amount)}
                    </span>
                  </div>
                  <div className="text-gray-500 text-xs mb-4">
                    Bằng việc tiến hành đặt mua, bạn đã đồng ý với{' '}
                    <span className="text-blue-500 mr-1">
                      Điều Kiện Giao Dịch Chung
                    </span>
                  </div>
                  <button className="w-full bg-[#4ade80] text-white py-2 px-2 hover:bg-primaryHover rounded-lg font-medium"
                    onClick={handlePayment}
                  >
                    Thanh toán
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* modal nút chọn vé lại */}
      <CancelOrderModal
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={handleCancel}
        onCloseIcon={() => setIsModalOpen(false)}
      />

      <ExpireModal open={isExpireModalOpen} onOk={handleExpireOk} />
    </main>
  );
}
