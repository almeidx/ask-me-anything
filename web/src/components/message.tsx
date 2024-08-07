import clsx from "clsx";
import { ArrowUp } from "lucide-react";
import { useState } from "react";

export function Message({
	value,
	amountOfReactions,
	answered = false,
}: MessageProps) {
	const [hasReacted, setHasReacted] = useState(false);

	function handleReact() {
		setHasReacted(true);
	}

	return (
		<li
			className="ml-4 leading-relaxed text-zinc-100 data-[answered=true]:opacity-50"
			data-answered={answered}
		>
			{value}

			<button
				type="button"
				className={clsx(
					"mt-3 flex items-center gap-2 text-sm font-medium disabled:pointer-events-none",
					hasReacted
						? "text-orange-400 hover:text-orange-500"
						: "text-zinc-400 hover:text-zinc-300",
				)}
				onClick={handleReact}
				disabled={answered}
			>
				<ArrowUp className="size-4" />
				Votar na questão ({amountOfReactions})
			</button>
		</li>
	);
}

interface MessageProps {
	value: string;
	amountOfReactions: number;
	answered?: boolean;
}
