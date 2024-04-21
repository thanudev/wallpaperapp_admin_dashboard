"use client";
import ImageUpload from "@/components/ImageUpload";
import { api } from "@/utils/api";
import React, { useState } from "react";
import toast from "react-hot-toast";

export default function Page() {
  const [category, setCategory] = useState({
    name: "",
    image: "",
  });

  const handleGetImageUrl = (url) => {
    if (url) {
      setCategory((prev) => ({
        ...prev,
        image: url,
      }));
      console.log(url);
    }
  };
  console.log(category);

  const handleCreateCategory = async () => {
    try {
      const response = await api.post("/api/categories", category);
      console.log("Response : ", response.data);
      toast.success("Category Created Sucessfully");
      setCategory({
        name: "",
        image: "",
      });
    } catch (error) {
      console.log("Error : ", error);
      toast.error("Something Went Wrong");
    }
  };

  return (
    <main>
      <div className="p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-4">Create Category</h2>

        <ImageUpload handleGetImageUrl={handleGetImageUrl} />
        <input
          type="text"
          placeholder="Enter Category name"
          className="mb-4 p-2 rounded border border-gray-300 w-full mt-4"
          onChange={(event) =>
            setCategory((prev) => ({ ...prev, name: event.target.value }))
          }
        />
        <button
          onClick={handleCreateCategory}
          className="py-3 px-4 bg-blue-500 rounded-md text-white hover:bg-blue-600"
        >
          Create Category
        </button>
      </div>
    </main>
  );
}
