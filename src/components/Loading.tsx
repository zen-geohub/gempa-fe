import { ReloadIcon } from "@radix-ui/react-icons"
import { Card } from "./ui/card"

function Loading() {
  return (
    <div className="h-full w-full flex absolute z-40 justify-center items-center bg-[#80808068]">
      <Card className="select-none flex justify-center items-center gap-2 p-2 rounded">
        <ReloadIcon className="mr-2 animate-spin"/>
        Mohon tunggu...
      </Card>
    </div>
  )
}

export default Loading