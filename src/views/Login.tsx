import { get } from "@/utils/request"
import { useEffect } from "react"

const Login = () => {
  useEffect(() => {
    get("/api/user/login", {}).then(() => {
      console.log(6)
    })
  }, [])
  return <div>login</div>
}

export default Login
