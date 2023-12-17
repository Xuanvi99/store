import { Link } from "react-router-dom";

function Header({ title }: { title: string }) {
  return (
    <div className="flex flex-col items-center gap-y-2">
      <Link to={"/"} className=" cursor-pointer ">
        <img
          alt=""
          srcSet="/logo.png"
          loading="lazy"
          className="w-10"
          title="XVStore"
        />
      </Link>
      <h1 className="text-2xl font-bold">{title}</h1>
    </div>
  );
}

export default Header;
