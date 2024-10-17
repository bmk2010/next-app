"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";

function Single({ params }) {
  const [data, setData] = useState({});
  const { id } = params;

  useEffect(() => {
    fetch("https://66f8f3612a683ce973107f6f.mockapi.io/api/data/" + id)
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  return (
    <div className="bg-[#17324e] text-white w-[100vw] h-[100vh] flex items-center flex-col">
      <img src={data.img} alt={data.title} />
      <h1 className="text-[48px] font-black">{data.title}</h1>
      <Link href={"/"}>
        <button className="rounded-xl mt-20 bg-[#2b4b83] px-5 py-4 hover:bg-[#69a0ff] flex gap-2 items-center">
          <FaArrowLeft />
          Orqaga
        </button>
      </Link>
    </div>
  );
}

export default Single;
