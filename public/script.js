import "@babel/polyfill";
import axios from "axios";
const signup = document.querySelector(".signup");
const login = document.querySelector(".login");

if (signup) {
  console.log("signup");
  const doc = document.querySelector(".sign-button");
  doc.addEventListener("click", async (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    try {
      const res = await axios({
        method: "POST",
        withCredentials: true,
        url: "http://127.0.0.1:3333/api/signup",
        data: {
          name,
          email,
          password,
          confirmPassword,
        },
      });

      if (res.data.status === "success") {
        alert("Signup successfully!");
        window.setTimeout(() => {
          location.assign("/");
        }, 1500);
      }
    } catch (err) {
      alert(err.response.data.message);
    }
  });
}

if (login) {
  const doc = document.querySelector(".login-button");
  doc.addEventListener("click", async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    try {
      const res = await axios({
        method: "POST",
        withCredentials: true,
        url: "http://127.0.0.1:3333/api/login",
        data: {
          email,
          password,
        },
      });

      if (res.data.status === "success") {
        alert("Login successfully!");
        window.setTimeout(() => {
          location.assign("/overview");
        }, 1500);
      }
    } catch (err) {
      alert(err.response.data.message);
    }
  });
}
