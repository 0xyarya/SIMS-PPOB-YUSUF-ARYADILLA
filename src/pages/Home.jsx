import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const Home = () => {
  const services = useSelector((state) => state.service.service);
  const banner = useSelector((state) => state.banner.banner);

  return (
    <>
      <div className="flex h-auto bg-transparent justify-center">
        <div className="grid grid-cols-12 gap-2 w-full lg:w-10/12 md:w-10/12 sm:w-10/12 mt-24 ">
          {services?.map((service, idx) => {
            return (
              <div key={idx}>
                <NavLink
                  to={{
                    pathname: "/payment",
                  }}
                  state={{ service: service }}
                >
                  <img src={service.service_icon} className="mx-auto" />
                  <div className="text-center font-semibold text-sm">
                    {service.service_name}
                  </div>
                </NavLink>
              </div>
            );
          })}
        </div>
      </div>

      <div className="h-auto bg-transparent mt-5 ">
        <div className=" flex justify-center">
          <div className="w-10/12 my-3">
            <h2 className="text-xl font-sans font-semibold">
              Tentukan Promo Menarik
            </h2>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="justify-center grid grid-cols-5 gap-7 w-full lg:w-10/12 md:w-10/12 sm:w-10/12">
            {banner?.map((item, idx) => {
              return (
                <div key={idx}>
                  <img src={item.banner_image} className="mx-auto w-full" />
                  <div className="text-center font-semibold text-sm">
                    {item.banner_name}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
