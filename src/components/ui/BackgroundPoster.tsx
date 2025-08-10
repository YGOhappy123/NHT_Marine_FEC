import { twMerge } from 'tailwind-merge'

type BackgroundPosterProps = {
    imageUrl: string
    size: 'big' | 'small'
}

const BackgroundPoster = ({ imageUrl, size }: BackgroundPosterProps) => {
    return (
        <div
            className={twMerge(
                `relative -z-[1] bg-cover bg-center after:pointer-events-none after:absolute after:inset-0 
                after:bg-gradient-to-b after:from-black/20 after:to-black/50
                ${size === 'big' ? 'pt-[50%]' : 'pt-[40%]'}` // giữ tỷ lệ
            )}
            style={{ backgroundImage: `url(${imageUrl})` }}
        ></div>
    )
}


export default BackgroundPoster
