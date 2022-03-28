import {
  Box,
  Text, Button,
  ListItem, ListIcon,
  Flex,
  Spacer,
  Icon,
  Divider,
  IconButton,
  Center,
  Tooltip
} from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import { FaUserCheck, FaCheck, FaRegCircle } from "react-icons/fa";
import { useState } from "react";
import { useAuthContext } from "../../hooks/auth";

export function TaskItem({
  task, onUpdate,
}: {
  task: any;
  onUpdate: Function;
}) {
  const {user} = useAuthContext();
  const canAssign = user && (task.assignedTo === user.uid || !!task.assignedTo === false)

  return (
    <ListItem py={2}>
      <Flex>
        <Center>
          <Text>{task.title}</Text>
        </Center>
        <Spacer />
        <Tooltip label="Assign to yourself" isDisabled={!canAssign}>
          <IconButton
            mx={2}
            isRound
            variant={task.assignedTo ? "solid" : "ghost"}
            colorScheme={task.assignedTo ? "telegram" : "gray"}
            aria-label="Assign to yourself"
            icon={<Icon as={FaUserCheck} />}
            disabled={!canAssign}
            onClick={() => {
              if(task.assignedTo === null || task.assignedTo === '') {
                onUpdate({ assignedTo: user.uid });
              } else {
                onUpdate({ assignedTo: null });
              }
            }}
          />
        </Tooltip>
        <Tooltip label="Mark as Completed">
          <IconButton
            isRound
            variant={task.isComplete ? "solid" : "ghost"}
            colorScheme={task.isComplete ? "green" : "gray"}
            aria-label="Mark as Completed"
            disabled={user === null || task.assignedTo !== user.uid}
            icon={<Icon as={FaCheck} />}
            onClick={() => {
              if(task.isComplete) {
                onUpdate({ isComplete: false });
              } else {
                onUpdate({ isComplete: true });
              }
            }}
          />
        </Tooltip>
      </Flex>
    </ListItem>
  );
}
