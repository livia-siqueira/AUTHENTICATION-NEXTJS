import { useRef, useState } from "react";
import styles from "./AuthForm.module.css";
import { signIn } from "next-auth/client";
import { useRouter } from "next/router";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();
  const inputEmail = useRef();
  const inputPassword = useRef();
  const changeFormType = () => {
    setIsLogin((option) => !option);
  };
  const loginHandler = async (event) => {
    event.preventDefault();
    const enteredEmail = inputEmail.current.value;
    const enteredPassword = inputPassword.current.value;

    if (
      enteredEmail.trim() ||
      !enteredEmail ||
      !enteredPassword ||
      enteredPassword.trim() === ""
    ) {
      console.log("erro");
    }
    const result = await signIn("credentials", {
      redirect: false,
      email: enteredEmail,
      password: enteredPassword,
    });
    if (!result.error) {
      router.replace("/profile");
    }
  };

  const registerHandler = async (event) => {
    event.preventDefault();
    const enteredEmail = inputEmail.current.value;
    const enteredPassword = inputPassword.current.value;
    const user = {
      email: enteredEmail,
      password: enteredPassword,
    };

    try {
      const userCreated = await fetch("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      throw new Error(error.message || "Something went wrong!");
    }
  };
  return (
    <section className={styles.auth}>
      <h1>Login</h1>
      <form onSubmit={isLogin ? loginHandler : registerHandler}>
        <div className={styles.control}>
          <label htmlFor="email">Your Email</label>
          <input id="email" ref={inputEmail} type="email" />
        </div>
        <div className={styles.control}>
          <label htmlFor="password">Your Password</label>
          <input ref={inputPassword} id="password" type="text" />
        </div>
        <div className={styles.actions}>
          <button>{isLogin ? "Login" : "Create Account"}</button>
          <button
            type="button"
            className={styles.toggle}
            onClick={changeFormType}
          >
            {isLogin ? "Create account" : "Login"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
