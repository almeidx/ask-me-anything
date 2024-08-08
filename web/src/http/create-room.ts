export async function createRoom({ theme }: CreateRoomRequest) {
	const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/rooms`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ theme }),
	});

	const { id } = (await response.json()) as CreateRoomResponse;

	return { roomId: id };
}

interface CreateRoomRequest {
	theme: string;
}

interface CreateRoomResponse {
	id: string;
}
