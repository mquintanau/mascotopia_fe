import UserInfoBox from "../UserInfoBox/UserInfoBox";

const UserView = () => {
    return ( 
        <div className="text-black font-semibold items-start">
            <p className="flex justify-start py-1 px-4">User</p>
            <UserInfoBox />
        </div>
     );
}
 
export default UserView;