import { useContext } from "react";
import AppStateContext from "../contexts/app.context";

// eslint-disable-next-line
export default () => {
	const context = useContext(AppStateContext);

	return context;
};
