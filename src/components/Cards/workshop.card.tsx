import styles from "./workshop.card.module.sass";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { createImageFromInitials } from "../../utils/imageFromText.util";
import { IWorkshop } from "../../interfaces/app.interface";
import { useNavigate } from "react-router-dom";
import { routeConfig } from "../../routes/routeConfig";
import useAuth from "../../hooks/useAuth";
import { workshopService } from "../../services/workshop";
import { AxiosError } from "axios";
import useNotification from "../../hooks/useNotification";
import React from "react";

interface IProps extends IWorkshop {
	is_highlight?: boolean;
}

export default function WorkshopCard(props: IProps) {
	const navigate = useNavigate();
	const { authState } = useAuth();
	const notify = useNotification();

	const userAvatar = props?.user?.image
		? props?.user?.image
		: createImageFromInitials(40, props?.user?.name || "User", "#0473b1");

	const like = () => {
		workshopService.likeWorkshop(props.id || 0)
			.catch((err: AxiosError) => {
				notify(err.response?.data.message, "Error");
			});
		return;
	};

	const unlike = () => {
		workshopService.unlikeWorkshop(props.id || 0)
			.catch((err: AxiosError) => {
				notify(err.response?.data.message, "Error");
			});
		return;
	};

	const goToWS = () => {
		if (!props.id) return;
		navigate(routeConfig.workshop.path.replace(":id", props.id.toString()));
	};

	return (
		<div className={props?.is_highlight ? "col-12" : styles.cardContainer}>
			<div className="d-flex align-items-center flex-wrap gap-1">
				<div className={props?.is_highlight ? "col-6 d-flex justify-content-center" : "col-12"}>
					<div className={styles.imgContainer} onClick={goToWS}>
						<img src={props?.thumbnail_url} alt={props?.title} />
					</div>
				</div>
				<div
					className={
						props?.is_highlight
							? "col-auto text-start d-flex flex-column gap-3 ps-4"
							: "col-12 text-start d-flex flex-column gap-1 ps-3"
					}
				>
					{!props?.is_highlight && (
						<span className={styles.like}>
							{props?.user_id !== authState.id && (
								<React.Fragment>
									{props?.likes.find(like => like.id === authState.id) ? <AiFillHeart size="1em" onClick={unlike}/> : <AiOutlineHeart size="1em" onClick={like}/>}
								</React.Fragment>
							)}
							Liked by{" "}{props?.likes.length} people
						</span>
					)}
					<span className={styles.category}>{props?.skills}</span>
					<div className={styles.title} onClick={goToWS}>
						{props?.is_highlight ? <h3>{props?.title}</h3> : <h4>{props?.title}</h4>}
						<span className={styles.priceBadge}>{props?.price === 0 && "Free"}</span>
					</div>
					{props?.user && (
						<div className="d-flex align-items-center gap-2">
							<div className={styles.avatarContainer}>
								<img src={userAvatar} alt={props?.user?.name} />
							</div>
							<span className="secondaryText fw-bold">
								{props?.user?.name} / {props?.user?.job_title}
							</span>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
