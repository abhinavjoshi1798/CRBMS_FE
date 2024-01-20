import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Image,
  Checkbox,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@chakra-ui/react";
import Image1 from "../assets/meetingroomimg.jpg";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [employeeId, setEmployeeId] = useState("");
  const [pass, setPass] = useState("");

  const { isOpen, onOpen, onClose } = useDisclosure();

  const navigate = useNavigate();

  const handleLogin = () => {
    let obj = {
      employeeId,
      pass,
    };

    fetch("http://localhost:8080/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.role === "employee") {
          navigate("/employeedashboard");
        } else if (res.role === "admin") {
          navigate("/admindashboard");
        } else if (res.msg === "Wrong Credentials!!!") {
          onOpen();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const OverlayOne = () => (
    <ModalOverlay
      bg="blackAlpha.300"
      backdropFilter="blur(10px) hue-rotate(90deg)"
    />
  );

  return (
    <>
      <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
        display={"flex"}
        flexDirection={{ base: "column", lg: "row" }}
      >
        <Box
          width={"50%"}
          height={"100vh"}
          display={{ lg: "block", base: "none" }}
        >
          <Image
            src={Image1}
            style={{ objectFit: "cover", width: "100%", height: "100%" }}
          />
        </Box>
        <Stack
          spacing={8}
          mx={"auto"}
          maxW={"lg"}
          px={6}
          width={{ lg: "50%", base: "90%" }}
        >
          <Stack align={"center"}>
            <Heading
              fontSize={"3xl"}
              textAlign={"center"}
              color={"#192335"}
              fontFamily={"Roboto"}
            >
              Conference Room Booking And Management System
            </Heading>
            <Text fontSize={"lg"} color={"#6b7385"} fontFamily={"Roboto"}>
              Sign In to book a Conference Room or Meeting Room
            </Text>
          </Stack>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <Stack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Employee ID</FormLabel>
                <Input
                  type="number"
                  onChange={(e) => setEmployeeId(e.target.value)}
                />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"}
                    onChange={(e) => setPass(e.target.value)}
                  />
                  <InputRightElement h={"full"}>
                    <Button
                      variant={"ghost"}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>

              <Stack spacing={10}>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"start"}
                  justify={"space-between"}
                >
                  <Checkbox>Remember me</Checkbox>
                  <Text color={"blue.400"}>Forgot password?</Text>
                </Stack>
              </Stack>

              <Stack spacing={10} pt={2}>
                <Button
                  loadingText="Submitting"
                  size="lg"
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                  onClick={handleLogin}
                >
                  Sign In
                </Button>
              </Stack>
            </Stack>
            <Modal isCentered isOpen={isOpen} onClose={onClose}>
              <OverlayOne />
              <ModalContent>
                <ModalHeader>Wrong Credentials</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Text>Unable to SignIn!</Text>
                </ModalBody>
                <ModalFooter>
                  <Button onClick={onClose}>Close</Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </Box>
        </Stack>
      </Flex>
    </>
  );
};
export default Login;
