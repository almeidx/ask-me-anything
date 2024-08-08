import clsx from "clsx";
import { ArrowUp } from "lucide-react";
import { useState } from "react";
import { createMessageReaction } from "../http/create-message-reaction.ts";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { removeMessageReaction } from "../http/remove-message-reaction.ts";

export function Message({ id, value, amountOfReactions, answered = false }: MessageProps) {
	const { roomId } = useParams();

	if (!roomId) {
		throw new Error("Message must be rendered within a room page");
	}

	const [hasReacted, setHasReacted] = useState(false);

	async function addReactionAction() {
		try {
			await createMessageReaction({ messageId: id, roomId: roomId! });
		} catch {
			toast.error("Ocorreu um erro ao votar na questão.");
		}

		setHasReacted(true);
	}

	async function removeReactionAction() {
		try {
			await removeMessageReaction({ messageId: id, roomId: roomId! });
		} catch {
			toast.error("Ocorreu um erro ao remover o voto na questão.");
		}

		setHasReacted(false);
	}

	return (
		<li className="ml-4 leading-relaxed text-zinc-100 data-[answered=true]:opacity-50" data-answered={answered}>
			{value}

			<button
				type="button"
				className={clsx(
					"mt-3 flex items-center gap-2 text-sm font-medium disabled:pointer-events-none",
					hasReacted ? "text-orange-400 hover:text-orange-500" : "text-zinc-400 hover:text-zinc-300",
				)}
				onClick={hasReacted ? removeReactionAction : addReactionAction}
				disabled={answered}
			>
				<ArrowUp className="size-4" />
				Votar na questão ({amountOfReactions})
			</button>
		</li>
	);
}

interface MessageProps {
	id: string;
	value: string;
	amountOfReactions: number;
	answered?: boolean;
}
