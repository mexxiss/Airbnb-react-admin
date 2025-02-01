import WebsiteRefund from "./WebsiteRefund";
import BookingRefund from "./BookingRefund";

const AdminRefundPolicy = () => {

    return (
        <div>
            <div className="px-6 pt-6 h-[calc(100vh_-_81px)] overflow-y-auto pb-6">
                <div className="flex items-center justify-between border-b border-primary pb-2 mb-7">
                    <h5 className="text-22 text-primary font-bold">Refund Policy</h5>
                </div>
                <div>
                    <p className="text-2xl">Edit <strong>Website</strong> Refund Policy</p>
                    <WebsiteRefund />
                </div>
                <div className="pt-4 border-t border-primary">
                    <p className="text-2xl">Edit <strong>Booking</strong> Refund Policy</p>
                    <BookingRefund />
                </div>
            </div>
        </div>
    );
};

export default AdminRefundPolicy;
