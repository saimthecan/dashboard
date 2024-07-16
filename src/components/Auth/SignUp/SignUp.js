import React, { useState } from 'react';
import {
  Flex, Box, FormControl, FormLabel, Input, Stack, Link, Button, Text,
  useColorModeValue, Image, Heading, InputGroup, InputRightElement,
  Alert, AlertTitle
} from '@chakra-ui/react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { WarningIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import logo from '../logo.png';
import axios from 'axios';

export const Signup = () => {
  const textColor = useColorModeValue("#44337A", "white");
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [showError, setShowError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      username,
      password
    };

    try {
      const response = await axios.post('http://localhost:5000/signup', user);
      console.log(response.data);
      navigate('/login');
    } catch (error) {
      console.error(error);
      if (error.response && error.response.data && error.response.data.message === 'User already exists!') {
        setShowError(true);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>
        <Box
          width={["95%", "70%", "60%", "50%", "30%"]}
          marginTop={'-4rem'}
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            <RouterLink to="/">
              <Image
                src={logo}
                marginLeft={'auto'}
                marginRight={'auto'}
                width={'12rem'}
                cursor={'pointer'}
              />
            </RouterLink>
            <Heading fontSize={'2xl'}>Create your account</Heading>
            <FormControl id="username" isRequired>
              <FormLabel>Username</FormLabel>
              <Input type="text" value={username} onChange={e => setUsername(e.target.value)} />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup marginBottom="1.1rem">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
                <InputRightElement h={'full'}>
                  <Button
                    type="button"
                    variant={'ghost'}
                    onClick={() => setShowPassword(showPassword => !showPassword)}>
                    {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            {showError && (
              <Alert status="error" borderRadius="md" mt={2} marginTop="-1.1rem">
                <WarningIcon boxSize={4} mr={2} />
                <AlertTitle fontSize="16px">The user already exists.</AlertTitle>
              </Alert>
            )}
            <Stack spacing={10} pt={2}>
              <Button
                type="submit"
                size="lg"
                bg={'black'}
                color={'white'}
                _hover={{
                  bg: '#44337A',
                }}>
                Sign up
              </Button>
            </Stack>
            <Stack pt={6} marginTop={'-1.5rem !important'}>
              <Text align={'center'}>
                Already a user? <Link as={RouterLink} to="/login" color={textColor}>Login</Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Flex>
    </form>
  );
}

export default Signup;
