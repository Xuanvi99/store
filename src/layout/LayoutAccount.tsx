import { Outlet } from "react-router-dom";

function LayoutAccount() {
  return (
    <section className="w-full h-screen bg-orangeLinear flex justify-center items-center">
      <div className="w-[900px] h-[550px] flex rounded-xl shadow-lg shadow-black overflow-hidden">
        <div className="w-1/2 h-full rounded-l-xl">
          <img alt="" srcSet="/imageLogin.png" className="w-full h-full" />
        </div>
        <div className="w-1/2 h-full bg-white">
          <Outlet></Outlet>
        </div>
      </div>
    </section>
  );
}

export default LayoutAccount;
