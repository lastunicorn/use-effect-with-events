import { useState, useEffect } from "react";

import "./UseEffectDemo.css";

type WindowDimensions = {
	width: number;
	height: number;
};

export default function UseEffectDemo() {
	const [dimensions, setDimensions] = useState<WindowDimensions>({
		width: window.innerWidth,
		height: window.innerHeight
	});

	useEffect(() => {
		function handleResize() {
			setDimensions({
				width: window.innerWidth,
				height: window.innerHeight
			});
		}

		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	return (
		<div className="Card">
			<h2>Window Size</h2>
			<p className="Card__description">
				Demonstrates <code>useEffect</code> with an <strong>event listener</strong>.<br />
				The listener is added on mount by the effect and removed on unmount via the cleanup function.
			</p>
			<div className="Card__display">
				{dimensions.width} &times; {dimensions.height}
			</div>
			<p className="Card__hint">Try resizing the browser window!</p>
		</div>
	);
}
