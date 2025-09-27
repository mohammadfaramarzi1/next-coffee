"use client";

import { useState } from "react";
import styles from "./form.module.css";
import { showSwal } from "@/utils/helpers";
import { validateEmail } from "@/utils/auth";

const Form = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const submitHandler = async (event) => {
    event.preventDefault();
    if (
      !email.trim() ||
      !name.trim() ||
      !company.trim() ||
      !phone.trim() ||
      !message.trim()
    ) {
      return showSwal("مقادیر اطلاعات نباید خالی باشند", "error", "تلاش بیشتر");
    }
    if (!validateEmail(email)) {
      return showSwal("ایمیل شما نامعتبر می باشد", "error", "تلاش بیشتر");
    }

    const res = await fetch("/api/contact-us", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, phone, company, message }),
    });
    if (res.status === 201) {
      setCompany("");
      setEmail("");
      setMessage("");
      setName("");
      setPhone("");
      return showSwal("درخواست شما با موفقیت انجام شد", "success", "تایید");
    } else {
      return showSwal("درخواست شما با موفقیت انجام نشد", "error", "تلاش بیشتر");
    }
  };

  return (
    <form className={styles.form}>
      <span>فرم تماس با ما</span>
      <p>برای تماس با ما می توانید فرم زیر را تکمیل کنید</p>
      <div className={styles.groups}>
        <div className={styles.group}>
          <label>نام و نام خانوادگی</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className={styles.group}>
          <label>آدرس ایمیل</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>
      <div className={styles.groups}>
        <div className={styles.group}>
          <label>شماره تماس</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className={styles.group}>
          <label>نام شرکت</label>
          <input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
        </div>
      </div>
      <div className={styles.group}>
        <label>درخواست شما</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          name=""
          id=""
          cols="30"
          rows="3"
        ></textarea>
      </div>
      <button onClick={submitHandler}>ارسال</button>
    </form>
  );
};

export default Form;
