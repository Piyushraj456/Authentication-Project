import React from 'react'
import { VStack } from '@chakra-ui/react'
import {Input,InputGroup,InputRightElement} from '@chakra-ui/input'
import {FormControl,FormLabel} from "@chakra-ui/form-control"
import { useState } from 'react'
import { Button, ButtonGroup } from '@chakra-ui/react'
import { useToast } from '@chakra-ui/react'
import axios from "axios";


const SignUp = () => {
    const [name, setName] = useState();
    const [show, setShow] = useState(false);
    const [email, setEmail] = useState();
    const [confirmpassword, setConfirmpassword] = useState();
    const [password, setPassword] = useState();
   

    const toast= useToast();
   


    const handleClick=()=>setShow(!show);
    const submitHandler = async () => {
    
      if (!name || !email || !password || !confirmpassword) {
        toast({
          title: "Please Fill all the Feilds",
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        
        return;
      }
      if (password !== confirmpassword) {
        toast({
          title: "Passwords Do Not Match",
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        return;
      }
      console.log(name, email, password);
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };
        const { data } = await axios.post(
          "/api/user",
          {
            name,
            email,
            password,
          },
          config
        );
        console.log(data);
        toast({
          title: "Registration Successful",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        localStorage.setItem("userInfo", JSON.stringify(data));
       
      } catch (error) {
        toast({
          title: "Error Occured!",
          description: error.response.data.message,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      
      }
    };

  return (
    <div>
      <VStack spacing={"5px"}>
        <FormControl id='first-name' isRequired>
            <FormLabel>   Name
            </FormLabel>
            
            <Input placeholder={"Enter Your Name"}
                onChange={(e)=>setName(e.target.value)}
                />
        </FormControl>
        <FormControl id='email1' isRequired>
            <FormLabel>   Email
            </FormLabel>
            
            <Input placeholder={"Email Address"}
                onChange={(e)=>setEmail(e.target.value)}
                />
        </FormControl>
        <FormControl id='password0' isRequired>
            <FormLabel>  Password
            </FormLabel>
            <InputGroup>
            <Input type={show?"text":"password"} placeholder={"Password"}
                onChange={(e)=>setPassword(e.target.value)}
                />
                <InputRightElement>
                 <Button h="1.75rem" size="sm" onClick={handleClick}>
                    {show?"Hide":"Show"}

                 </Button>
                </InputRightElement>
            </InputGroup>
          
        </FormControl>
        <FormControl id='password1' isRequired>
            <FormLabel> Confirm Password
            </FormLabel>
            <InputGroup>
            <Input type={show?"text":"password"} placeholder={"Password"}
                onChange={(e)=>setConfirmpassword(e.target.value)}
                />
                <InputRightElement>
                 <Button h="1.75rem" size="sm" onClick={handleClick}>
                    {show?"Hide":"Show"}

                 </Button>
                </InputRightElement>
            </InputGroup>
          
        </FormControl>
      
        <Button 
        width={"100%"}
        style={{marginTop:15,backgroundColor:"#AEE7F5"}}
        onClick={submitHandler}
        
        >
          Sign Up
        </Button>
      </VStack>
    </div>
  )
}

export default SignUp
