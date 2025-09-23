import {
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { CharactersList, CharacterDetails } from "./components";

const rootRoute = createRootRoute();

const charactersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: CharactersList,
  validateSearch: (search: Record<string, unknown>) => {
    return {
      page: Number(search.page) || 1,
      name: typeof search.name === "string" ? search.name : "",
      status: typeof search.status === "string" ? search.status : "",
    };
  },
});

const characterDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/characters/$characterId",
  component: CharacterDetails,
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
