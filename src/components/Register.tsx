
import axios from 'axios';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

type User ={
    fullName : string,
    email : string,
    password: string
}

const Register = () => {
    const navigate  = useNavigate();

    const [userData,setUserData] = useState<User>({
        fullName: '',
        email: '',
        password: ''
      })

    const handleSubmit =async (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        console.log(userData);
        try{
            const res = await axios.post('http://localhost:5000/user/register',userData,{
                headers: {
                  'Content-Type': 'application/json' 
                }
              });

            if(res.status !== 200){
                throw new Error("Failed to register user")
            }

            console.log(res.data);
            toast.success("User registered successfully")
            navigate('/login')
        }catch(err){
            console.log(err);
            toast.error("Failed to register")
        }
       
    }

    const handleChange =(e:React.ChangeEvent<HTMLInputElement>)=>{
        const {name,value} = e.target;

        setUserData(prev=> ({
            ...prev,
            [name]:value
        }))


    }
    
  return (
    <div className="loginContainer">
        <h1>Register</h1>
    <Form className='mt-4' onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Full Name</Form.Label>
        <Form.Control type="text" placeholder="Enter Full Name" name='fullName' onChange={handleChange} value={userData.fullName} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" name='email' autoComplete='true' onChange={handleChange} value={userData.email}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" name='password' onChange={handleChange} value={userData.password}/>
      </Form.Group>
    
      <Button variant="primary" type="submit" className='mt-5 w-100'>
        Submit
      </Button>
    </Form>

    <p className='mt-4 text-center'>ALready registerd?<Link to={'/login'}> Login here </Link></p>

    </div>
  );
}


export default Register