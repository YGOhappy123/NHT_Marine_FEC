type ProductImagesDisplayProps = {
    activeImage: string | undefined
    imageAlt: string
    allImages: string[]
    setActiveImage: (value: string) => void
}

const ProductImagesDisplay = ({ activeImage, imageAlt, allImages, setActiveImage }: ProductImagesDisplayProps) => {
    return (
        <div className="mx-auto flex w-full max-w-[500px] flex-col gap-4">
            <div
                className="aspect-square w-full rounded-lg bg-cover p-4"
                style={{
                    backgroundImage: 'url(/images/fish-pattern.jpg)'
                }}
            >
                <img src={activeImage} alt={imageAlt} className="h-full w-full rounded-lg object-contain" />
            </div>

            <div className="flex items-center gap-4 overflow-x-scroll pb-3">
                {allImages.map((url, index) => (
                    <div
                        key={index}
                        className="aspect-square w-[25%] shrink-0 cursor-pointer rounded-lg bg-cover p-2"
                        style={{
                            backgroundImage: 'url(/images/fish-pattern-2.webp)'
                        }}
                        onClick={() => setActiveImage(url)}
                    >
                        <img src={url} alt={imageAlt} className="h-full w-full rounded-lg object-contain select-none" />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ProductImagesDisplay
