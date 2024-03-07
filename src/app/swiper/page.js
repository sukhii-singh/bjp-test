"use client"
import React, { useEffect, useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/scrollbar';

// import './styles.css';

// import required modules
import { Scrollbar, Mousewheel } from 'swiper/modules';
import DrawerHeader from '@/components/DrawerHeader';
import HomeCard from '@/components/HomeCard';
import Baseurl from '@/lib/constants/Baseurl';
import axios from 'axios';

export default function Swiperr() {
    const [apiData, setApiData] = useState(null)
    useEffect(() => {


        try {
            axios.post(`${Baseurl}home_api`).then((res) => {
                setApiData(res.data);
                console.log("HomePage", res.data.top_news);
            })
                .catch((err) => {
                    console.log(err)
                })
        } catch (error) {
            console.log(error);
        }
    }, [])
    return (


        <div className="container mt-5 w-max hide-scroll" style={{ flexGrow: 1 }}>
            <DrawerHeader />

            {apiData && <Swiper
                slidesPerView={1.5}
                mousewheel={true}

                modules={[Mousewheel, Scrollbar]}
                className=""
            >
                {apiData?.top_news?.map((item, index) => {
                    return (

                        <SwiperSlide key={index} className=''>
                            <HomeCard data={item} />
                        </SwiperSlide>
                    )
                })}


            </Swiper>}
        </div>

    );
}
