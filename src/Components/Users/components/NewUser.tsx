import { Form, FormikProvider, useFormik } from 'formik';
import React from 'react';
import Input from '../../Input/Input';
import { useNavigate } from 'react-router-dom';

interface IProps {
    userId: string,
    setUserId: React.Dispatch<React.SetStateAction<string>>
}
const NewUser = ({ userId, setUserId }: IProps) => {
    const navigate = useNavigate()
    const formik = useFormik({
        initialValues: {
            first_name: "",
            last_name: "",
            email: "",
            password: "",
        },
        enableReinitialize: true, // Ensure form values update when data changes
        onSubmit: async (values) => {
            setUserId("1234567890")
            if (userId !== "") {
                navigate(`/admin/user/${userId}`)
            }
        },
    });
    return (
        <div>
            <h6 className="text-lg text-primary font-semibold">Create User</h6>
            <div className="mt-3">
                <FormikProvider value={formik}>
                    <Form onSubmit={formik.handleSubmit}>
                        <div className="grid sm:grid-cols-2 gap-4">
                            {/* Input Fields */}
                            <Input
                                name="first_name"
                                label="First Name"
                                type="text"
                                placeholder="Enter First Name"
                                disabled={userId !== ""}
                            />
                            <Input
                                name="last_name"
                                label="Last Name"
                                type="text"
                                placeholder="Enter Last Name"
                                disabled={userId !== ""}
                            />
                            <Input
                                name="email"
                                label="Email"
                                type="email"
                                placeholder="Enter Email"
                                disabled={userId !== ""}
                            />
                            <Input
                                name="password"
                                label="Password"
                                type="password"
                                placeholder="Enter Password"
                                disabled={userId !== ""}
                            />
                        </div>
                        <div className="flex justify-end mt-4">
                            <button type="submit" className="px-4 py-2 text-white bg-primary hover:bg-primary-dark">
                                Create User
                            </button>
                        </div>
                    </Form>
                </FormikProvider>
            </div>
        </div>
    );
};

export default NewUser;
