import UserNavbarImage from "../User/UserNavbarImage/UserNavbarImage";

const NavBar = () => {
  return (
    <div className="flex items-center justify-between">
      <div className="fixed left-0">
        <UserNavbarImage className="ml-[22px]" />
      </div>
      <div className="fixed right-0">
        <a
          href="#"
          className="mr-[25px]"
          onClick={() => {
            console.log("Click en Noticias");
          }}
        >
          News
        </a>
        <a
          href="#"
          className="mr-[25px] "
          onClick={() => {
            console.log("Click en Foros");
          }}
        >
          Forums
        </a>
        <a
          href="#"
          className="mr-[25px]"
          onClick={() => {
            console.log("Click en Calendario");
          }}
        >
          Calendar
        </a>
      </div>
    </div>
  );
};

export default NavBar;
