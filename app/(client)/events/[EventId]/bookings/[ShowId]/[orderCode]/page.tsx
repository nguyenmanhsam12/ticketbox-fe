'use client';

import { getOrderApi } from '@/src/apis/order';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import image1 from '@/src/image/image.svg';
import image2 from '@/src/image/image1.svg';
import Image from 'next/image';

import { Table } from 'antd';
import type { TableProps } from 'antd';

interface DataType {
  key: string;
  name: string;
  orderCode: string;
  total_amount: string;
}

const columns: TableProps<DataType>['columns'] = [
  {
    title: 'Sự kiện',
    dataIndex: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Mã đơn hàng',
    className: 'column-money',
    dataIndex: 'orderCode',
    align: 'right',
  },
  {
    title: 'Tổng tiền',
    dataIndex: 'total_amount',
  },
];

const data: DataType[] = [
  {
    key: '1',
    name: 'DOANH NGHIỆP BỨT PHÁ 2025 - ĐỔI MỚI - THÍCH ỨNG - TĂNG TRƯỞNG',
    orderCode: '615996996',
    total_amount: '0 đ',
  }
];



export default function PaymentResultPage() {
  const { EventId, ShowId, orderCode } = useParams<{
    EventId: string;
    ShowId: string;
    orderCode: string;
  }>();
  const orderCodeId = orderCode.substring(orderCode.indexOf('ORD-'));
  const [orderData, setOrderData] = useState([]);

  useEffect(() => {
    async function getOrder() {
      const res = await getOrderApi(orderCodeId);
      console.log('res',res);
      
    //   const { orderCode,  } = res.data;
    }

    getOrder();
  }, [EventId, ShowId, orderCodeId]);

  return (
    <>
      <main>
        <div className="bg-[rgb(0,0,0)] w-full h-screen">
          <div className="bg-[rgb(0,0,0)] pt-0">
            <div className="w-full">
              <div className="mx-auto bg-[rgb(39,39,42)] md:max-w-[720px] lg:max-w-[1168px] bg-transparent">
                <div className="w-full">
                  <div className="mx-auto bg-[rgb(255,255,255)] md:max-w-[45rem] lg:max-w-[64rem] bg-transparent">
                    <div className="flex flex-wrap sm:-mx-2 md:-mx-3 lg:-mx-3 xl:-mx-4">
                      <div
                        className="box-border min-h-[1px] w-full px-[12px] md:flex-none          
                                    md:basis-[8.33333%]    
                                    md:max-w-[8.33333%]    
                                    lg:flex-none          
                                    lg:basis-[16.6667%]    
                                    lg:max-w-[16.6667%]"
                      >
                      </div>
                      {/* div chính */}
                      <div 
                        className="
                            box-border             
                            min-h-[1px]             
                            w-full                  
                            px-[12px]               
                            md:flex-none            
                            md:basis-[83.3333%]     
                            md:max-w-[83.3333%]    
                            lg:flex-none           
                            lg:basis-[66.6667%]    
                            lg:max-w-[66.6667%]     
                        ">
                            <div className="w-full bg-[rgb(245,245,250)] md:mt-6 rounded-3xl p-8">
                                <div className="flex flex-col items-center justify-center">
                                    <div className="w-full flex gap-4 flex-col items-center">
                                        <div className="flex flex-col items-center">
                                            <Image src={image1} alt='image1' />
                                            <div className="flex items-center gap-2">
                                                <Image src={image2} alt='image2' />
                                                <h1 className='text-primary text-[20px] font-bold'>Đặt vé thành công</h1>
                                            </div>
                                        </div>
                                        <div className="flex flex-col border-transparent rounded-xl p-3 bg-[rgb(255,255,255)] lg:w-full">
                                            <div className="box-border m-0 p-0 text-[rgb(0,0,0)] text-sm list-none">
                                                {/* table */}
                                                <Table<DataType>
                                                    columns={columns}
                                                    dataSource={data}
                                                />
                                            </div>
                                        </div>
                                        {/* action */}
                                        <div className="flex gap-2 w-full">
                                            <button className='flex items-center justify-center w-full outline-none cursor-pointer h-[40px]
                                            leading-6 min-w-[88px] px-6 pt-0 bg-transparent text-[rgb(45,194,117)] border border-[rgb(45,194,117)]
                                            font-medium text-base rounded-[4px]'>Trang chủ</button>
                                            <button className='flex items-center justify-center border-none w-full outline-none
                                            cursor-pointer leading-6 min-w-[88px] px-6 pt-0 font-medium text-base text-[rgb(255,255,255)] bg-[rgb(45,194,117)]
                                            '>Vé của tôi</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                      <div
                        className="box-border min-h-[1px] w-full px-[12px] md:flex-none          
                                    md:basis-[8.33333%]    
                                    md:max-w-[8.33333%]    
                                    lg:flex-none          
                                    lg:basis-[16.6667%]    
                                    lg:max-w-[16.6667%]"
                      >
                      </div>
                    </div>
                  </div>
                  {/* recommend */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
