// import ReactDOM from "react-dom/client"
// import Loading from "./loading"

let count = 0

// let dom: HTMLElement | null = null
// export const showLoading = () => {
//   if (count === 0) {
//     dom = document.createElement("div")
//     dom.setAttribute("name", "loading")
//     document.body.appendChild(dom)
//     ReactDOM.createRoot(dom).render(<Loading />)
//   }
//   count++
// }
// export const hideLoading = () => {
//   if (count < 0) return
//   count--
//   if (count === 0) document.body.removeChild(dom as HTMLElement)
// }

export const showLoading = () => {
  if (count === 0) {
    const loading = document.querySelector("#loading") as HTMLElement
    loading.style.setProperty("display", "flex")
  }
  count++
}

export const hideLoading = () => {
  if (count < 0) return
  count--
  if (count === 0) {
    const loading = document.querySelector("#loading") as HTMLElement
    loading.style.setProperty("display", "none")
  }
}
