export interface contactQueries {
    user: {
        profile_img: string;
        first_name: string;
        last_name: string;
        email: string;
        phone: string;
        _id: string
    };
    count: number;
    pendingCount: number;
    _id: string
}