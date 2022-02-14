import { Link } from "react-router-dom";
import { menuRoutes, routeConfig } from "../../routes/routeConfig";
import CollabLogo from "../Logo/collab.logo";
import styles from "./header.module.sass";
import { BiStore, BiSearch } from "react-icons/bi";
import { RiCoinsLine } from "react-icons/ri";
import GenericButton from "../Buttons/genericButton";
import useAuth from "../../hooks/useAuth";
import { createImageFromInitials } from "../../utils/imageFromText.util";
import ReactNiceAvatar from "react-nice-avatar";
import { Popover, PopoverBody, UncontrolledPopover } from "reactstrap";
import { CLEAR_AUTH } from "../../reducers/auth.reducer";
import { useRef, useState } from "react";

export default function Header() {
	const [toggler, setToggler] = useState(false);

	const { authState, updateAuthState } = useAuth();
	const popoverRef = useRef<HTMLDivElement>(null);

	const toggleSearch = () => {};
	const coins = authState?.coins || 0;
	const userAvatar =
		authState?.avatar?.type === "generator"
			? authState.avatar.config
			: authState?.avatar?.src || createImageFromInitials(50, authState?.name || "New User", "#0473b1");

	const handleLogout = () => {
		updateAuthState(CLEAR_AUTH);
	};

	return (
		<div className="d-flex py-4 defaultPadding">
			<div className="col-6 d-flex gap-5">
				<Link to={routeConfig.home.path} className={styles.logoContainer}>
					<CollabLogo version="vertical" size="small" />
				</Link>
				<div className="d-flex align-items-center gap-4">
					{menuRoutes.map((route, index) => (
						<Link key={index} to={route.path} className={styles.menuLink}>
							{route.name}
						</Link>
					))}
				</div>
			</div>
			<div className="col-6 d-flex justify-content-end gap-4">
				<Link to={routeConfig.marketplace.path} className={styles.market}>
					<BiStore size="1.5em" />
					<span>Marketplace</span>
				</Link>
				<GenericButton type="button" onClick={toggleSearch} variant="text">
					<BiSearch size="1.5em" />
				</GenericButton>
				<Link to={routeConfig.wallet.path} className={styles.wallet}>
					<RiCoinsLine size="1.5em" />
					<span>{coins}BDC</span>
				</Link>
				<div className={styles.profile} id="user-menu" ref={popoverRef}>
					<div className="avatar">
						{typeof userAvatar === "string" ? (
							<img src={userAvatar} alt={authState.name || "User Avatar"} />
						) : (
							<ReactNiceAvatar className="avatarGen" {...userAvatar} />
						)}
					</div>
					<span>{authState?.name}</span>
					<span
						className={toggler ? `${styles.afterButton} ${styles.popoverShow}` : styles.afterButton}
					></span>
				</div>
				<Popover
					isOpen={toggler}
					toggle={() => setToggler(!toggler)}
					target={popoverRef}
					trigger="click"
					placement="bottom"
				>
					<PopoverBody>
						<GenericButton type="button" variant="text" onClick={handleLogout}>
							Logout
						</GenericButton>
					</PopoverBody>
				</Popover>
			</div>
		</div>
	);
}
