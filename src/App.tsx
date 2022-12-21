import tetrisImage from "./assets/tetris.svg";
import ticTacToeImage from "./assets/tictactoe.svg";

import {
  Outlet,
  RouterProvider,
  Link,
  createReactRouter,
  createRouteConfig,
  lazy,
} from "@tanstack/react-router";
import RouterDevtools from "./components/RouterDevTools";
import { Spinner } from "./components/Spinner";

export const rootRoute = createRouteConfig({
  component: () => (
    <>
      <div>
        <Link to="/">Home</Link> <Link to="/about">About</Link>
      </div>
      <hr />
      <Outlet />
    </>
  ),
});

const indexRoute = rootRoute.createRoute({
  path: "/",
  component: GameList,
});

const aboutRoute = rootRoute.createRoute({
  path: "/about",
  component: About,
});
const tetrisRoute = rootRoute.createRoute({
  // Your elements can be asynchronous, which means you can code-split!
  path: "/games/tetris",
  component: lazy(() => import("./games/Tetris")),
});
const ticTacToeRoute = rootRoute.createRoute({
  path: "/games/tictactoe",
  component: lazy(() => import("./games/TicTacToe")),
});

const routeConfig = rootRoute.addChildren([
  indexRoute,
  aboutRoute,
  tetrisRoute,
  ticTacToeRoute,
]);

const router = createReactRouter({
  routeConfig,
  defaultPendingComponent: () => (
    <div className={`p-2 text-2xl`}>
      <Spinner />
    </div>
  ),
});

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <RouterDevtools router={router} />
    </>
  );
}

type Game = {
  id: number;
  name: string;
  href: "/games/tetris" | "/games/tictactoe";
  imageSrc: string;
  imageAlt: string;
};

const games: Game[] = [
  {
    id: 1,
    name: "Tetris",
    href: "/games/tetris",
    imageSrc: tetrisImage,
    imageAlt: "Tetris Blocks.",
  },
  {
    id: 2,
    name: "TicTacToe",
    href: "/games/tictactoe",
    imageSrc: ticTacToeImage,
    imageAlt: "Tic Tac Toe square",
  },
  // More games...
];

function GameList() {
  return (
    <div className="bg-white dark:bg-slate-700 ">
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Available Games
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {games.map((product) => (
            <div key={product.id} className="group relative">
              <div className=" w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-80">
                <img
                  src={product.imageSrc}
                  alt={product.imageAlt}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <Link to={product.href}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.name}
                    </Link>
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function About() {
  return <div>Hello from About!</div>;
}

export default App;
