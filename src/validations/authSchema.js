import { object, string, ref } from "yup"
export const signupSchema = object().shape({
    email: string().required("Ingrese su email").email("Su email no es válido"),
    password: string()
        .required("Ingrese una contraseña")
        .min(6, "La contraseña debe tener al menos 6 caracteres"),
    confirmPassword: string()
        .oneOf([ref("password"), null], "Las contraseñas deben coincidir")
        .required(),
})