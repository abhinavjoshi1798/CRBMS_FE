import AddUserUi from "../Components/AddUserUi";
import AddRoomUi from "../Components/AddRoomUi";
import ReportsUi from "../Components/ReportsUi";
import React, { useState, useEffect } from "react";
import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  HStack,
  Icon,
  useColorModeValue,
  Text,
  Drawer,
  DrawerContent,
  useDisclosure,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Image,
} from "@chakra-ui/react";
import { FiTrendingUp, FiMenu, FiChevronDown } from "react-icons/fi";
import { MdOutlineMeetingRoom } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import AllenLogo from "../assets/allenLogo.png";

const MobileNav = ({ onOpen, ...rest }) => {
  
    const [isSticky, setSticky] = useState(false);
  
    useEffect(() => {
      const handleScroll = () => {
        setSticky(window.scrollY > 0);
      };
  
      window.addEventListener("scroll", handleScroll);
  
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, []);
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      position={isSticky ? "fixed" : "relative"}
      top="0"
      left="0"
      right="0"
      zIndex="1000"
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Image
        src={AllenLogo}
        width={"100px"}
        display={{ base: "flex", md: "none" }}
      />

      <HStack spacing={{ base: "0", md: "6" }}>
        <Flex alignItems={"center"}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: "none" }}
            >
              <HStack>
                <Box
                  display={{ base: "flex", md: "flex" }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="xl">Admin</Text>
                </Box>
                <Box display={{ base: "flex", md: "flex" }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue("white", "gray.900")}
              borderColor={useColorModeValue("gray.200", "gray.700")}
            >
              <MenuItem>Sign out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};

const SidebarWithHeader = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [selectedOption, setSelectedOption] = useState("Add User");

  const handleButtonClick = (option) => {
    setSelectedOption(option);
  };

  const renderUI = () => {
    switch (selectedOption) {
      case "Add User":
        return <AddUserUi />;
      case "Add Room":
        return <AddRoomUi />;
      case "Reports":
        return <ReportsUi />;
      default:
        return null;
    }
  };

  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      <Box
        transition="3s ease"
        bg={useColorModeValue("white", "gray.900")}
        borderRight="1px"
        borderRightColor={useColorModeValue("gray.200", "gray.700")}
        w={{ base: "full", md: 60 }}
        pos="fixed"
        h="full"
        display={{ base: "none", md: "block" }}
      >
        <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
          <Image src={AllenLogo} width={"100px"} />
          <CloseButton
            display={{ base: "flex", md: "none" }}
            onClick={onClose}
          />
        </Flex>

        <Box
          as="a"
          style={{ textDecoration: "none" }}
          _focus={{ boxShadow: "none" }}
          onClick={() => handleButtonClick("Add User")}
        >
          <Flex
            align="center"
            p="4"
            mx="4"
            borderRadius="lg"
            role="group"
            cursor="pointer"
            _hover={{
              bg: "cyan.400",
              color: "white",
            }}
          >
            <Icon
              mr="4"
              fontSize="16"
              _groupHover={{
                color: "white",
              }}
              as={FaRegUser}
            />
            Add User
          </Flex>
        </Box>

        <Box
          as="a"
          style={{ textDecoration: "none" }}
          _focus={{ boxShadow: "none" }}
          onClick={() => handleButtonClick("Add Room")}
        >
          <Flex
            align="center"
            p="4"
            mx="4"
            borderRadius="lg"
            role="group"
            cursor="pointer"
            _hover={{
              bg: "cyan.400",
              color: "white",
            }}
          >
            <Icon
              mr="4"
              fontSize="16"
              _groupHover={{
                color: "white",
              }}
              as={MdOutlineMeetingRoom}
            />
            Add Room
          </Flex>
        </Box>

        <Box
          as="a"
          style={{ textDecoration: "none" }}
          _focus={{ boxShadow: "none" }}
          onClick={() => handleButtonClick("Reports")}
        >
          <Flex
            align="center"
            p="4"
            mx="4"
            borderRadius="lg"
            role="group"
            cursor="pointer"
            _hover={{
              bg: "cyan.400",
              color: "white",
            }}
          >
            <Icon
              mr="4"
              fontSize="16"
              _groupHover={{
                color: "white",
              }}
              as={FiTrendingUp}
            />
            Reports
          </Flex>
        </Box>
      </Box>

      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <Box
            transition="3s ease"
            bg={useColorModeValue("white", "gray.900")}
            borderRight="1px"
            borderRightColor={useColorModeValue("gray.200", "gray.700")}
            w={{ base: "full", md: 60 }}
            pos="fixed"
            h="full"
          >
            <Flex
              h="20"
              alignItems="center"
              mx="8"
              justifyContent="space-between"
            >
              <Image src={AllenLogo} width={"100px"} />
              <CloseButton
                display={{ base: "flex", md: "none" }}
                onClick={onClose}
              />
            </Flex>

            <Box
              as="a"
              style={{ textDecoration: "none" }}
              _focus={{ boxShadow: "none" }}
              onClick={() => {
                handleButtonClick("Add User");
                onClose();
              }}
            >
              <Flex
                align="center"
                p="4"
                mx="4"
                borderRadius="lg"
                role="group"
                cursor="pointer"
                _hover={{
                  bg: "cyan.400",
                  color: "white",
                }}
              >
                <Icon
                  mr="4"
                  fontSize="16"
                  _groupHover={{
                    color: "white",
                  }}
                  as={FaRegUser}
                />
                Add User
              </Flex>
            </Box>

            <Box
              as="a"
              style={{ textDecoration: "none" }}
              _focus={{ boxShadow: "none" }}
              onClick={() => {
                handleButtonClick("Add Room");
                onClose();
              }}
            >
              <Flex
                align="center"
                p="4"
                mx="4"
                borderRadius="lg"
                role="group"
                cursor="pointer"
                _hover={{
                  bg: "cyan.400",
                  color: "white",
                }}
              >
                <Icon
                  mr="4"
                  fontSize="16"
                  _groupHover={{
                    color: "white",
                  }}
                  as={MdOutlineMeetingRoom}
                />
                Add Room
              </Flex>
            </Box>

            <Box
              as="a"
              style={{ textDecoration: "none" }}
              _focus={{ boxShadow: "none" }}
              onClick={() => {
                handleButtonClick("Reports");
                onClose();
              }}
            >
              <Flex
                align="center"
                p="4"
                mx="4"
                borderRadius="lg"
                role="group"
                cursor="pointer"
                _hover={{
                  bg: "cyan.400",
                  color: "white",
                }}
              >
                <Icon
                  mr="4"
                  fontSize="16"
                  _groupHover={{
                    color: "white",
                  }}
                  as={FiTrendingUp}
                />
                Reports
              </Flex>
            </Box>
          </Box>
        </DrawerContent>
      </Drawer>

      <MobileNav onOpen={onOpen} />

      <Box ml={{ base: 0, md: 60 }} p="4">
        {renderUI()}
      </Box>
    </Box>
  );
};

export default SidebarWithHeader;
