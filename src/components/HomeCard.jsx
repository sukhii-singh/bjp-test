import { Box, Button, Container, Grid, Typography } from "@mui/material";
import Image from "next/image";
import React, { useState } from "react";

import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import axios from "axios";
import Baseurl from "@/lib/constants/Baseurl";

function renderMarkdownToHTML(markdown, fullrender) {
  if (fullrender) {
    return { __html: markdown };
  } else {
    if (markdown.substring(0, 1500).includes("<img")) {
      return { __html: markdown.substring(0, 923) };
    } else {
      return { __html: markdown.substring(0, 1150) };
    }
  }
}
const HomeCard = ({ data }) => {
  console.log("cardhome-", data);
  const [readID, setReadID] = useState(null);
  const [postData, setPostData] = useState(null);
  const [readMoreLoader, setReadmoreLoader] = useState(false);
  const [readMore, setReadMore] = useState(false);

  const openPost = (id) => {
    setReadmoreLoader(true);
    axios
      .post(`${Baseurl}single_post_api`, {
        post_id: id,
      })
      .then((res) => {
        console.log("arrow function called", res.data);
        setReadID(res.data.id);
        setPostData(res.data);
        setReadmoreLoader(false);
      })
      .catch((err) => {
        console.log(err);
        setReadmoreLoader(false);
      });
  };

  return (
    <Container
      sx={{ pl: 0, pr: 0 }}
      className="border-l-2  max-h-[90svh] pt-1 lg:pt-2 bg-[#F0F2F5] w-full overflow-y-hidden py-1 lg:py-3"
    >
      <Box className="relative flex gap-6">
        <Box item className="">
          <div className=" flex flex-col gap-1">
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              color={``}
              className="break-words my-1 text-[#FF6D20]"
            >
              {data?.news_paper_name}{" "}
              <span className="text-sm italic">(curtesy)</span>
            </Typography>
            <Typography
              gutterBottom
              variant="h1"
              className=" lg:w-[600px] md:w-[400px] font-bold text-[32px] my-2 break-words"
              style={{ lineHeight: "44px" }}
            >
              {data?.title}
            </Typography>
            <Typography
              gutterBottom
              variant="h3"
              className="truncate lg:w-[600px] md:w-[400px] text-lg my-2 break-words"
            >
              {data?.news_sub_title}
            </Typography>
            <Typography
              gutterBottom
              variant="body2"
              component="div"
              color={``}
              className="break-words my-1"
            >
              &bull; {data?.news_type}
            </Typography>
            <Typography
              gutterBottom
              variant="body2"
              component="div"
              color={``}
              className="break-words my-1"
            >
              {data?.date} <span className="ms-4">{data?.reporter_name}</span>
            </Typography>
          </div>
          <figure className="">
            <div className="overflow-hidden max-h-[500px] relative lg:w-[600px] md:w-[400px]">
              <Image
                draggable="false"
                height={500}
                width={700}
                src={data?.img}
                alt="NN Network"
                placeholder="blur"
                blurDataURL="Loading..."
                className="lg:w-[600px] md:w-[400px]"
              />
              <figcaption className=" w-full text-sm italic text-white bg-black/60 text-center absolute bottom-0 pt-1 ">
                {data?.news_image_caption}
              </figcaption>
            </div>
          </figure>
        </Box>
        <Box
          item
          className={`w-[500px] max-h-[88svh] newspaper-columns ${
            readMore ? 2 : 1
          }`}
        >
          <div
            className="flex flex-col gap-2 flex-wrap text-[16px]  md:text-[18px] newspaper-content "
            dangerouslySetInnerHTML={renderMarkdownToHTML(
              data?.content,
              readMore
            )}
          >
            {
              // data?.content.split( "\n" ).map( ( item, index ) => {
              //     return (
              // <p dangerouslySetInnerHTML={ renderMarkdownToHTML( data?.content, false ) }  ></p>
              //     )
              // } )
            }
          </div>
          {/* {/ <div className="flex flex-col gap-3 flex-wrap" dangerouslySetInnerHTML={ renderMarkdownToHTML( data?.content, readMore ) } ></div> / } */}
        </Box>
        <ArrowForwardIcon
          onClick={() => {
            setReadMore(true);
          }}
          className="cursor-pointer text-[#FF6D20] font-bold absolute -bottom-0  right-2 bg-[#F0F2F5] rounded-full  text-[35px]"
        />
      </Box>
    </Container>
  );
};

export default HomeCard;
