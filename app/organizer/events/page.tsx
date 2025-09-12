"use client";

import { useState, useEffect } from "react";
import { Alert, Pagination } from "antd";
import '@/src/styles/customTab.css';
import { Event } from "@/src/utils/interfaces/event.interface";
import { 
  getDraftEvents, 
  getPendingEvents, 
  getPublishedEvents, 
  getPastEvents 
} from "@/src/apis/events";
import EventTabs from "./components/EventTabs";
import SearchBar from "./components/SearchBar";
import EventList from "./components/EventList";

export default function EventsPage() {
  const [activeTab, setActiveTab] = useState("pending");
  const [searchValue, setSearchValue] = useState("");
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalEvents, setTotalEvents] = useState(0);

  const fetchEvents = async (tabKey: string) => {
    setLoading(true);
    try {
      let response: Event[] = [];
      
      switch (tabKey) {
        case "draft":
          response = await getDraftEvents();
          break;
        case "pending":
          response = await getPendingEvents();
          break;
        case "upcoming":
          response = await getPublishedEvents();
          break;
        case "past":
          response = await getPastEvents();
          break;
        default:
          response = await getPendingEvents();
      }
      
      setEvents(response);
      setTotalEvents(response.length);
    } catch (error) {
      console.error("Error fetching events:", error);
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents(activeTab);
  }, [activeTab]);

  const handleTabChange = (key: string) => {
    setActiveTab(key);
    setCurrentPage(1);
  };

  const handleSearch = () => {
    // Implement search logic here
    console.log("Searching for:", searchValue);
  };

  const getEmptyMessage = () => {
    switch (activeTab) {
      case "draft":
        return "Không có sự kiện nháp nào";
      case "pending":
        return "Không có sự kiện chờ duyệt nào";
      case "upcoming":
        return "Không có sự kiện sắp tới nào";
      case "past":
        return "Không có sự kiện đã qua nào";
      default:
        return "Không có sự kiện nào";
    }
  };

  return (
    <div className="p-4 text-white">
      <div className="flex flex-wrap gap-2 items-center mb-3 justify-between">
        <SearchBar
          searchValue={searchValue}
          onSearchChange={setSearchValue}
          onSearch={handleSearch}
        />

        <EventTabs
          activeKey={activeTab}
          onTabChange={handleTabChange}
        />
      </div>

      {activeTab === "pending" && (
        <Alert
          message={
            <span>
              <b>Lưu ý:</b> Sự kiện đang chờ duyệt. Để đảm bảo tính bảo mật cho sự kiện của bạn, quyền truy cập vào trang chỉ dành cho chủ sở hữu và quản trị viên được ủy quyền
            </span>
          }
          type="warning"
          showIcon={false}
          className="my-2 bg-yellow-400 text-black font-medium border-none py-3"
        />
      )}

      <EventList
        events={events}
        loading={loading}
        emptyMessage={getEmptyMessage()}
      />

      {totalEvents > 0 && (
        <div className="mt-4 flex justify-center">
          <Pagination
            current={currentPage}
            total={totalEvents}
            pageSize={10}
            onChange={setCurrentPage}
            className="[&_.ant-pagination-item-active]:bg-green-500 [&_.ant-pagination-item-active_a]:text-white"
          />
        </div>
      )}
    </div>
  );
}