import { useState } from "react";

export default function ImageSlideShow(props) {
    const images = props.images || [];
    const [currentImage, setCurrentImage] = useState(0);

    if (!images || images.length === 0) {
        return (
            <div className="w-full aspect-square rounded-3xl bg-slate-950/40 border border-white/5 flex items-center justify-center">
                <span className="text-slate-500 text-sm">No Images Available</span>
            </div>
        );
    }

    return (
        <div className="w-full flex flex-col gap-4">
            {/* Main Preview Container */}
            <div className="w-full aspect-square rounded-3xl bg-slate-950/30 border border-white/10 overflow-hidden shadow-2xl relative group">
                <img
                    className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                    src={images[currentImage]}
                    alt="Product preview"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent pointer-events-none" />
            </div>

            {/* Thumbnails Gallery */}
            <div className="flex gap-3 overflow-x-auto py-1 scrollbar-thin">
                {images.map((imgUrl, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentImage(index)}
                        className={`w-20 h-20 rounded-2xl overflow-hidden border-2 bg-slate-950/20 transition-all duration-300 hover:scale-105 focus:outline-none flex-shrink-0 ${
                            currentImage === index
                                ? "border-blue-500 shadow-lg shadow-blue-500/20"
                                : "border-white/5 hover:border-white/20"
                        }`}
                    >
                        <img
                            className="w-full h-full object-cover"
                            src={imgUrl}
                            alt={`Thumbnail ${index + 1}`}
                        />
                    </button>
                ))}
            </div>
        </div>
    );
}