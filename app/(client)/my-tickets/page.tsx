import { RightOutlined } from "@ant-design/icons";


export default function MyticketsPage() {
    return (
        <>
            <main className="ml-0 bg-[rgb(42,45,52)]">
                <div className="xl:max-w-[1280px] xl:pl-4 sm:max-w-[100vw] sm:px-2 md:px-3 box-border
                relative mx-auto">
                    <div className="hidden md:flex md:flex-row md:items-center md:justify-start mt-8 mb-8 md:gap-2">
                        <span className="cursor-pointer text-[rgb(166,166,176)] font-normal text-xs leading-[21px]">Trang chủ</span>
                        <RightOutlined className="w-3 h-2 text-[rgb(235,235,240)]" />
                        <span className="text-[rgb(235,235,240)] font-normal text-xs leading-[21px]">Vé của tôi</span>
                    </div>
                </div>
            </main>
        </>
    )
}