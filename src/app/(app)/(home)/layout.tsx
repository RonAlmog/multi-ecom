import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Footer } from "./footer";
import { Navbar } from "./navbar";
import { SearchFilterLoading, SearchFilters } from "./search-filters";
import { getQueryClient, trpc } from "@/trpc/server";
import { Suspense } from "react";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(trpc.categories.getMany.queryOptions());

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<SearchFilterLoading />}>
          <SearchFilters />
        </Suspense>
      </HydrationBoundary>
      <div className="flex-1 bg-[#F4F4F0]">{children}</div>
      <Footer />
    </div>
  );
}
