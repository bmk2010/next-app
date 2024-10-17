"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IoSend } from "react-icons/io5";

function Main() {
  const [data, setData] = useState([]);
  const [editId, setEditId] = useState(null); // Track the id of the card being edited
  const [value, setValue] = useState("");

  function getData() {
    fetch("https://66f8f3612a683ce973107f6f.mockapi.io/api/data")
      .then((res) => res.json())
      .then((data) => setData(data));
  }

  const handleDelete = (id) => {
    fetch("https://66f8f3612a683ce973107f6f.mockapi.io/api/data/" + id, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        getData();
      });
  };

  const handleEdit = (id) => {
    fetch("https://66f8f3612a683ce973107f6f.mockapi.io/api/data/" + id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: value,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        getData();
        setEditId(null); // Close the form after saving
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="bg-[#2b4b83] text-white rounded-2xl p-[20px]">
      <h2 className="text-2xl font-bold tracking-tight text-white">
        Customers also purchased
      </h2>
      <div className="flex justify-between flex-wrap">
        {data.map((item) => (
          <div key={item.id} className="mt-[50px]">
            <div className="w-[250px] rounded-xl bg-[#17324e] flex flex-col gap-[10px]">
              <div>
                <Link href={"/data/" + item.id}>
                  <div>
                    <Image
                      width={100}
                      height={80}
                      className="w-full"
                      src={item.img}
                      alt={item.title}
                    />
                  </div>
                  <div className="p-[20px] flex flex-col gap-[10px]">
                    <h1>{item.title}</h1>
                    <p className="text-[#b6b9c0]">
                      {item.long.slice(0, 130) + " ..."}
                    </p>
                  </div>
                </Link>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="py-[10px] px-[20px] bg-red-600 rounded-xl"
                >
                  Delete
                </button>

                <button
                  onClick={() =>
                    editId !== item.id
                      ? setEditId(item.id)
                      : handleEdit(item.id)
                  }
                  className="py-[10px] px-[20px] bg-blue-500 rounded-xl"
                >
                  {editId === item.id ? <IoSend /> : "Edit"}
                </button>
              </div>
              {editId === item.id ? (
                <form onSubmit={(e) => e.preventDefault()} className="my-4 mx-4">
                  <input
                    className="text-black w-full p-2"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    type="text"
                    placeholder="Enter new title"
                  />
                </form>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Main;
