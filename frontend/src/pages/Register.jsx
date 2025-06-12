import { Register as RegisterModel } from "../models/Register";
import { register } from "../api/Register";
import { useNavigate } from "react-router";
import InputField from "../components/common/InputField/InputField";
import CustomButton from "../components/common/Button/CustomButton";

function Register() {
    const navigate = useNavigate();

    const handleRegister = async (email, password, firstName, lastName) => {
        const registerData = RegisterModel.fromJS({ email, password, firstName, lastName });
        try {
            const result = await register(registerData);
            if (result) {
                // Handle successful registration (e.g., redirect to login)
                console.log("Registration successful");
                navigate("/login");
            } else {
                // Handle registration failure (e.g., show error message)
                console.error("Registration failed");
            }
        } catch (error) {
            console.error("Error during registration:", error);
        }
    }


    return (
        <div className="register-container">
            <h2>Register</h2>
            <form onSubmit={(e) => {
                e.preventDefault();
                const email = e.target.email.value;
                const password = e.target.password.value;
                const firstName = e.target.firstName.value;
                const lastName = e.target.lastName.value;
                handleRegister(email, password, firstName, lastName);
            }}>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <InputField inputType="email" placeholder="Enter your email" id="email" name="email" required />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <InputField inputType="password" placeholder="Enter your password" id="password" name="password" required />
                </div>
                <div className="form-group">
                    <label htmlFor="firstName">First Name:</label>
                    <InputField inputType="text" placeholder="Enter your first name" id="firstName" name="firstName" required />
                </div>
                <div className="form-group">
                    <label htmlFor="lastName">Last Name:</label>
                    <InputField inputType="text" placeholder="Enter your last name" id="lastName" name="lastName" required />
                </div>
                <div className="form-group">
                    <CustomButton buttonText="Register" type="submit" />
                </div>
            </form>
        </div>
    );


}

export default Register;