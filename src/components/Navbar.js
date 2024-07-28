import React from 'react';
import {
  Flex, Link, Button, useDisclosure, Drawer, DrawerBody, DrawerHeader, DrawerOverlay,
  DrawerContent, DrawerCloseButton, VStack, HStack, IconButton, Icon, useColorModeValue,
  useBreakpointValue, Menu, MenuButton, MenuList, MenuItem, Avatar
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../ReduxToolkit/userSlice';
import { jwtDecode } from 'jwt-decode';

export const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const isMobile = useBreakpointValue({ base: true, md: false });
  const user = useSelector(state => state.user.user);
  const token = useSelector(state => state.user.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/login');
  };

  let isAdmin = false;

  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      isAdmin = decodedToken.is_admin;
    } catch (error) {
      console.error('Error decoding token:', error); // Log decoding error
    }
  }

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1rem"
      bg={useColorModeValue('gray.50', 'gray.900')}
      color={useColorModeValue('gray.600', 'white')}
      borderBottomWidth="1px"
      borderColor={useColorModeValue('gray.200', 'gray.700')}
    >
      <IconButton
        ref={btnRef}
        icon={<Icon as={HamburgerIcon} w={6} h={6} />}
        aria-label="Open Menu"
        onClick={onOpen}
        size="lg"
        variant="outline"
      />

      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Navigation</DrawerHeader>
          <DrawerBody>
            <VStack spacing={4} align="stretch">
              {user && (
                <Link as={RouterLink} to="/overview" onClick={onClose}>Overview</Link>
              )}
                {user && (
                <Link as={RouterLink} to="/products" onClick={onClose}>Products</Link>
              )}
              {isAdmin && (
                <Link as={RouterLink} to="/adminoverview" onClick={onClose}>Admin Overview</Link>
              )}
              {!user && isMobile && (
                <HStack spacing={4}>
                  <Button as={RouterLink} to="/login" onClick={onClose} flex="1">Login</Button>
                  <Button as={RouterLink} to="/signup" onClick={onClose} colorScheme="teal" flex="1">Signup</Button>
                </HStack>
              )}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      <Flex align="center" ml="auto">
        {user ? (
          <Menu>
            <MenuButton as={Button}>
              <Avatar size="sm" name={user[0]} /> {/* Sadece baş harf */}
            </MenuButton>
            <MenuList>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </MenuList>
          </Menu>
        ) : (
          !isMobile && (
            <>
              <Button as={RouterLink} to="/login" variant="outline" mr="4">Login</Button>
              <Button as={RouterLink} to="/signup" colorScheme="teal">Signup</Button>
            </>
          )
        )}
      </Flex>
    </Flex>
  );
};

export default Navbar;
