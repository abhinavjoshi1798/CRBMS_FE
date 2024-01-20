import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Select,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  GridItem,
  Grid,
  HStack,
} from "@chakra-ui/react";

import React, { useEffect, useState } from "react";

const AddRoomUi = () => {
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [floor, setFloor] = useState("");
  const [description, setDescription] = useState("");
  const [seater, setSeater] = useState("");
  const [city, setCity] = useState("");
  const [building, setBuilding] = useState("");
  const [roomsData, setRoomsData] = useState([]);
  const [handleAddRoomBtnClick, setHandleAddRoomBtnClick] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleAddRoom = () => {
    let obj = {
      category,
      name,
      floor,
      description,
      seater,
      city,
      building,
    };
    fetch(`http://localhost:8080/admin/room`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.msg === "New room has been registered") {
          onOpen();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCloseModal = () => {
    onClose();
    setCategory("");
    setName("");
    setFloor("");
    setDescription("");
    setSeater("");
    setCity("");
    setBuilding("");

    setHandleAddRoomBtnClick(!handleAddRoomBtnClick);
  };

  useEffect(() => {
    fetch(`http://localhost:8080/admin/roomsdata`)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setRoomsData(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [handleAddRoomBtnClick]);

  return (
    <>
      <Box width={"100%"}>
        <Flex
          minH={"50vh"}
          align={"center"}
          justify={"center"}
          bg={useColorModeValue("gray.50", "gray.800")}
          width={{ md: "80%", lg: "80%" }}
          margin={"10px auto"}
          marginBottom={"50px"}
          borderRadius={"15px"}
          flexDirection={"column"}
          boxShadow={"rgba(0, 0, 0, 0.24) 0px 3px 8px"}
        >
          <Heading
            margin={"50px auto"}
            marginBottom={"30px"}
            fontFamily={"Poppins"}
          >
            Rooms
          </Heading>
          {roomsData.length !== 0 ? (
            <Grid
              templateColumns={{
                lg: "repeat(3, 1fr)",
                md: "repeat(2, 1fr)",
                sm: "repeat(2, 1fr)",
                base: "repeat(1,1fr)",
              }}
              gap={6}
              margin={"20px auto"}
            >
              {roomsData?.map((el) => {
                return (
                  <GridItem
                    width={"200px"}
                    height={"auto"}
                    borderRadius={"15px"}
                    border={"1px solid gray"}
                    padding={"5px"}
                    paddingLeft={"10px"}
                    overflow={"hidden"}
                    textAlign={"left"}
                    backgroundColor={"#EBF8FF"}
                    fontFamily={"Poppins"}
                  >
                    <HStack alignItems={"self-start"}>
                      <Text fontSize={"md"} as="b" color={"gray.600"}>
                        Name:{" "}
                      </Text>

                      <Text fontSize={"sm"}>{el.name}</Text>
                    </HStack>

                    <HStack alignItems={"self-start"}>
                      <Text fontSize={"md"} as="b" color={"gray.600"}>
                        Category:{" "}
                      </Text>

                      <Text fontSize={"sm"}>{el.category}</Text>
                    </HStack>

                    <HStack alignItems={"self-start"}>
                      <Text fontSize={"md"} as="b" color={"gray.600"}>
                        Floor:{" "}
                      </Text>
                      <Text fontSize={"sm"}>{el.floor}</Text>
                    </HStack>

                    <HStack alignItems={"self-start"}>
                      <Text fontSize={"md"} as="b" color={"gray.600"}>
                        Description:{" "}
                      </Text>
                      <Text fontSize={"sm"}>{el.description}</Text>
                    </HStack>

                    <HStack alignItems={"self-start"}>
                      <Text fontSize={"md"} as="b" color={"gray.600"}>
                        Seater:{" "}
                      </Text>
                      <Text fontSize={"sm"}>{el.seater}</Text>
                    </HStack>
                    <HStack alignItems={"self-start"}>
                      <Text fontSize={"md"} as="b" color={"gray.600"}>
                        City:{" "}
                      </Text>
                      <Text fontSize={"sm"}>{el.city}</Text>
                    </HStack>

                    <HStack alignItems={"self-start"}>
                      <Text fontSize={"md"} as="b" color={"gray.600"}>
                        Building:{" "}
                      </Text>
                      <Text fontSize={"sm"}>{el.building}</Text>
                    </HStack>
                  </GridItem>
                );
              })}
            </Grid>
          ) : (
            <Text fontFamily={"Poppins"}>No Rooms Are Available!!!</Text>
          )}
        </Flex>

        <Flex
          minH={"100vh"}
          align={"center"}
          justify={"center"}
          bg={useColorModeValue("gray.50", "gray.800")}
          width={{ md: "80%", lg: "80%" }}
          margin={"auto"}
          borderRadius={"15px"}
          overflow={"hidden"}
          boxShadow={"rgba(0, 0, 0, 0.24) 0px 3px 8px"}
        >
          <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
            <Stack align={"center"}>
              <Heading
                fontSize={"4xl"}
                textAlign={"center"}
                fontFamily={"Poppins"}
              >
                Add Room
              </Heading>
              <Text fontSize={"lg"} color={"gray.600"} fontFamily={"Poppins"}>
                Fill the below form and click the Add Room Button to add a new
                room
              </Text>
            </Stack>
            <Box
              rounded={"lg"}
              bg={useColorModeValue("white", "gray.700")}
              boxShadow={"lg"}
              p={8}
            >
              <Stack spacing={4}>
                <Box>
                  <FormControl isRequired>
                    <FormLabel>Category</FormLabel>
                    <Select
                      placeholder="Select Room Category"
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      <option value="cr">Conference Room</option>
                      <option value="mr">Meeting Room</option>
                    </Select>
                  </FormControl>
                </Box>

                <FormControl isRequired>
                  <FormLabel>Name</FormLabel>
                  <Input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Floor</FormLabel>
                  <Input
                    type="number"
                    value={floor}
                    onChange={(e) => setFloor(e.target.value)}
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Description</FormLabel>

                  <Input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Seater</FormLabel>

                  <Input
                    type="number"
                    value={seater}
                    onChange={(e) => setSeater(e.target.value)}
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>City</FormLabel>

                  <Input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Building</FormLabel>

                  <Input
                    type="text"
                    value={building}
                    onChange={(e) => setBuilding(e.target.value)}
                  />
                </FormControl>

                <Stack spacing={10} pt={2}>
                  <Button
                    loadingText="Submitting"
                    size="lg"
                    bg={"blue.400"}
                    color={"white"}
                    _hover={{
                      bg: "blue.500",
                    }}
                    onClick={handleAddRoom}
                  >
                    Add Room
                  </Button>
                </Stack>
              </Stack>
            </Box>
          </Stack>
        </Flex>

        <Modal isCentered isOpen={isOpen} onClose={onClose}>
          <ModalOverlay
            bg="none"
            backdropFilter="auto"
            backdropInvert="80%"
            backdropBlur="2px"
          />
          <ModalContent>
            <ModalHeader>New Room is Added</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text>You created a new room!</Text>
            </ModalBody>
            <ModalFooter>
              <Button onClick={handleCloseModal}>Close</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </>
  );
};

export default AddRoomUi;
