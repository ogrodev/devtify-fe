import { useContext } from "react";
import AuthStateContext from "../contexts/auth.context";

// eslint-disable-next-line
export default () => {
	const context = useContext(AuthStateContext);

	return context;
};
