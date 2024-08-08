import { useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useMessagesWebSocket } from "../hooks/use-messages-web-socket.ts";
import { getRoomMessages } from "../http/get-room-messages.ts";
import { Message } from "./message.tsx";

export function Messages() {
	const { roomId } = useParams();

	if (!roomId) {
		throw new Error("Messages must be rendered within a room page");
	}

	const {
		data: { messages },
	} = useSuspenseQuery({
		queryFn: () => getRoomMessages({ roomId }),
		queryKey: ["messages", roomId],
	});

	useMessagesWebSocket(roomId);

	const sortedMessages = messages.sort((a, b) => b.amountOfReactions - a.amountOfReactions);

	return (
		<ol className="list-decimal list-outside px-3 space-y-8">
			{sortedMessages.map((message) => (
				<Message
					key={message.id}
					id={message.id}
					value={message.text}
					amountOfReactions={message.amountOfReactions}
					answered={message.answered}
				/>
			))}
		</ol>
	);
}
