import { ReactNode } from 'react';
import { Link as ReactLink  } from 'react-router-dom'
import {
  Box,
  Flex,
  Avatar,
  Link,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
  Heading,
  ButtonGroup,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { logout } from '../utils/firebase';
import { useAuthContext } from '../hooks/auth';

const NavLink = ({ children }: { children: ReactNode }) => (
  <Link
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700'),
    }}
    href={'#'}>
    {children}
  </Link>
);

export default function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {user} = useAuthContext();

  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Heading>
            <Link as={ReactLink} to={"/"} _hover={{ textDecoration: "none" }}>
              Hatmer
            </Link>
          </Heading>

          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={7}>
              <Button onClick={toggleColorMode}>
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              </Button>

              {user ? (
                <Menu>
                  <MenuButton
                    as={Button}
                    rounded={"full"}
                    variant={"link"}
                    cursor={"pointer"}
                    minW={0}
                  >
                    <Avatar
                      size={"sm"}
                      src={"https://avatars.dicebear.com/api/male/username.svg"}
                    />
                  </MenuButton>
                  <MenuList alignItems={"center"}>
                    <br />
                    <Center>
                      <Avatar
                        size={"2xl"}
                        src={
                          "https://avatars.dicebear.com/api/male/anonymous.svg"
                        }
                      />
                    </Center>
                    <br />
                    <Center>
                      <p>{user.displayName || "User"}</p>
                    </Center>
                    <br />
                    <MenuDivider />
                    <MenuItem onClick={() => logout()}>Logout</MenuItem>
                  </MenuList>
                </Menu>
              ) : (
                <ButtonGroup>
                  <Button as={Link} href="/signin">
                    Sign In
                  </Button>
                  <Button as={Link} href="/signup">
                    Sign Up
                  </Button>
                </ButtonGroup>
              )}
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
