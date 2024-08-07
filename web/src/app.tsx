import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { CreateRoom } from "./pages/create-room.tsx";
import { Room } from "./pages/room.tsx";
import { Toaster } from "sonner";

const router = createBrowserRouter([
	{
		path: "/",
		element: <CreateRoom />,
	},
	{
		path: "/room/:roomId",
		element: <Room />,
	},
]);

export function App() {
	return (
		<>
			<RouterProvider router={router} />
			<Toaster invert richColors />
		</>
	);
}
