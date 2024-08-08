import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { getRoomMessages } from "../http/get-room-messages.ts";

export function useMessagesWebSocket(roomId: string) {
	const queryClient = useQueryClient();

	useEffect(() => {
		console.log("useEffect", roomId);

		const ws = new WebSocket(`ws://127.0.0.1:8080/subscribe/${roomId}`);

		ws.onopen = () => {
			console.log("WebSocket connected");
		};

		ws.onclose = () => {
			console.log("WebSocket disconnected");
		};

		ws.onerror = (error) => {
			console.error("WebSocket error", error);
		};

		ws.onmessage = (event) => {
			const data: WebSocketMessage = JSON.parse(event.data);

			switch (data.kind) {
				case "message_created":
					queryClient.setQueryData<Awaited<ReturnType<typeof getRoomMessages>>>(["messages", roomId], (prev) => ({
						messages: [
							...(prev?.messages ?? []),
							{
								id: data.value.id,
								text: data.value.message,
								amountOfReactions: 0,
								answered: false,
							},
						],
					}));

					break;

				case "message_answered":
					queryClient.setQueryData<Awaited<ReturnType<typeof getRoomMessages>>>(["messages", roomId], (prev) => {
						if (!prev) {
							return prev;
						}

						return {
							messages: prev.messages.map((message) => {
								if (message.id === data.value.id) {
									return { ...message, answered: true };
								}

								return message;
							}),
						};
					});

					break;

				case "message_reaction_increased":
				case "message_reaction_decreased":
					queryClient.setQueryData<Awaited<ReturnType<typeof getRoomMessages>>>(["messages", roomId], (prev) => {
						if (!prev) {
							return prev;
						}

						return {
							messages: prev.messages.map((message) => {
								if (message.id === data.value.id) {
									return { ...message, amountOfReactions: data.value.count };
								}

								return message;
							}),
						};
					});

					break;
			}
		};

		return () => {
			ws.close();
		};
	}, [roomId, queryClient]);
}

type WebSocketMessage =
	| { kind: "message_created"; value: { id: string; message: string } }
	| { kind: "message_answered"; value: { id: string } }
	| { kind: "message_reaction_increased" | "message_reaction_decreased"; value: { id: string; count: number } };
