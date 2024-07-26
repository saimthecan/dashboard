import React, { useState } from "react";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Text,
  useColorModeValue,
  Image,
  Heading,
  InputGroup,
  InputRightElement,
  IconButton,
  Alert,
  AlertTitle,
  useToast,
} from "@chakra-ui/react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../../ReduxToolkit/userSlice";
import { WarningIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import logo from "../logo.png";
import axios from "axios";

export const Login = () => {
  const textColor = useColorModeValue("rgb(56, 56, 56)", "white");
  const textDecorationColor = useColorModeValue("black", "white");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [showError, setShowError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const toast = useToast();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      username: username,
      password: password
    };

    try {
      const response = await axios.post("http://localhost:5000/login", user, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log(response.data); // Yanıtı konsolda yazdır
      if (response.data && response.data.token) {
        console.log("Login successful, token received:", response.data.token);
        dispatch(setUser({
          username: username, // username'i burada manuel ayarlıyoruz
          token: response.data.token
        }));

        localStorage.setItem(
          "user",
          JSON.stringify({
            username: username, // username'i burada manuel ayarlıyoruz
            token: response.data.token,
          })
        );
        toast({
          title: "Successful login.",
          description: `Welcome, ${username}!`,
          status: "success",
          duration: 2000,
          isClosable: true,
          position: "top-right",
        });
        navigate("/overview");
      } else {
        console.log("No token received");
        setShowError(true);
        toast({
          title: "Login failed.",
          description: response.data.message || "Invalid credentials",
          status: "error",
          duration: 2000,
          isClosable: true,
          position: "top-right",
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      setShowError(true);
      toast({
        title: "Login failed.",
        description: error.response ? error.response.data.detail : "An error occurred",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top-right",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Box
          width={["95%", "70%", "60%", "50%", "30%"]}
          marginTop={"-4rem"}
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <RouterLink to="/">
              <Image
                src={logo}
                marginLeft={"auto"}
                marginRight={"auto"}
                width={"12rem"}
                cursor={"pointer"}
              />
            </RouterLink>
            <Heading fontSize={"2xl"}>Log in to your account</Heading>
            <FormControl id="username">
              <FormLabel>Username</FormLabel>
              <Input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <InputGroup size="md">
                <Input
                  pr="4.5rem"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <InputRightElement width="4.5rem">
                  <IconButton
                    h="1.75rem"
                    size="sm"
                    onClick={() => setShowPassword(!showPassword)}
                    icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  />
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                <Checkbox onChange={(e) => setRememberMe(e.target.checked)}>
                  Remember me
                </Checkbox>
                <Link
                  as={RouterLink}
                  to="/login/forgotpassword"
                  color={"blue.400"}
                  fontSize={"1.1rem"}
                >
                  Forgot password?
                </Link>
              </Stack>
              {showError && (
                <Alert
                  status="error"
                  borderRadius="md"
                  mt={2}
                  marginTop="-1.1rem"
                >
                  <WarningIcon boxSize={4} mr={2} />
                  <AlertTitle fontSize="16px">
                    Username or password did not match!
                  </AlertTitle>
                </Alert>
              )}
              <Button
                type="submit"
                bg={"black"}
                color={"white"}
                _hover={{
                  bg: "#44337A",
                }}
                marginTop={"-1rem !important"}
              >
                Log in
              </Button>
              <Stack
                direction="row"
                alignItems="center"
                marginTop="-1.4rem !important"
              >
                <Text fontSize={"16px"} fontWeight={"470"}>
                  Don't have an account yet?
                </Text>
                <Button
                  width={"3.2rem"}
                  fontSize={"14px"}
                  color={textColor}
                  textDecoration={"underline rgba(56, 56, 56, 0.4)"}
                  backgroundColor={"transparent"}
                  outline={"0px"}
                  border={"0px"}
                  borderRadius={"0px"}
                  cursor={"pointer"}
                  userSelect={"none"}
                  appearance={"none"}
                  marginLeft={"0.5rem !important"}
                  marginTop={"0 !important"}
                  href={"/signup"}
                  as={"a"}
                  variant={"link"}
                  _hover={{
                    border: "none",
                    textDecorationThickness: "1.2px",
                    textDecorationColor: textDecorationColor,
                  }}
                >
                  Sign Up
                </Button>
              </Stack>
            </Stack>
          </Stack>
        </Box>
      </Flex>
    </form>
  );
};

export default Login;
