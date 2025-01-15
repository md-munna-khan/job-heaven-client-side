import axios from 'axios'
// Upload image and return image url

export const imageUpload = async imageData => {
  const formData = new FormData()
  formData.append('image', imageData)
  const {data}=await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_KEY}`,
    formData
  )
  return data.data.display_url
}
export const saveUser = async (user) => {
  await axios.post(`${import.meta.env.VITE_API_URL}/newUser`,user)
}