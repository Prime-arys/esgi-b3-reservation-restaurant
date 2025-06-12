import { Connect, ResConnect } from "../models/Connect";
import { connect } from "../api/Connect";
import { useNavigate, Link } from "react-router";
import InputField from "../components/common/InputField/InputField";
import CustomButton from "../components/common/Button/CustomButton";

function Login() {
    const navigate = useNavigate();

    const handleLogin = async (email, password) => {
        const connectData = Connect.fromJS({ email, password });
        try {
            const result = await connect(connectData);
            if (result) {
                // Handle successful login (e.g., redirect to dashboard)
                console.log("Login successful");
                switch (result.role) {
                    case "ADMIN":
                        navigate("/reservations");
                        break;
                    case "CLIENT":
                        navigate("/my-reservations");
                        break;
                    default:
                        navigate("/");
                }

            } else {
                // Handle login failure (e.g., show error message)
                console.error("Login failed");
            }
        } catch (error) {
            console.error("Error during login:", error);
        }
    }

    return (
        <div className="login-container">
            <h2>Connexion</h2>
            <p>Pas encore de compte ? <Link to="/register">Inscrivez-vous ici</Link></p>
            <p>Accèder au menu ? <Link to="/menu">Menu</Link></p>
            <br />
            <form onSubmit={(e) => {
                e.preventDefault();
                const email = e.target.email.value;
                const password = e.target.password.value;
                handleLogin(email, password);
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
                    <CustomButton buttonText="Connexion" type="submit" />
                </div>
            </form>
        </div>
    );
}

export default Login;