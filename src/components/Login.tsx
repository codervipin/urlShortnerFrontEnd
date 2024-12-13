import axios from "axios";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

type LoginData = {
  email: string;
  password: string;
};

const Login = () => {
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState<LoginData>({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/user/login",
        loginData,
        {
          withCredentials: true,
        }
      );

      if(res.status !== 200){
        throw new Error(res.data.message)
      }

      console.log("Api reponse", res);

      

      Cookies.set("token",res.data.token)
      console.log(res.data)
      toast.success("User Logged in successfully")
      navigate('/')
    } catch (err:any) {
      console.log(err.response);
      toast.error(`${err.response.data.message}`)
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="loginContainer">
      <h1>Login</h1>
      <Form className="mt-4" onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            autoCorrect="true"
            autoComplete="true"
            name="email"
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-5 w-100">
          Submit
        </Button>
      </Form>

      <p className="mt-4 text-center">
        Don't Have an Account?<Link to={"/register"}> Register now </Link>
      </p>
    </div>
  );
};

export default Login;
