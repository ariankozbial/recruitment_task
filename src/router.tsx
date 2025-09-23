import {
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import TestResultsWrapper from "./TestResultsWrapper.tsx";
import CharacterDetailPage from "./CharacterDetailPage.tsx";

const rootRoute = createRootRoute();

const charactersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: TestResultsWrapper,
  validateSearch: (search: Record<string, unknown>) => {
    return {
      page: Number(search.page) || 1,
      name: (search.name as string) ?? "",
      status: (search.status as string) ?? "",
    };
  },
});

const characterDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/characters/$characterId",
  component: CharacterDetailPage,
});

const routeTree = rootRoute.addChildren([
  charactersRoute,
  characterDetailRoute,
]);

export const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
