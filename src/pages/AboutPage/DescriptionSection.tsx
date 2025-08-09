import AwardsSection from '@/pages/AboutPage/AwardsSection'

const DescriptionSection = () => {
    return (
        <section className="flex flex-col items-center bg-ivory px-5 py-[100px]">
            <AwardsSection />

            <div className="flex w-full max-w-container flex-col gap-9 pt-[100px]">
                <div className="flex flex-col gap-5">
                    <p className="font-semibold uppercase tracking-widest text-secondary">Mục tiêu của chúng tôi</p>
                    <p className="max-w-[70%] text-balance font-serif text-5xl font-semibold leading-[1.4]">
                        Giúp khách hàng có trải nghiệm tuyệt vời thông qua dịch vụ của chúng tôi!
                    </p>
                    <p className="font-semibold text-[#6E6E6E]">
                        Với nhiều loài cá cảnh, sản phẩm đa dạng, hiện đại và chất lượng phục vụ tốt là điểm tự tin nhất của chúng tôi! Chắc hẳn sẽ đáp
                        ứng được nhu cầu đam mê cá cảnh của bạn!
                    </p>
                </div>
                <div className="grid grid-cols-2 gap-[30px]">
                    <div className="flex flex-col gap-[30px] rounded-3xl bg-white p-[50px]">
                        <p className="font-serif text-2xl font-semibold">Sứ mệnh của chúng tôi</p>
                        <div className="border-t border-solid border-[#DADADA]"></div>
                        <div className="flex gap-[25px]">
                            <p className="font-serif text-4xl font-semibold text-secondary">01</p>
                            <div>
                                <p className="font-serif text-xl font-semibold text-[#2D2D2D]">Trở thành nơi đáp ứng các loài cá cảnh lý tưởng</p>
                                <p className="mt-2 text-justify text-lg text-[#6E6E6E]">Cung cấp dịch vụ và trải nghiệm tốt nhất</p>
                            </div>
                        </div>
                        <div className="flex gap-[25px]">
                            <p className="font-serif text-4xl font-semibold text-secondary">02</p>
                            <div>
                                <p className="font-serif text-xl font-semibold text-[#2D2D2D]">Đáp ứng mọi mong đợi của khách hàng</p>
                                <p className="mt-2 text-justify text-lg text-[#6E6E6E]">Đáp ứng nhu cầu và mong đợi của mỗi khách hàng 24/24</p>
                            </div>
                        </div>
                        <div className="flex gap-[25px]">
                            <p className="font-serif text-4xl font-semibold text-secondary">03</p>
                            <div>
                                <p className="font-serif text-xl font-semibold text-[#2D2D2D]">Tạo ra những trải nghiệm khó quên</p>
                                <p className="mt-2 text-justify text-lg text-[#6E6E6E]">Mang lại trải nghiệm sở hữu các loài cá đặc biệt khó quên cho mọi khách hàng</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-[30px] rounded-3xl bg-white p-[50px]">
                        <p className="font-serif text-xl font-semibold text-[#2D2D2D]">"NHT Marine! Natural Habitat, True beauty!"</p>
                        <p className="text-justify text-lg text-[#6E6E6E]">
                            Trải nghiệm sự kết hợp hoàn hảo giữa vẻ đẹp thiên nhiên và nét tinh tế hiện đại tại NHT Marine. Với sự tận tâm trong từng dịch vụ và không gian trưng bày độc đáo,
                            chúng tôi mang đến cho bạn những khoảnh khắc thư giãn như đang đắm mình dưới đáy đại dương. 
                            Niềm vui và sự hài lòng của bạn chính là ưu tiên hàng đầu của chúng tôi! <br></br>
                            <br></br> Dù bạn là người mới bắt đầu, người chơi cá cảnh lâu năm hay chỉ đơn giản là muốn khám phá vẻ đẹp
                            dưới nước, NHT Marine luôn sẵn sàng đáp ứng mọi nhu cầu của bạn. Từ những loài cá cảnh độc đáo đến
                            phụ kiện và dịch vụ chăm sóc chuyên nghiệp, chúng tôi mang đến trải nghiệm vượt mong đợi, giúp bạn
                            tận hưởng trọn vẹn từng khoảnh khắc thư giãn bên hồ cá của mình. NHT Marine – nơi đam mê cá cảnh được thăng hoa!
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default DescriptionSection
