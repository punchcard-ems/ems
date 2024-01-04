import { useCallback, useEffect, useRef, useState } from "react";

const slideStyles = {
    width: "100%",
    height: "100%",
    borderRadius: "10px",
    backgroundSize: "cover",
    backgroundPosition: "center",
};

const sliderStyles = {
    position: "relative",
    height: "100%",
};

const slidesContainerStyles = {
    display: "flex",
    height: "100%",
    transition: "transform ease-out 0.3s",
};

const slidesContainerOverflowStyles = {
    overflow: "hidden",
    height: "100%",
};

const ImageSlider = ({ slides, parentWidth }) => {
    const timerRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const goToNext = useCallback(() => {
        const isLastSlide = currentIndex === slides.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    }, [currentIndex, slides]);

    const getSlideStylesWithBackground = (slideIndex) => ({
        ...slideStyles,
        backgroundImage: `url(${slides[slideIndex].url})`,
        width: `${parentWidth}px`,
    });
    const getSlidesContainerStylesWithWidth = () => ({
        ...slidesContainerStyles,
        width: parentWidth * slides.length,
        transform: `translateX(${-(currentIndex * parentWidth)}px)`,
    });

    useEffect(() => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }
        timerRef.current = setTimeout(() => {
            goToNext();
        }, 4000);

        return () => clearTimeout(timerRef.current);
    }, [goToNext]);

    return (
        <div style={sliderStyles}>
            <div style={slidesContainerOverflowStyles}>
                <div style={getSlidesContainerStylesWithWidth()}>
                    {slides.map((_, slideIndex) => (
                        <div
                            key={slideIndex}
                            style={getSlideStylesWithBackground(slideIndex)}
                        ></div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ImageSlider;