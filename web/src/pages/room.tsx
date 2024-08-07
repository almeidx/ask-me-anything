import { ArrowRight, Share2 } from "lucide-react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import amaLogo from "../assets/ama-logo.svg";
import { Message } from "../components/message.tsx";

export function Room() {
	const { roomId } = useParams();

	function handleShareRoom() {
		const url = window.location.href;

		if ("share" in navigator && navigator.canShare()) {
			navigator.share({ url });
		} else {
			navigator.clipboard.writeText(url);
		}

		toast.info("The room URL has been copied to your clipboard.");
	}

	return (
		<div className="mx-auto max-w-[640px] flex flex-col gap-6 py-10 px-4">
			<div className="flex items-center px-3 gap-3">
				<img
					src={amaLogo}
					alt="Ask Me Anything logo"
					className="h-5 self-center"
				/>

				<span className="text-sm text-zinc-500 truncate">
					Código da sala: <span className="text-zinc-300">{roomId}</span>
				</span>

				<button
					type="button"
					onClick={handleShareRoom}
					className="ml-auto bg-zinc-800 text-zinc-300 px-3 py-1.5 gap-1.5 flex items-center rounded-lg font-medium text-sm hover:bg-zinc-700 transition-colors"
				>
					Partilhar
					<Share2 className="size-4" />
				</button>
			</div>

			<div className="h-px w-full bg-zinc-900" />

			<form className="flex items-center gap-2 bg-zinc-900 p-2 rounded-xl border border-zinc-800 ring-orange-400 ring-offset-2 ring-offset-zinc-950 focus-within:ring-2">
				<input
					name="question"
					placeholder="Qual é a tua pergunta?"
					autoComplete="off"
					className="flex-1 text-sm bg-transparent mx-2 outline-none text-zinc-100 placeholder:text-zinc-500"
				/>

				<button
					type="submit"
					className="bg-orange-400 text-orange-950 px-3 py-1.5 gap-1.5 flex items-center rounded-lg font-medium text-sm hover:bg-orange-500 transition-colors"
				>
					Criar pergunta
					<ArrowRight className="size-4" />
				</button>
			</form>

			<ol className="list-decimal list-outside px-3 space-y-8">
				<Message
					value="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, nemo."
					amountOfReactions={1}
					answered
				/>

				<Message
					value="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, nemo."
					amountOfReactions={50}
				/>
			</ol>
		</div>
	);
}
