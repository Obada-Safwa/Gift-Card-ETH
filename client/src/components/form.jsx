"use client";

export default function Form({ children, title, className = "", onSubmit }) {
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
    </form>
  );
}
