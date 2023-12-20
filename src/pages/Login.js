import AuthLayout from "../layouts/AuthLayout";
import LoginForm from "../components/Auth/LoginForm";

const Login = () => {
    return <AuthLayout page="Login">
        <LoginForm />
    </AuthLayout>
}

export default Login;