import ProfileForm from "../ProfileForm";
import styles from "./PerfilUser.module.css";
import { getSession } from "next-auth/client";
import { useEffect, useState } from "react";

const PerfilUser = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getSession().then((session) => {
      if (!session) {
        window.location.href = "/login";
      }else{
        setIsLoading(false);
      }
      
    });
  }, []);

  if (isLoading) {
    return <p className={styles.profile}>Loading...</p>;
  }
  return (
    <section className={styles.profile}>
      <h1>Your User Profile</h1>
      <ProfileForm />
    </section>
  );
};

export default PerfilUser;
