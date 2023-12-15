import * as yup from "yup";

export type TaskSchemaType = {
  title: string;
  description: string;
};

const taskSchema = yup.object<TaskSchemaType>().shape({
  title: yup.string().required(),
  description: yup.string().required(),
});

export default taskSchema;
