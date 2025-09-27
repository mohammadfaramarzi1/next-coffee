"use client";
import { showSwal } from "@/utils/helpers";
import React, { useEffect, useState } from "react";
import { CiHeart } from "react-icons/ci";

function AddToWishlist({ product }) {
  const [user, setUser] = useState({});

  useEffect(() => {
    const authorizeUser = async () => {
      const res = await fetch("/api/auth/me");
      if (res.status === 200) {
        const data = await res.json();
        setUser({ ...data.user });
      }
    };
    authorizeUser();
  }, []);

  const addToWishlist = async (event) => {
    event.preventDefault();
    if (user) {
      const res = await fetch("/api/wishlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user, product }),
      });

      if (res.status === 201) {
        showSwal(
          "محصول مورد نظر به لیست علاقه مندی شما اضافه شد",
          "success",
          "تایید"
        );
      } else if (res.status === 422) {
        showSwal("محصول انتخابی یا شخص مورد نظر وجود ندارند");
      } else if (res.status === 419) {
        showSwal("این محصول در لیست شما از قبل وجود دارد", "error", "تایید");
      }
    } else {
      showSwal("ابتدا باید وارد حساب کاربری خود شوید", "error", "تایید");
    }
  };

  return (
    <div onClick={addToWishlist}>
      <CiHeart />
      <a href="/">افزودن به علاقه مندی ها</a>
    </div>
  );
}

export default AddToWishlist;
