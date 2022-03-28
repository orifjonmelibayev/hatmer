import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Text,
  Stack,
  useColorModeValue,
  List,
  Heading,
  HStack,
  Progress,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { useTasks } from "../../hooks";
import { TaskItem } from "./TaskItem";

export default function Card({ todo }: { todo: any }): JSX.Element {
  const { tasks, updateTask } = useTasks(todo.id);

  return (
    <Box py={6}>
      <Box
        maxW={"4xl"}
        w={"full"}
        bg={useColorModeValue("gray.50", "gray.700")}
        boxShadow={"xl"}
        rounded={"md"}
        overflow={"hidden"}
      >
        <Stack
          textAlign={"center"}
          p={6}
          color={useColorModeValue("gray.800", "white")}
          align={"center"}
        >
          <Stack direction={"column"} align={"center"} justify={"center"}>
            <Heading fontSize={"3xl"}>{todo.Name || todo.title}</Heading>
            <Text>{todo.description}</Text>
            <Heading fontSize={"md"}>
              {todo.dueDate &&
                "Due to: " + todo.dueDate.toDate().toLocaleDateString()}
            </Heading>
            <Progress value={50} colorScheme="green" />
            <Menu>
              <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                Actions
              </MenuButton>
              <MenuList>
                <MenuItem>Download</MenuItem>
                <MenuItem>Create a Copy</MenuItem>
                <MenuItem>Mark as Draft</MenuItem>
                <MenuItem>Delete</MenuItem>
                <MenuItem>Attend a Workshop</MenuItem>
              </MenuList>
            </Menu>
          </Stack>
        </Stack>

        <Box
          bg={useColorModeValue("gray.100", "gray.900")}
          pl={4}
          pr={2}
          py={5}
        >
          <List>
            {tasks.map((t) => (
              <TaskItem
                key={t.id}
                task={t}
                onUpdate={(update: any) => updateTask(t.id, update)}
              />
            ))}
          </List>
        </Box>
      </Box>
    </Box>
  );
}
