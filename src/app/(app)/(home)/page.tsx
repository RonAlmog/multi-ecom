"use client";

// for server pages:
// import { getQueryClient, trpc } from "@/trpc/server";
// import { useQuery } from "@tanstack/react-query";
// import { useTRPC } from "@/trpc/client";

export default function Home() {
  // const queryClient = getQueryClient();
  //

  // for server pages:
  // const categories = await queryClient.fetchQuery(
  //   trpc.categories.getMany.queryOptions()
  // );

  return <div className="flex flex-col gap-y-4 p-4">Home page</div>;
}
