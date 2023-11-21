import classes from "./ProfileForm.module.css";

import { useRef } from "react";

const ProfileForm = () => {
  const newPasswordInputRef = useRef();

  const submitHandler = async (event) => {
    event.preventDefault();
    const enteredNewPassword = newPasswordInputRef.current.value;
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:3000/users/me", {
        method: "PUT",
        body: JSON.stringify({
          password: enteredNewPassword,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const responseData = await response.json();
        const errorMsg =
          responseData.message ||
          (responseData.errors &&
          responseData.errors[0] &&
          responseData.errors[0].message
            ? responseData.errors[0].message
            : "Something went wrong!");
        throw new Error(errorMsg);
      }

      newPasswordInputRef.current.value = "";
      alert("Password changed successfully");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input type="password" id="new-password" ref={newPasswordInputRef} />
      </div>
      <div className={classes.backbutton}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
