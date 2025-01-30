import NoDataImg from "../../assets/images/No_data.png";

const DataNotFound = ({ message }: { message: string }) => {
  return (
    <div className="w-full relative z-10 flex flex-col items-center justify-center pt-10">
      <img src={NoDataImg} className="max-w-[400px]" />
      <p className="text-2xl sm:text-3xl text-gray-500 font-medium">
        {`No ${message} Found`}
      </p>
    </div>
  );
};

export default DataNotFound;
