export default function FilterChild({ name, number, onClick }) {
  return (
    <button
      onClick={() => {
        onClick();
      }}
      value={name}
      className="py-1.5 px-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-center flex flex-row gap-2 justify-center items-center hover:shadow-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 text-xs font-medium"
    >
      {name}
      <div className="size-5 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-sm font-semibold shadow-inner">
        {number}
      </div>
    </button>
  );
}
