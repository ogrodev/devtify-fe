import { useEffect } from "react";
import { BsLinkedin } from "react-icons/bs";
import { useParams } from "react-router-dom";
import MainBanner from "../../components/Banner/mainBanner";
import GenericButton from "../../components/Buttons/genericButton";
import BuyModal from "../../components/Modal/buyModal";
import useSettings from "../../hooks/useSettings";
import { DATE_TIME_FULL_FORMAT, formatDate } from "../../utils/formatDate";
import { createImageFromInitials } from "../../utils/imageFromText.util";
import styles from "./workshopDetail.module.sass";

export default function WorkshopDetail() {
	const params = useParams();
	const { settings, updateAppSettings, toggleModal } = useSettings();
	const workshopId = params.id;
	const workshop = settings.workshops.find((workshop) => workshop.id === parseInt(workshopId!));
	const userAvatar = workshop?.user?.image
		? workshop?.user?.image
		: createImageFromInitials(40, workshop?.user?.name || "User", "#0473b1");

	const handleConfirmation = () => {
		toggleModal("workshop" + workshop?.id);
	};

	useEffect(() => {
		if (!workshop) {
			updateAppSettings("FETCH_WORKSHOP", workshopId);
		}
	}, [workshopId]);

	return (
		<div className={`position-relative defaultPadding ${styles.container}`}>
			<MainBanner />
			<div className={styles.innerContainer}>
				<div className={styles.header}>
					<span className="accentColor">{workshop?.skills}</span>
					<h2>{workshop?.title}</h2>
					<div className="d-flex align-items-center gap-2 mt-3">
						<div className={styles.avatarContainer}>
							<img src={userAvatar} alt={workshop?.user?.name} />
						</div>
						<span className="secondaryText fw-semibold">
							{workshop?.user?.name}
							{workshop?.user?.job_title ? `/ ${workshop?.user?.job_title}` : ""}
						</span>
					</div>
					<div className="d-flex align-items-center gap-4 mt-4 fw-bold">
						<span>{workshop?.date && formatDate(workshop.date, DATE_TIME_FULL_FORMAT)}</span>
						<GenericButton type="button" onClick={handleConfirmation} variant="blue">
							Confirm attendance
						</GenericButton>
					</div>
					<div className={styles.coverContainer}>
						<img src={workshop?.thumbnail_url} alt={workshop?.title} />
					</div>
					<div className="mt-5">
						<h4 className="my-2">About this workshop</h4>
						<p>{workshop?.description}</p>
					</div>
					<div className="mt-5">
						<h4 className="my-2">Location</h4>
						<div className={styles.locationContainer}>
							<img src="/images/jitsi.png" alt="" />
						</div>
						<p>You will receive your link as soon as you complete your registration</p>
					</div>
					<div className="mt-5">
						<h4 className="my-2">Connect with {workshop?.user.name}</h4>
						<span className="d-flex align-items-center gap-2">
							Follow on
							<a
								href={workshop?.user.linkedin_url}
								target="_blank"
								rel="noreferrer"
								className={styles.linkedin}
							>
								<BsLinkedin size="2em" />{" "}
							</a>
						</span>
					</div>
				</div>
			</div>
			{workshop && (
				<BuyModal
					is_workshop
					id={workshop?.id!}
					name={workshop?.title!}
					price={Math.round(workshop?.price) || 0}
				/>
			)}
		</div>
	);
}
