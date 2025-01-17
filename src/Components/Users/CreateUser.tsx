import NewUser from "./components/NewUser";

const CreateUser = () => {

  return (
    <div>
      <div className="px-6 pt-6 h-[calc(100vh_-_81px)] overflow-y-auto pb-10">
        <h5 className="text-22 text-primary font-bold mb-5">New User</h5>
        {/* New User form */}
        <NewUser />
      </div>
    </div>
  );
};

export default CreateUser;
