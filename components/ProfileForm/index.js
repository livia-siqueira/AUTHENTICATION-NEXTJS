import { useRef } from "react";
import styles from "./ProfileForm.module.css";
const ProfileForm = () => {
    const inputOldPassword = useRef();
    const inputPassword = useRef();
    const changePassword = async(event) => {
        event.preventDefault();
        const oldPassword = inputOldPassword.current.value;
        const password = inputPassword.current.value;
        const resp = await fetch('/api/user/changePassword', {
            method: 'PATCH',
            body: JSON.stringify({password: oldPassword, newPassword: password}),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        console.log(resp)
    }
  return (
    <form className={styles.form} onSubmit={changePassword}>
      <div className={styles.control}>
        <label htmlFor="new-password">New Password</label>
        <input ref={inputPassword} type="password" id="new-password" />
      </div>
      <div className={styles.control}>
        <label htmlFor="old-password">Old Password</label>
        <input ref={inputOldPassword} type="password" id="old-password" />
      </div>
      <div className={styles.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
