
const UserView = (props) => {
  const { imageURL, name, email, username, role } = props;
  return (
    <div className="items-start font-semibold text-black">
      <p className="flex justify-start px-4 py-1">User</p>
      <div className="flex h-[400px] min-w-[300px] justify-center rounded-[13px] bg-[#A4F3B3]">
        <div className="flex flex-col items-center justify-center">
          <div className="relative mb-4 h-[175px] w-[175px] justify-center overflow-hidden rounded-full">
            <img
              src={imageURL}
              className="h-full w-full rounded-full object-cover"
            />
          </div>
          <div className="flex-col justify-start border-t-4 border-primary px-4 text-[15px] font-light text-black">
            <div className="py-2 text-left leading-8">
              <p>Name: {name}</p>
              <p>Email: {email}</p>
              <p>Username: {username}</p>
              <div className="flex flex-row items-center">
                <p className="flex h-0 px-2"> &gt; {role} </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserView;
