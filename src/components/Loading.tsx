import { ReloadIcon } from "@radix-ui/react-icons"
import { Button } from "./ui/button"

function Loading() {
  return (
    <div className="h-full w-full flex absolute z-40 justify-center items-center bg-[#808080]">
      <Button>
        <ReloadIcon className="mr-2 animate-spin"/>
        Mohon tunggu...
      </Button>
    </div>
  )
}

export default Loading