import React, { useEffect, useState } from "react";
import morningVideo from '../../assets/images/1_wp9kx2d0qyGbIVWBvNhcMQ.png'
import sunsetVideo from '../../assets/images/mountains-100367_1280.jpg'
import nightVideo from '../../assets/images/night-time-scene-with-bright-full-moon-at-lake-vector.jpg'


export default function Clock(){
  const [time, setTime] = useState(new Date());
  

  useEffect(() => {
 
    const interval = setInterval(() => {

      setTime(new Date());
      
      

    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const seconds = time.getSeconds();
  const minutes = time.getMinutes();
  const hours = time.getHours();

  const secondDeg = seconds * 6;
  const minuteDeg = (minutes % 60) * 6 + (seconds % 60) * 0.1;
  const hourDeg = ((hours % 12) * 30) + ((minutes % 60) * 0.5);

  const getBackgroundVideo = (hour) => {
    if (hour >= 6 && hour < 15) {
        return morningVideo;
      } else if (hour >= 15 && hour < 18) {
        return sunsetVideo;
      } else {
        return nightVideo;
      }
   
  };

  const backgroundVideo = getBackgroundVideo(hours);

  return (
    <div className="flex items-center justify-center h-screen relative overflow-hidden">
      <img
        className="absolute top-0 left-0 w-full h-full object-cover z-[-1]"
        src={backgroundVideo}
         alt="background"
      />
      <div className="relative w-72 h-72 bg-white bg-opacity-50 border-[6px]  rounded-full shadow-2xl backdrop-blur-md">
        {[...Array(12)].map((_, i) => {
          const angle = (i + 1) * 30;
          const radius = 110;
          const x = radius * Math.sin((angle * Math.PI) / 180);
          const y = -radius * Math.cos((angle * Math.PI) / 180);
          return (
            <div
              key={i}
              className="absolute text-lg font-bold text-gray-800"
              style={{
                left: `calc(50% + ${x}px - 0.5em)`,
                top: `calc(50% + ${y}px - 0.5em)`
              }}
            >
              {i + 1}
            </div>
          );
        })}

        <div
          className="absolute w-1 h-20 bg-black origin-bottom left-1/2 top-1/2"
          style={{ transform: `translateX(-50%) translateY(-100%) rotate(${hourDeg}deg)` }}
        />

        <div
          className="absolute w-1 h-28 bg-gray-700 origin-bottom left-1/2 top-1/2"
          style={{ transform: `translateX(-50%) translateY(-100%) rotate(${minuteDeg}deg)` }}
        />

        <div
          className="absolute w-0.5 h-32 bg-red-500 origin-bottom left-1/2 top-1/2"
          style={{ transform: `translateX(-50%) translateY(-100%) rotate(${secondDeg}deg)` }}
        />

        <div className="absolute w-4 h-4 bg-black rounded-full left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10" />
      </div>
    </div>
  );
};


