import { Register as RegisterModel } from "../models/Register";
import { register } from "../api/Register";
import { useNavigate, Link } from "react-router";
import InputField from "../components/common/InputField/InputField";
import CustomButton from "../components/common/Button/CustomButton";

function Register() {
    const navigate = useNavigate();

    const handleRegister = async (email, password, fname, lname, phone) => {
        const registerData = RegisterModel.fromJS({ email, password, fname, lname, phone });
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
            <h2>S'inscrire</h2>
            <p>Déjà un compte ? <Link to="/login">Connectez-vous ici</Link></p>
            <br />
            <form onSubmit={(e) => {
                e.preventDefault();
                const email = e.target.email.value;
                const password = e.target.password.value;
                const fname = e.target.fname.value;
                const lname = e.target.lname.value;
                const phone = e.target.phone.value;
                handleRegister(email, password, fname, lname, phone);
            }}>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <InputField inputType="email" placeholder="Entrez votre email" id="email" name="email" required />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Mot de passe:</label>
                    <InputField inputType="password" placeholder="Entrez votre mot de passe" id="password" name="password" required />
                </div>
                <div className="form-group">
                    <label htmlFor="firstName">Prénom:</label>
                    <InputField inputType="text" placeholder="Entrez votre prénom" id="fname" name="fname" required />
                </div>
                <div className="form-group">
                    <label htmlFor="lastName">Nom:</label>
                    <InputField inputType="text" placeholder="Entrez votre nom" id="lname" name="lname" required />
                </div>
                <div className="form-group">
                    <label htmlFor="phone">Tel:</label>
                    <InputField inputType="tel" placeholder="Entrez votre numéro de téléphone" id="phone" name="phone" required />
                </div>
                <div className="form-group">
                    <CustomButton buttonText="S'inscrire" type="submit" />
                </div>
            </form>
        </div>
    );


}

export default Register;