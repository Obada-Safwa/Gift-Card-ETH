import Link from "next/link";

export default function AuthFormEnd({ isLogin }) {
  return (
    <p className=" m-2 text-center text-sm">
      {isLogin ? "Don't Have an Account?" : "Already have an Account?"}
      &nbsp;
      <Link
        href={isLogin ? "/registration" : "/login"}
        className="text-purple-500 underline cursor-pointer hover:text-purple-900"
      >
        {isLogin ? "Register" : "Login"}
      </Link>
    </p>
  );
}
