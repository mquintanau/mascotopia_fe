import UserInfo from "../UserInfo/UserInfo";

//Ejemplos para la pagina mientras union
const name = "AAAaaaA css";
const email = "aaa@gmail.com";
const username = "aa123";
const role = "Volunteer"
const imageURL = "/shared/EjemploImagenUsuario.jpg"

const UserInfoBox = () => {
    return ( 
        <div className="h-[400px] min-w-[300px] bg-[#A4F3B3] rounded-[13px] flex justify-center">
            <UserInfo 
                imageURL={imageURL}
                name={name}
                email={email}
                username={username}
                role={role}
            />
        </div>
     );
}
 
export default UserInfoBox;