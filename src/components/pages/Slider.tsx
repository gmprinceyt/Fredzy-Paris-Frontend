import { useMemo } from "react";
import Slider, { type Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function SimpleSlider() {
  const settings = useMemo(() => {
    const setting:Settings = {
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 5000,
      accessibility: true,
      pauseOnHover: true,
      arrows: false,
      lazyLoad: "progressive",
    };
    return setting;
  }, []);

  return (
   <div className="">
     <Slider {...settings}>
      <div className="w-full h-52 rounded-md border overflow-hidden">
        <img
          src="https://plus.unsplash.com/premium_photo-1711508491462-5567bb2f1e33?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bHVjeHVyeSUyMGNsb3RoZXN8ZW58MHwwfDB8fHww"
          className="w-full h-full object-contain"
          alt="Image"
        />
      </div>

      <div className="w-full h-52 rounded-md border overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1560201801-857328508f6f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGx1Y3h1cnklMjBjbG90aGVzfGVufDB8MHwwfHx8MA%3D%3D"
          alt=""
          className="w-full h-full object-cotain"
        />
      </div>
    </Slider>
   </div>
  );
}
