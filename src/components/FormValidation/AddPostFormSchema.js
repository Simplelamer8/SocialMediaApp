import * as Yup from "yup";

export const addPostFormSchema = Yup.object().shape({
    newPostText: Yup.string()
    .min(1)
    .required("Post can not be empty")
})