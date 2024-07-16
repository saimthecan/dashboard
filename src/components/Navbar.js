import React from 'react';
import {
  Flex, Link, Button, useDisclosure, Drawer, DrawerBody, DrawerHeader, DrawerOverlay,
  DrawerContent, DrawerCloseButton, VStack, HStack, IconButton, Icon, useColorModeValue,
  useBreakpointValue, Menu, MenuButton, MenuList, MenuItem, Avatar
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../ReduxToolkit/userSlice'; // Güncel yolu kontrol edin

export const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const isMobile = useBreakpointValue({ base: true, md: false });
  const user = useSelector(state => state.user.user);
  console.log(user, "navbar");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/login');
  };

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
              <Link as={RouterLink} to="/" onClick={onClose}>Home</Link>
              <Link as={RouterLink} to="/overview" onClick={onClose}>Overview</Link>
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
            <MenuButton as={Button} rightIcon={<Icon as={HamburgerIcon} />}>
              <Avatar size="sm" name={user.username} />
            </MenuButton>
            <MenuList>
              <MenuItem as={RouterLink} to="/profile">Profile</MenuItem>
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
