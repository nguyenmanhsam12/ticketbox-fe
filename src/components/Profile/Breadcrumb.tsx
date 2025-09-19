'use client';
import { RightOutlined } from '@ant-design/icons';

type BreadcrumbProps = {
  title : 'Vé của tôi' | 'Cài đặt tài khoản';
  page : string;
};

export default function Breadcrumb({ title, page }: BreadcrumbProps) {
  const isUser = page === 'myUser';

  const inactive = 'text-[rgb(166,166,176)]';
  const active = 'text-[rgb(235,235,240)]';

  return (
    <div className="hidden md:flex md:flex-row md:items-center md:justify-start mt-8 mb-8 md:gap-2">
      <span className="cursor-pointer text-[rgb(166,166,176)] font-normal text-xs leading-[21px]">
        Trang chủ
      </span>

      <RightOutlined className={`w-3 h-2 ${isUser ? inactive : active}`} />
      <span className={`${isUser ? inactive : active} font-normal text-xs leading-[21px]`}>
        {title}
      </span>

      {isUser && (
        <>
          <RightOutlined className="w-3 h-2 text-white" />
          <span className={`${active} font-normal text-xs leading-[21px]`}>
            Thông tin tài khoản
          </span>
        </>
      )}
    </div>
  );
}
