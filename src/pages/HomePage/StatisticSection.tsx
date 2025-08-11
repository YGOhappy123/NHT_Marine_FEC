const StatisticSection = () => {
    return (
        <section className="bg-primary/80 flex justify-center px-5 py-[50px]">
            <div className="max-w-container text-primary-foreground/75 grid w-full grid-cols-2 gap-8 font-serif xl:grid-cols-4">
                <div className="flex flex-col items-center gap-5">
                    <span className="text-5xl font-semibold">
                        100<sup className="ml-3 text-2xl">+</sup>
                    </span>
                    <span className="text-xl font-semibold capitalize">Sản phẩm</span>
                </div>
                <div className="flex flex-col items-center gap-5">
                    <span className="text-5xl font-semibold">10th</span>
                    <span className="text-xl font-semibold capitalize">Top thương hiệu uy tín 2024</span>
                </div>
                <div className="flex flex-col items-center gap-5">
                    <span className="text-5xl font-semibold">
                        6k<sup className="ml-3 text-2xl">+</sup>
                    </span>
                    <span className="text-xl font-semibold capitalize">Khách hàng mỗi năm</span>
                </div>
                <div className="flex flex-col items-center gap-5">
                    <span className="text-5xl font-semibold">
                        2k<sup className="ml-3 text-2xl">+</sup>
                    </span>
                    <span className="text-xl font-semibold capitalize">Lượt bán mỗi năm</span>
                </div>
            </div>
        </section>
    )
}

export default StatisticSection
