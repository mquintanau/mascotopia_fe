import Button from "../../Button/Button";


const UserInfo = (props) => {
  const { imageURL, name, email, username, role } = props;
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative mb-4 h-[175px] w-[175px] justify-center overflow-hidden rounded-full">
        <img
          src={imageURL}
          className="h-full w-full rounded-full object-cover"
        />
      </div>
      <div className="border-t-4 border-primary flex-col justify-start px-4 text-[15px] font-light text-black">
        <div className="text-left leading-8 py-2">
          <p>Name: {name}</p>
          <p>Email: {email}</p>
          <p>Username: {username}</p>
          <div className="flex flex-row items-center">
          <p className="px-2 flex h-0"> &gt; {role} </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
