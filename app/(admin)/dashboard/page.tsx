import React from "react";
import Image from "next/image";
import img from "../../../public/img/carte-replace.png";



const page = () => {
  return (
    
      <div className="flex justify-center w-full mx-[100px] ">
        <div className="">
        <Image 
        className="w-[920px] h-[600px] aspect-square"
        src={img} 
        alt={"carte"}
        />
        carte
        </div>
      </div>
  
  );
};

export default page;
