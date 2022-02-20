import styles from "./workshop.card.module.sass";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { createImageFromInitials, getRandomColor } from "../../utils/imageFromText.util";

interface IProps {
	id: string;
	title: string;
	category: string;
	price: string;
	author: { name: string; job_title: string; avatar: string };
	image: string;
	liked: boolean;
	likes: number;
	is_highlight?: boolean;
}

export default function WorkshopCard(props: IProps) {
	const userAvatar = props.author.avatar
		? props.author.avatar
		: createImageFromInitials(40, props.author.name, "#0473b1");
	return (
		<div className={props.is_highlight ? "col-12" : "col-12 col-lg-4"}>
			<div className="d-flex align-items-center flex-wrap gap-1">
				<div className={props.is_highlight ? "col-6 d-flex justify-content-center" : "col-12"}>
					<div className={styles.imgContainer}>
						<img src={props.image} alt={props.title} />
					</div>
				</div>
				<div
					className={
						props.is_highlight
							? "col-auto text-start d-flex flex-column gap-3 ps-4"
							: "col-12 text-start d-flex flex-column gap-1 ps-3"
					}
				>
					{!props.is_highlight && (
						<span>
							{props.liked ? <AiFillHeart size="1em" /> : <AiOutlineHeart size="1em" />} Liked by{" "}
							{props.likes} people
						</span>
					)}
					<span className={styles.category}>{props.category}</span>
					<div>
						{props.is_highlight ? <h3>{props.title}</h3> : <h4>{props.title}</h4>}
						<span className={styles.priceBadge}>{parseInt(props.price) === 0 && "Free"}</span>
					</div>
					<div className="d-flex align-items-center gap-2">
						<div className={styles.avatarContainer}>
							<img src={userAvatar} alt={props.author.name} />
						</div>
						<span className="secondaryText fw-bold">
							{props.author.name} / {props.author.job_title}
						</span>
					</div>
				</div>
			</div>
		</div>
	);
}
