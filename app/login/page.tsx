import React from "react";

export default function Login() {

  const isLoggedIn = false;



  return isLoggedIn ? (
    <div>
      <h1>Welcome back!</h1>
      <p>You are already logged in.</p>
    </div>
  ) : (
    <div>
      <h1>Login</h1>;
      <form>
        <div>
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" name="username" required />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" required />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}