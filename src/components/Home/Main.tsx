/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/Home/Main.tsx
'use client';

import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import styles from '@/src/styles/Main.module.css';
import EventCategorySection from './EventCategorySection';
import EventCategoryTab from './EventCategoryTab';
import { useEffect, useState } from 'react';
import TrendingEventsSection from './EventTrendding';
import Image from 'next/image';
import {
  fetchEventsApi,
  fetchEventsBannersApi,
  fetchThisWeekendOrThisMonthEventsApi,
} from '@/src/apis/events';
import {
  SpecialEventType,
  TrendingEventType,
} from '@/src/utils/interfaces/event.interface';
import { getEventParams } from '@/src/helpers/takeTime.helper';
import { useDispatch } from 'react-redux';
import { setSuggestions } from '@/src/redux/store/eventSlice';
import EventSkeleton from '../Commom/EventSkeleton';

export default function Main() {
  const [atBeginning, setAtBeginning] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const [specialEvent, setSpecialEvent] = useState<SpecialEventType | undefined>(undefined);
  const [trendingEvent, setTrendingEvent] = useState<TrendingEventType | undefined>(undefined);
  const [weekendEvent, setWeekendEvent] = useState({});
  const [thisMonthEvent, setThisMonthEvent] = useState({});
  const [bigCateEvent, setBigCateEvent] = useState([]);
  type BannerEvent = {
    imageUrl?: string;
    videoUrl?: string;
    deeplink?: string;
  };
  const [bannerEvents, setBannerEvents] = useState<BannerEvent[]>([]);
  const [forYouEvents, setForYouEvents] = useState<{
    title?: { en?: string };
    events?: any[];
  }>({});
  const dispatch = useDispatch();

  //event by category
  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await fetchEventsApi();
        setSpecialEvent(res?.data?.result?.specialEvents);
        setTrendingEvent(res?.data?.result?.trenddingEvents);
        setBigCateEvent(res?.data?.result?.bigCates);
        setForYouEvents(res?.data?.result?.onlyOnTicketbox);
        dispatch(setSuggestions(res?.data?.result?.onlyOnTicketbox));
      } catch (err) {
        console.error('Lỗi fetch events:', err);
      }
    }

    fetchEvents();
  }, [dispatch]);

  //event time
  useEffect(() => {
    async function fetchThisWeekendOrThisMonthEvents(
      type: 'this-weekend' | 'this-month'
    ) {
      const params = await getEventParams(type);

      const { at, from, to } = params;

      try {
        const res = await fetchThisWeekendOrThisMonthEventsApi(at, from, to);
        if (type === 'this-weekend') {
          setWeekendEvent(res);
        } else if (type === 'this-month') {
          setThisMonthEvent(res);
        }
      } catch (error) {
        console.log('Lỗi fetchThisWeekendOrThisMonthEvents', error);
      }
    }

    fetchThisWeekendOrThisMonthEvents('this-weekend');
    fetchThisWeekendOrThisMonthEvents('this-month');
  }, []);

  //banner
  useEffect(() => {
    async function fetchEventsBanners() {
      try {
        const res = await fetchEventsBannersApi();
        setBannerEvents(res?.data?.data?.result?.heroBanner);
      } catch (error) {
        console.error('lỗi khi fetchEventsBanners', error);
      }
    }
    fetchEventsBanners();
  }, []);
  return (
    <main className="text-white pt-5 pb-8 bg-secondary">
      <div className="container mx-auto px-4 max-w-7xl h-max">
        {/* Banner Section with Swiper Carousel */}
        <section className="mb-10 relative">
          {!bannerEvents.length ? (
            <EventSkeleton count={2} type="banner" />
          ) : (
            <Swiper
              cssMode={true}
              // Thay đổi cấu hình để hiển thị 2 slide cùng lúc
              slidesPerView={2}
              spaceBetween={16}
              loop={false} // Lặp vô hạn
              navigation={{
                nextEl: `.${styles.nextBtnBanner}`,
                prevEl: `.${styles.prevBtnBanner}`,
              }}
              pagination={{ clickable: true }}
              keyboard={true}
              modules={[Navigation, Pagination, Mousewheel, Keyboard]}
              className={styles.bannerSwiper}
            >
              {bannerEvents.map((item, index) => (
                <SwiperSlide key={index}>
                  <div className="relative rounded-xl overflow-hidden h-[320px] shadow-lg group">
                    {/* Thumbnail hiển thị mặc định */}
                    <img
                      src={item?.imageUrl || '/default-thumbnail.jpg'}
                      alt="Thumbnail"
                      className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-0"
                    />

                    {/* Video hiển thị khi hover */}
                    <video
                      muted
                      loop
                      playsInline
                      className="absolute top-0 left-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      onMouseEnter={(e) => e.currentTarget.play()}
                      onMouseLeave={(e) => {
                        e.currentTarget.pause();
                        e.currentTarget.currentTime = 0; // quay lại đầu
                      }}
                    >
                      <source src={item?.videoUrl} type="video/mp4" />
                    </video>

                    {/* Nút xem chi tiết */}
                    <div className="absolute bottom-4 left-4">
                      <Link
                        href={item?.deeplink ?? '/'}
                        className="bg-white text-gray-700 px-3 py-2 font-medium rounded-sm hover:bg-[rgb(45,194,117)] hover:text-white transition-colors text-sm"
                      >
                        Xem chi tiết
                      </Link>
                    </div>
                  </div>
                </SwiperSlide>
              ))}

              {/* Slide ở đây */}
              <div className={styles.prevBtnBanner}>
                <LeftOutlined />
              </div>
              <div className={styles.nextBtnBanner}>
                <RightOutlined />
              </div>
            </Swiper>
          )}
        </section>

        {/* Special Events Section */}
        <section className="relative">
          <h2 className="text-base font-bold mb-4">Sự kiện đặc biệt</h2>
          {!specialEvent?.events?.length ? (
            <EventSkeleton count={5} type="card" />
          ) : (
            <Swiper
              cssMode={true}
              spaceBetween={12}
              slidesPerGroup={4}
              breakpoints={{
                640: { slidesPerView: 2.7, spaceBetween: 12 },
                1024: { slidesPerView: 3.7, spaceBetween: 8 },
                1280: { slidesPerView: 4.7, spaceBetween: 12 },
              }}
              loop={false}
              onSlideChange={(swiper) => {
                setAtBeginning(swiper.isBeginning);
                setAtEnd(swiper.isEnd);
              }}
              navigation={{
                nextEl: `.${styles.nextBtnSpecialEvent}`,
                prevEl: `.${styles.prevBtnSpecialEvent}`,
              }}
              keyboard={true}
              modules={[Navigation, Mousewheel, Keyboard]}
              className={styles.SpecialEvent}
            >
              {specialEvent?.events?.map((event, index) => (
                <SwiperSlide key={index}>
                  <div className="rounded-lg overflow-hidden shadow-lg h-[240px] md:h-[300px] lg:h-[320px] lg:w-[250px]">
                    <Link
                      href={event.deeplink}
                      target="_blank"
                      rel="noopener noreferrer" // bảo mật
                    >
                      <img
                        src={event.imageUrl}
                        alt={event.imageUrl}
                        className="w-full h-full object-cover"
                      />
                    </Link>
                  </div>
                </SwiperSlide>
              ))}

              {/* Custom Navigation buttons */}
              <div
                className={`${styles.prevBtnSpecialEvent} transition-opacity ${
                  atBeginning ? 'opacity-0 pointer-events-none' : 'opacity-100'
                }`}
              >
                <LeftOutlined />
              </div>
              <div
                className={`${styles.nextBtnSpecialEvent} transition-opacity ${
                  atEnd ? 'opacity-0 pointer-events-none' : 'opacity-100'
                }`}
              >
                <RightOutlined />
              </div>
            </Swiper>
          )}
        </section>

        <TrendingEventsSection
          title={trendingEvent?.title ?? { en: '', vi: '' }}
          events={trendingEvent?.events ?? []}
        />

        <EventCategorySection
          title={forYouEvents?.title?.en}
          events={forYouEvents?.events}
          isSlider={true}
        />

        {/* event weekend or event month */}
        <EventCategoryTab
          weekendEvent={weekendEvent}
          thisMonthEvent={thisMonthEvent}
        />

        <Image
          className="mt-8"
          src="/banner1.webp"
          alt="User avatar"
          width={1280}
          height={1280}
          priority
        />

        {bigCateEvent?.map((bigCate, index) => (
          <EventCategorySection
            key={index}
            title={bigCate?.code}
            events={bigCate.events}
          />
        ))}
      </div>
    </main>
  );
}
