import type { User } from '@prisma/client';
import useSWR from "swr";
import fetcher from "src/fetcher";

const useMe = () => {
  return useSWR<User>('/api/me', fetcher);
}

export default useMe;