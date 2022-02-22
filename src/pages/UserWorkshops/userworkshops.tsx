import MainBanner from "../../components/Banner/mainBanner";
import styles from "../Workshops/workshops.module.sass";
import WorkshopCard from "../../components/Cards/workshop.card";
import { IWorkshop } from "../../interfaces/app.interface";
import { Spinner } from "reactstrap";
import NewEventModal from "../../components/Modal/newEventModal";
import useAuth from "../../hooks/useAuth";

export default function UserWorkshops() {
	const { authState } = useAuth();

	return (
		<>
			<div className={`position-relative text-start defaultPadding pt-5 ${styles.container}`}>
				<MainBanner />
				<div
					className={`d-flex align-items-center justify-content-between whiteColor mt-lg-5 pt-lg-5 ${styles.position}`}
				>
					<div className="col-6 text-start">
						<h2>Check your own workshops and events</h2>
					</div>
				</div>
			</div>
			<div className="d-flex mt-5 flex-wrap align-items-stretch justify-content-between gap-4 defaultPadding">
				{!!authState?.workshops?.length &&
					authState?.workshops
						?.slice(0, 3)
						?.map((workshop: IWorkshop) => <WorkshopCard key={workshop.id} {...workshop} />)}
				{!authState?.workshops?.length && (
					<div className="col-12">
						<Spinner color="dark">Loading</Spinner>
					</div>
				)}
			</div>
			<div className="d-flex mt-5 flex-wrap align-items-stretch justify-content-between gap-4 defaultPadding">
				{!!authState?.workshops?.length &&
					authState?.workshops
						?.slice(3, 6)
						?.map((workshop: IWorkshop) => <WorkshopCard key={workshop.id} {...workshop} />)}
			</div>
			<div className="my-5 py-5" />
			<NewEventModal />
		</>
	);
}
