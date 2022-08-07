import { PopulatedPost } from "@/lib/types";
import * as React from "react";

export default function SearchFilter({
	populatedPosts,
	setFiltered,
}: {
	populatedPosts: PopulatedPost[];
	setFiltered: React.Dispatch<React.SetStateAction<PopulatedPost[]>>;
}) {
	const [value, setValue] = React.useState("");

	React.useEffect(() => {
		const filterTimeout = setTimeout(() => {
			setFiltered(() => {
				const filtered = populatedPosts.filter(
					(post) =>
						post.title.toLowerCase().includes(value.toLowerCase()) ||
						post.excerpt.toLowerCase().includes(value.toLowerCase()) ||
						post.tags.filter((tag) => tag.includes(value.toLowerCase())).length > 0
				);
				return filtered;
			});
		}, 100);

		return () => clearTimeout(filterTimeout);
	}, [populatedPosts, setFiltered, value]);

	return (
		<div className="mb-2 flex flex-col gap-2">
			<input
				type="text"
				value={value}
				onChange={(e) => setValue(e.target.value)}
				placeholder="Search keyword, topics..."
				className="appearance-none px-4 py-2 w-full
					 accent-gray-500 bg-primary/5 focus:bg-primary/5 hover:bg-primary/10 transition-colors duration-200"
			/>
		</div>
	);
}
