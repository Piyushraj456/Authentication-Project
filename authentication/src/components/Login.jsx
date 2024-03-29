import React from "react";
import { VStack } from "@chakra-ui/react";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { useState } from "react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import axios from "axios";


const Login = () => {
 

  const [show, setShow] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);

 
  const toast = useToast();


  const handleClick = () => setShow(!show);

  const submitHandler = async () => {
    setLoading(true);
    if (!email || !password) {
      toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/user/login",
        { email, password },
        config
      );
     

      toast({
        title: "Login Successful",
        status: "success",
        duration: 4000,
        isClosable: true,
        position: "bottom",
      });
      
     
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
   
      
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };

  return (
    <div>
      <VStack spacing={"5px"}>
        <FormControl id="email2" isRequired>
          <FormLabel> Email</FormLabel>

          <Input
            placeholder={"Email Address"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <FormControl id="password3" isRequired>
          <FormLabel> Password</FormLabel>
          <InputGroup>
            <Input
              type={show ? "text" : "password"}
              placeholder={"Password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <InputRightElement>
              <Button h="1.75rem" size="sm" onClick={handleClick}>
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>

        <Button
          width={"100%"}
          style={{ marginTop: 15, backgroundColor: "#2ff47e" }}
          onClick={submitHandler}
          isLoading={loading}
        >
          Login
        </Button>
        
      </VStack>
    </div>
  );
};

export default Login;
