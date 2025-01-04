"use client";

export default function Button(props) {
  return (
    <div className="flex items-center justify-center gap-2 ">
      <button
        className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-all duration-300"
        type={props.type}
        onClick={props.onClick || (() => {})}
      >
        {props.title}
      </button>
    </div>
  );
}
