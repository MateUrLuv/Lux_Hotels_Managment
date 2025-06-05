import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./PhotoGallery.module.css";

export default function PhotoGallery() {
  const images = [
    "/images/hotel1.jpg",
    "/images/hotel2.jpg",
    "/images/hotel3.jpg",
    "/images/hotel4.jpg",
    "/images/hotel5.jpg",
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // Show 3 images at a time on desktop
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
    arrows: true,
    centerMode: true,
    centerPadding: "0px",
  };

  return (
    <div className={styles.galleryOuter}>
      <div className={styles.galleryBox}>
        <div className={styles.galleryTitle}>Photo Gallery</div>
        <Slider {...settings} className={styles.gallerySlider}>
          {images.map((src, idx) => (
            <div key={idx} className={styles.slide}>
              <img
                src={src}
                alt={`Hotel ${idx + 1}`}
                className={styles.galleryImg}
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}
