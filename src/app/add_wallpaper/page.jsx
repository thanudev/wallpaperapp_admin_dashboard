"use client";
import ImageUpload from "@/components/ImageUpload";
import { api } from "@/utils/api";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function page() {
  const [categories, setCategories] = useState([]);
  const [wallpapers, setWallpapers] = useState({
    name: "",
    image: "",
    category: "",
  });

  // get all cat
  useEffect(() => {
    getAllCategories();
  }, []);

  const getAllCategories = async () => {
    try {
      const response = await api.get("/api/categories");
      if (response) {
        setCategories(response?.data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetImageUrl = (url) => {
    setWallpapers((prev) => ({
      ...prev,
      image: url,
    }));
  };

  const handleCreateWallpaper = async () => {
    try {
      const response = await api.post("/api/wallpapers", wallpapers);

      if (response) {
        toast.success("Wallpaper Created Sucessfully");
        setWallpapers({
          name: "",
          category: "",
          image: "",
        });
      }
    } catch (error) {
      toast.error("Something Went Wrong");
    }
  };

  return (
    <main className="p-5">
      <Link
        href={"/add_category"}
        className="bg-blue-500 text-white font-bold py-2 px-4 hover:bg-blue-700 rounded"
      >
        Add Category
      </Link>
      <div className="mt-10 p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-4">Create Wallpaper</h2>

        <input
          onChange={(event) => {
            setWallpapers((prev) => ({ ...prev, name: event.target.value }));
          }}
          type="text"
          placeholder="Enter Wallpaper Name"
          className="pb-4 p-2 border border-gray-300 w-full"
        />
        <select
          value={wallpapers.category}
          onChange={(event) =>
            setWallpapers((prev) => ({ ...prev, category: event.target.value }))
          }
          className="mt-5 px-3 py-2 rounded border border-gray-300 w-full "
        >
          <option value={null}>Select a category</option>
          {categories?.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>

        <ImageUpload handleGetImageUrl={handleGetImageUrl} />
        <button
          onClick={handleCreateWallpaper}
          className="py-3 px-4 bg-blue-500 rounded-md text-white hover:bg-blue-600 mt-5"
        >
          Create Wallpaper
        </button>
      </div>
    </main>
  );
}
