"use client";
import { api } from "@/utils/api";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

export default function Home() {
  const [wallpapers, setWallpapers] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    getAllWallpapers();
  }, [page]);
  console.log(wallpapers);

  const getAllWallpapers = async () => {
    try {
      const response = await api.get("/api/wallpapers", {
        params: {
          page,
        },
      });

      const newWallpapers = response?.data?.wallpapers || [];
      if (newWallpapers?.length) {
        setWallpapers([...wallpapers, ...newWallpapers]);
      }
      if (newWallpapers?.length < 10) {
        setHasMore(false);
      }
    } catch (error) {}
  };

  const fetchMoreData = () => {
    if (hasMore) {
      setPage(page + 1);
    }
  };

  return (
    <main className="p-8">
      <Link
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-10  w-full"
        href={"/add_wallpaper"}
      >
        Add Wallpaper
      </Link>

      <div className="p-6 rounded-lg shadow-lg mt-5">
        <InfiniteScroll
          dataLength={wallpapers?.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<h1>Loading and fetching more data</h1>}
          endMessage={
            <>
              <p>Hey You have seen it alls</p>
            </>
          }
        >
          <div className="grid grid-cols-3 gap-4">
            {wallpapers &&
              wallpapers?.map((wallpaper) => (
                <div key={wallpaper._id}>
                  <img
                    src={wallpaper?.image}
                    className="w-full rounded shadow-black hover:shadow-lg cursor-pointer "
                  />
                  <h2
                    className="text-black font-semibold p-5
                    hover:text-lg cursor-pointer
                  "
                  >
                    {wallpaper?.name}
                  </h2>
                </div>
              ))}
          </div>
        </InfiniteScroll>
      </div>
    </main>
  );
}
