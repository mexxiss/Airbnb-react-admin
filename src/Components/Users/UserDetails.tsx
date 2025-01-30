import PersonalDetails from "./components/PersonalDetails";
import BankDetails from "./components/BankDetails";
import UserPropertiesList from "./components/UserPropertiesList";

const UserDetails = () => {
  return (
    <div>
      <div className="px-6 pt-6 h-[calc(100vh_-_81px)] overflow-y-auto pb-6">
        <div className="flex items-center justify-between border-b border-primary pb-5 mb-5">
          <h5 className="text-22 text-primary font-bold">User Details</h5>
        </div>
        {/* User Details */}
        <PersonalDetails />

        {/* Bank Details */}
        <BankDetails />

        {/* Listed properties */}
        <UserPropertiesList />
      </div>
    </div>
  );
};

export default UserDetails;
