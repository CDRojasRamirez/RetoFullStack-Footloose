import axios from "axios"

export const sendEmail = async (id) => {
   const { data } = await axios(`http://localhost:8000/${id}`).catch(err => console.log(err))
   console.log(data);
   return data;
}