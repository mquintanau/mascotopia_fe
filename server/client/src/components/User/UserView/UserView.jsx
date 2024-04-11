const UserView = (props) => {
  const {
    name,
    email,
    username,
    role,
    number_pets
  } = props;
  return (
    <div className="items-start font-semibold text-black">
      <p className="flex justify-start px-4 py-1">User</p>
      <div className="flex min-h-[450px] min-w-[300px] justify-center rounded-[13px] bg-[#A4F3B3]">
        <div className="flex flex-col items-center justify-center my-2">
          <div className="relative mb-4 h-[175px] w-[175px] justify-center overflow-hidden rounded-full">
            <img
              src={"https://via.placeholder.com/150"}
              className="h-full w-full rounded-full object-cover my-2"
            />
          </div>
          <div className="flex-col justify-start border-t-4 border-primary px-4 text-[15px] font-light text-black">
            <div className="py-2 text-left leading-8">
              <p>Name: {name}</p>
              <p>Email: {email}</p>
              <p>Username: {username}</p>
              <p>Pets: {number_pets}</p>
              <p> &gt; {role} </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserView;
