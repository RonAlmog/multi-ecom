"use client";

// for server pages:
// import { getQueryClient, trpc } from "@/trpc/server";
import { useQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";

export default function Home() {
  // const queryClient = getQueryClient();
  const trpc = useTRPC();

  // for server pages:
  // const categories = await queryClient.fetchQuery(
  //   trpc.categories.getMany.queryOptions()
  // );

  const categories = useQuery(trpc.categories.getMany.queryOptions());
  return (
    <div className="flex flex-col gap-y-4 p-4">
      {categories.isLoading && <div className="text-3xl">Loading...</div>}

      {JSON.stringify(categories.data, null, 2)}
    </div>
  );
}
