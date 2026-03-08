# React `useEffect` Tutorial (with Events)

This repository demonstrates the use of `useEffect` React hook by controlling a timer.

## What this demo shows

- `useState` for timer value (`seconds`) and running state (`isRunning`)
- `useEffect` to create a `setInterval` while running
- A cleanup function (calls `clearInterval`) to avoid leaking intervals
- How dependency changes (`[isRunning]`) re-run the effect safely

## Prerequisites

Before starting, install:

- **Node.js** 20+ (LTS recommended)
- **npm** (included with Node.js)
- VS Code (or your preferred editor)

Verify installation:

```bash
node --version
npm --version
```

## Step 1: Create the React project

(Vite + TypeScript)

```bash
npm create vite@latest use-effect-demo -- --template react-ts
cd use-effect-demo
npm install
```

## Step 2: Create `UseEffectDemo` component

Add `src/features/use-effect-demo/UseEffectDemo.tsx` file:

```tsx
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
        <div>
            {dimensions.width} &times; {dimensions.height}
        </div>
	);
}
```

### Make note of

- The effect subscribes to the window `resize` event when the component mounts.
- The cleanup function unsubscribes from that event when the component unmounts.
- The empty dependency array (`[]`) means this effect runs once after the initial render.
	- If the dependency array is omitted, the effect runs after every render.

## Step 3: Render the component from the app

```tsx
import './App.css'
import { UseEffectDemo } from './features/document-title'

export default function App() {
	return (
		<>
			<h1>React <code>useEffect</code> Demo</h1>

			<UseEffectDemo/>
		</>
	)
}
```

## Step 4: Done

Run the app:

  ```bash
npm run dev
  ```

Then open the local URL shown by Vite (usually `http://localhost:5173`).
