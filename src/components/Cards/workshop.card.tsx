import styles from "./workshop.card.module.sass";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { createImageFromInitials } from "../../utils/imageFromText.util";
import { IWorkshop } from "../../interfaces/app.interface";

interface IProps extends IWorkshop {
	is_highlight?: boolean;
}

export default function WorkshopCard(props: IProps) {
	const userAvatar = props?.user?.avatar
		? props?.user?.avatar
		: createImageFromInitials(40, props?.user?.name || "User", "#0473b1");
	return (
		<div className={props?.is_highlight ? "col-12" : styles.cardContainer}>
			<div className="d-flex align-items-center flex-wrap gap-1">
				<div className={props?.is_highlight ? "col-6 d-flex justify-content-center" : "col-12"}>
					<div className={styles.imgContainer}>
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
							{props?.liked ? <AiFillHeart size="1em" /> : <AiOutlineHeart size="1em" />} Liked by{" "}
							{props?.likes} people
						</span>
					)}
					<span className={styles.category}>{props?.skills}</span>
					<div>
						{props?.is_highlight ? <h3>{props?.title}</h3> : <h4>{props?.title}</h4>}
						<span className={styles.priceBadge}>{props?.price === 0 && "Free"}</span>
					</div>
					<div className="d-flex align-items-center gap-2">
						<div className={styles.avatarContainer}>
							<img src={userAvatar} alt={props?.user?.name} />
						</div>
						<span className="secondaryText fw-bold">
							{props?.user?.name} / {props?.user?.job_title}
						</span>
					</div>
				</div>
			</div>
		</div>
	);
}
