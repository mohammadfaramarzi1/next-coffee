import { useState } from "react";
import styles from "./register.module.css";
import Sms from "./Sms";

const Register = ({ showloginForm }) => {
  const [isRegisterWithPassword, setIsRegisterWithPassword] = useState(false);
  const [isRegisterWithOtp, setIsRegisterWithOtp] = useState(false);

  const hideOtpForm = () => setIsRegisterWithOtp(false);

  return (
    <>
      {!isRegisterWithOtp ? (
        <>
          <div className={styles.form}>
            <input className={styles.input} type="text" placeholder="نام" />
            <input
              className={styles.input}
              type="text"
              placeholder="شماره موبایل  "
            />
            <input
              className={styles.input}
              type="email"
              placeholder="ایمیل (دلخواه)"
            />
            {isRegisterWithPassword && (
              <input
                className={styles.input}
                type="Otp"
                placeholder="رمز عبور"
              />
            )}
            <p
              onClick={() => setIsRegisterWithOtp(true)}
              style={{ marginTop: "1rem" }}
              className={styles.btn}
            >
              ثبت نام با کد تایید
            </p>
            <button
              onClick={() => setIsRegisterWithPassword(true)}
              style={{ marginTop: ".7rem" }}
              className={styles.btn}
            >
              ثبت نام با رمزعبور
            </button>
            <p onClick={showloginForm} className={styles.back_to_login}>
              برگشت به ورود
            </p>
          </div>
          <p className={styles.redirect_to_home}>لغو</p>
        </>
      ) : (
        <Sms hideOtpForm={hideOtpForm} />
      )}
    </>
  );
};

export default Register;
