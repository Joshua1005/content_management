import { initEdgeStore } from "@edgestore/server";
import { initEdgeStoreClient } from "@edgestore/server/core";
import { createEdgeStoreNextHandler } from "@edgestore/server/adapters/next/app";

type EdgeStoreRouter = typeof edgeStoreRouter;

const edgeStore = initEdgeStore.create();

const edgeStoreRouter = edgeStore.router({
  images: edgeStore.imageBucket().beforeDelete(() => {
    return true;
  }),
});

const handler = createEdgeStoreNextHandler({ router: edgeStoreRouter });

const backendClient = initEdgeStoreClient({ router: edgeStoreRouter });

export type { EdgeStoreRouter };
export { handler, backendClient };
