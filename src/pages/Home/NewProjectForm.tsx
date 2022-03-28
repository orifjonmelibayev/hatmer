import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Spacer,
  Stack,
  Switch,
  FormErrorMessage,
  Checkbox,
  Box,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";

import { useForm } from "react-hook-form";
import { useProjects } from "../../hooks";
import templates from '../../services/data/templates.json'

export const NewProjectForm = ({onClose}:{onClose:Function}) => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();
  const {projects, addProject} = useProjects()

  function onSubmit(values: any) {
    const template = templates.find(t => t.name === values.template)
    if(!template) return;

    const project = {
      name: template.name,
      description: template.description,
      createdBy: 'User',
      tasks: template.tasks,
      ...values
    }
    return addProject(project).then(onClose())
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box bg={useBreakpointValue({ base: "transparent", sm: "bg-surface" })}>
        <Stack spacing="6">
          <Stack spacing="5">
            <FormErrorMessage>
              {errors.name && errors.name.message}
            </FormErrorMessage>
            <FormControl id="template">
              <FormLabel>Select template</FormLabel>
              <Select placeholder="Select template" {...register("template")}>
                {templates.map((t) => (
                  <option value={t.name} key={t.name}>
                    {t.title}
                  </option>
                ))}
                {/* <option value="quran">Quran</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option> */}
              </Select>
            </FormControl>
            <FormControl id="title">
              <FormLabel>Enter title</FormLabel>
              <Input
                type="text"
                placeholder="Enter title"
                {...register("title")}
                focusBorderColor={useColorModeValue("blue.500", "blue.200")}
              />
            </FormControl>
            <FormControl id="dueDate">
              <FormLabel>Due to</FormLabel>
              <Input
                type="date"
                {...register("dueDate")}
                focusBorderColor={useColorModeValue("blue.500", "blue.200")}
              />
            </FormControl>
          </Stack>
          <Checkbox id="is-private" {...register("isPrivate")}>
            This is private project
          </Checkbox>
          <Button
            mt={4}
            colorScheme="blue"
            isLoading={isSubmitting}
            type="submit"
          >
            Submit
          </Button>
        </Stack>
      </Box>
    </form>
  );
};

// export default function HookForm() {

//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <FormControl isInvalid={errors.name}>
//         <FormLabel htmlFor="name">First name</FormLabel>
//         <Input
//           id="name"
//           placeholder="name"
//           {...register("name", {
//             required: "This is required",
//             minLength: { value: 4, message: "Minimum length should be 4" },
//           })}
//         />
//         <FormErrorMessage>
//           {errors.name && errors.name.message}
//         </FormErrorMessage>
//       </FormControl>
//       <Button mt={4} colorScheme="teal" isLoading={isSubmitting} type="submit">
//         Submit
//       </Button>
//     </form>
//   );
// }
