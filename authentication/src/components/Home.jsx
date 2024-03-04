import React from "react";
import { useEffect } from "react";
import { Container,Box,Text } from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import Login from "./Login";
import SignUp from "./Signup"
import "../index.css"
import { useNavigate} from "react-router-dom";
const Home = () => {
const navigate = useNavigate();

useEffect(() => {
  const user = JSON.parse(localStorage.getItem("userInfo"));

  if (user && !user.isAuthenticated) navigate("/Chats");
}, [navigate]);

  return (
    <div className="main">
    <Container maxW="xl" centerContent className="auth-box">
      <Box d="flex" justifyContent="center" p={3}  w="100%"
      m="200px 0 15px 0"
      borderRadius="xl"
      borderWidth="1px" className="login-head"
    

      >
        <Text fontSize="4xl"fontFamily="Poppins"color="white" align={"center"} fontWeight={600}>User Authentication</Text> 
        <Box bg="white" w="100%" p={4} borderRadius="xl" borderWidth="1px" mb={"1em"}>
      <Tabs variant='soft-rounded'>
  <TabList mb={"1em"}>
    <Tab width={"50%"}>Login</Tab>
    <Tab width={"50%"}>Sign Up</Tab>
  </TabList>
  <TabPanels>
    <TabPanel>
      <Login/>
    </TabPanel>
    <TabPanel>
     <SignUp/>
    </TabPanel>
  </TabPanels>
</Tabs>
          
          </Box> 
      </Box>
  
    </Container>
    </div>
  );
};

export default Home;
