import { Spin } from "antd"
import styles from "./loading.module.less"

type Props = {
  tip?: string
  size?: "small" | "default" | "large"
}

export default function Loading({ tip = "Loading", size = "large" }: Props) {
  return (
    <div className={styles["loading"]}>
      <Spin tip={tip} size={size}>
        <div />
      </Spin>
    </div>
  )
}
