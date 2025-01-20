import PersonalDetails from "./components/PersonalDetails";
import BankDetails from "./components/BankDetails";
import UserPropertiesList from "./components/UserPropertiesList";

const UserDetails = () => {
  return (
    <div>
      <div className="px-6 pt-6 h-[calc(100vh_-_81px)] overflow-y-auto pb-10">
        <h5 className="text-22 text-primary font-bold mb-5">User Details</h5>
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
