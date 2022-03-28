import {
  Checkbox,
  FlexProps,
  Spacer,
  useColorModeValue,
} from "@chakra-ui/react";
import { Property } from "../Card/Property";


interface TaskDetailProp extends FlexProps {
  path: string;
  task?: any;
  onUpdateTask: Function;
}

function SubTaskDetail(props: TaskDetailProp) {
  const { task, onUpdateTask } = props;
  return (
    <Property
      label={task.title}
      _even={{ bg: useColorModeValue("gray.50", "gray.600") }}
    >
      <Checkbox
        key={task.id + ".assigned"}
        isDisabled={!!task.assignedTo && task.assignedTo !== "User"}
        isChecked={!!task.assignedTo}
        onChange={(e) =>
          onUpdateTask({ assignedTo: e.target.checked ? "User" : "" })
        }
      >
        Assigned
      </Checkbox>
      <Spacer></Spacer>
      <Checkbox
        key={task.id + ".completed"}
        isDisabled={!task.assignedTo || task.assignedTo !== "User"}
        isChecked={task.isComplete}
        onChange={(e) => onUpdateTask({ isComplete: e.target.checked })}
      >
        Completed
      </Checkbox>
    </Property>
  );
}

export function TaskDetail(props: TaskDetailProp) {
  // const [task, setTask] = useState(props.path);
  // if (task.subtasks)
  //   return <Property label={task.title}>
  //     <List>
  //       <ListItem>
  //         {task.subtasks.map( subtask => <SubTaskDetail task={subtask} key={subtask.id}/>)}
  //       </ListItem>
  //     </List>
  //   </Property>

  return (
    <SubTaskDetail
      {...props}
      _even={{ bg: useColorModeValue("gray.50", "gray.600") }}
    />
  );
}
