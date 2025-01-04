"use client";

import AuthFormEnd from "./AuthFormEnd";

export default function Form({ children, title, className = "", onSubmit }) {
  const isLogin = title === "Login";
  const isAuthFrom = title === "Login" || title === "Create Account";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(e);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`bg-white mb-4 rounded-xl shadow-2xl hover:shadow-md px-20 py-28 ${className}`}
    >
      <p className="m-3 text-center text-2xl">{title}</p>
      {children}
      {isAuthFrom && <AuthFormEnd isLogin={isLogin} />}
    </form>
  );
}
