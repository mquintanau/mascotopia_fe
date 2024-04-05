import FooterRectangle from "../../components/FooterRectangle/FooterRectangle";
import Header from "../../components/Header/Header";
import PetView from "../../components/Pet/PetView/PetView";
import UserView from "../../components/User/UserView/UserView";

const Perfil = () => {
  return (
    <div
      className="mx-auto mb-10 max-w-screen-xl"
      style={{ backgroundImage: "url('public/shared/DecorationLine.svg')" }}
    >
      <Header />
      <div className="scrollbar flex justify-center">
        <div className="flex">
          <div className="m-6">
            <UserView />
          </div>
          <div className="m-6">
            <div className="flex flex-col">
              <PetView /> {/* Se ponen mas mascotas dependiendo de la cantidad de mascotas del usuario */}
            </div>
          </div>
        </div>
      </div>
      <FooterRectangle />
    </div>
  );
};

export default Perfil;
