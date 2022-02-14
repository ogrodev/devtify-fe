import { useEffect, useRef } from "react";

import lottie from "lottie-web";

interface LottieProps {
	animationData: any;
	width: number;
	height: number;
	speed?: number;
}

export const Lottie = ({ animationData, width, height, speed }: LottieProps) => {
	const element = useRef<HTMLDivElement>(null);
	const lottieInstance = useRef<any>();

	useEffect(() => {
		if (element.current) {
			lottieInstance.current = lottie.loadAnimation({
				animationData,
				container: element.current,
				renderer: "svg",
			});
			lottieInstance.current.setSpeed(speed || 1);
		}
	}, [animationData]);

	return <div style={{ width, height }} ref={element}></div>;
};
