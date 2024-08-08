export async function getRoomMessages({ roomId }: GetRoomMessagesRequest) {
	const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/rooms/${roomId}/messages`);

	const result = (await response.json()) as GetRoomMessagesResponse;

	return {
		messages: result.map((message) => ({
			id: message.ID,
			text: message.Message,
			amountOfReactions: message.ReactionCount,
			answered: message.Answered,
		})),
	};
}

interface GetRoomMessagesRequest {
	roomId: string;
}

type GetRoomMessagesResponse = {
	ID: string;
	RoomID: string;
	Message: string;
	ReactionCount: number;
	Answered: boolean;
}[];
