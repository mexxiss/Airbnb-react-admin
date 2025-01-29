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

export interface Query {
    _id: string;
    question_type: string;
    message: string;
    createdAt: string;
    status: string;
    reply?: string
}