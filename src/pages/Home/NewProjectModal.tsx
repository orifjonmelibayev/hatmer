import {
  Box,
  Button,
  Icon,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  ModalCloseButton,
  ModalHeader,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { NewProjectForm } from "./NewProjectForm";
import { AddIcon } from '@chakra-ui/icons'

export const NewProjectModal = () => {
  const {isOpen, onOpen, onClose} = useDisclosure()
  return (
    <>
      <Button onClick={onOpen} leftIcon={<AddIcon />}>
        New
      </Button>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        //size="2xl"
        // `trapFocus` and `blockScrollOnMount` are only switched off so that the preview works properly.
        blockScrollOnMount={false}
        trapFocus={false}
      >
        <ModalOverlay />
        <ModalContent borderRadius="2xl" mx="4">
          <ModalHeader>New Project</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack
              maxW="xs"
              mx="auto"
              py={{ base: "6", md: "8" }}
              spacing={{ base: "6", md: "10" }}
            >
              <NewProjectForm onClose={onClose}/>
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
