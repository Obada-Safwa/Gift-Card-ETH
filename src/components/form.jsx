import AuthFormEnd from "./AuthFormEnd";

export default function Form({ children, title, className = "" }) {
  const isLogin = title == "Login";
  const isAuthFrom = title === "Login" || title === "Create Account";
  return (
    <form
      className={`bg-white mb-4 rounded-xl shadow-2xl hover:shadow-md px-20 py-28 ${className}`}
    >
      <p className="m-3 text-center text-2xl">{title}</p>
      {children}
      {isAuthFrom && <AuthFormEnd isLogin={isLogin} />}
    </form>
  );
}
