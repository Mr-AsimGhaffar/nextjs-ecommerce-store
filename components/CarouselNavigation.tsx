"use client";

type CarouselNavigationProps = {
  totalSlides: number;
  currentIndex: number;
};

const CarouselNavigation = ({
  totalSlides,
  currentIndex,
}: CarouselNavigationProps) => {
  const goToSlide = (index: number) => {
    document.getElementById(`slide-${index}`)?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  };

  return (
    <div
      className="absolute flex justify-between transform 
        -translate-y-1/2 left-5 right-5 top-1/2"
    >
      <button
        onClick={() =>
          goToSlide(currentIndex === 0 ? totalSlides - 1 : currentIndex - 1)
        }
        className="btn btn-circle"
      >
        ❮
      </button>

      <button
        onClick={() =>
          goToSlide(currentIndex === totalSlides - 1 ? 0 : currentIndex + 1)
        }
        className="btn btn-circle"
      >
        ❯
      </button>
    </div>
  );
};

export default CarouselNavigation;
