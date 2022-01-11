import type { User } from '@prisma/client';
import useSWR from "swr";
import fetcher from "src/fetcher";

const useUserData = (id: number) => {
  return useSWR<User>(`/api/user/${id}`, fetcher);
}

export default useUserData;