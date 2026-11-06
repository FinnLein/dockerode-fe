import { useQuery } from "@tanstack/react-query"
import { getTasks } from "../../api/tasks"

const useTasks = () => {
  return useQuery({
    queryKey: ["tasks"],
    queryFn: () => getTasks(),
  })
}

export { useTasks }
