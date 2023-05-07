import { FC, ReactNode } from "react"

const PageLayout: FC<{children: ReactNode}> = ({children}) => {
  return (
    <div>
      Layout
      {children}
    </div>
  )
}

export default PageLayout