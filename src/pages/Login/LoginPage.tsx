import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./styles";
import Loading from "../../components/Loading/Loagind";


function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await fetch("http://localhost:8080/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username,
                    password
                })
            });

            if (!response.ok) {
                throw new Error("Invalid credentials");
            }

            const data = await response.json();

            localStorage.setItem("accessToken", data.accessToken);
            localStorage.setItem("refreshToken", data.refreshToken);

            navigate("/dashboard");
            setIsLoading(false);

        } catch (error) {
            console.log(error);

        } finally {
            setIsLoading(false);
        }
    }

    return (
        <>
            {isLoading && <Loading />}

            <S.Section>
                <S.GlassContainer>
                    <S.Title>Login</S.Title>
                    <form onSubmit={handleSubmit}>
                        <S.InputGroup>
                            <S.GlassInput type="text" id="username" name="username" placeholder=" " required
                                value={username} onChange={(e) => setUsername(e.target.value)}
                            />
                            <S.Label htmlFor="username">E-mail</S.Label>
                        </S.InputGroup>

                        <S.InputGroup>
                            <S.GlassInput type="password" id="password" name="password" placeholder=" " required
                                value={password} onChange={(e) => setPassword(e.target.value)} />
                            <S.Label htmlFor="password">Password</S.Label>
                        </S.InputGroup>

                        <S.RememberForgotContainer>
                            <label><input type="checkbox" />Remember me</label>
                            <a href="a">Forgot Password?</a>
                        </S.RememberForgotContainer>

                        <S.LoginButton type="submit" className="login-btn">Login</S.LoginButton>
                    </form>
                </S.GlassContainer>
            </S.Section>
        </>
    );
}

export default LoginPage;