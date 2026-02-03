import 'swiper/css';
import 'swiper/css/navigation';
import { A11y, Autoplay, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

const ReviewSlider = ({ whatClientsSay }) => {
  return (
    <div className="relative">
      <Swiper
        modules={[Navigation, Autoplay, A11y]}
        slidesPerView={1}
        loop={true}
        speed={500}
        autoHeight={true}
        navigation={{
          nextEl: '.slide-next',
          prevEl: '.slide-prev',
          disabledClass: 'swiper-button-disabled',
        }}
        // autoplay={{
        //   delay: 5000,
        //   disableOnInteraction: false,
        // }}
      >
        {whatClientsSay?.reviewsItems?.length > 0 ? (
          whatClientsSay.reviewsItems.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="text-center">
                <div className="text-lg mb-4 px-5 md:px-10 rounded-lg text-balance">{item.review}</div>
                <p className="text-2xl font-medium mb-1">{item.name}</p>
                <p className="text-black/75">{item.info}</p>
              </div>
            </SwiperSlide>
          ))
        ) : (
          <div>No reviews available</div>
        )}
      </Swiper>

      <button
        className="slide-prev md:absolute px-3 md:px-0 mt-14 md:mt-0 left-0 top-1/2 -translate-y-1/2 cursor-pointer z-50"
        title="Slide Prev"
      >
        <img
          className="inline-block invert rotate-180"
          src="/images/arrow-right.svg"
          alt="arrow-right"
          height={31}
          width={39}
        />
      </button>
      <button
        className="slide-next md:absolute px-3 md:px-0 mt-14 md:mt-0 right-0 top-1/2 -translate-y-1/2 cursor-pointer z-50"
        title="Slide Next"
      >
        <img
          className="inline-block invert"
          src="/images/arrow-right.svg"
          alt="arrow-right"
          height={31}
          width={39}
        />
      </button>
    </div>
  );
};

export default ReviewSlider;