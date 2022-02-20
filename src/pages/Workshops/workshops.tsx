import MainBanner from "../../components/Banner/mainBanner";
import GenericButton from "../../components/Buttons/genericButton";
import { FaGraduationCap, FaRegCalendarAlt } from "react-icons/fa";
import styles from "./workshops.module.sass";
import WorkshopCard from "../../components/Cards/workshop.card";
import { IWorkshop } from "../../interfaces/app.interface";
import { useEffect } from "react";
import useSettings from "../../hooks/useSettings";
import { Spinner } from "reactstrap";
import CTABanner from "../../components/Banner/ctaBanner";
import WorkshopIcon from "../../components/Icons/workshop.icon";
import { TOGGLE_WS_MODAL } from "../../reducers/app.reducer";
import NewEventModal from "../../components/Modal/newEventModal";

export default function Workshops() {
	const { settings, updateAppSettings } = useSettings();

	const handleNewWorkshop = () => {
		updateAppSettings(TOGGLE_WS_MODAL);
	};

	useEffect(() => {
		updateAppSettings("FETCH_WORKSHOPS");
		updateAppSettings("FETCH_HIGHLIGHT_WORKSHOP");
		// eslint-disable-next-line
	}, []);
	return (
		<>
			<div className={`position-relative text-start defaultPadding pt-5 ${styles.container}`}>
				<MainBanner />
				<div className="d-flex align-items-center justify-content-between whiteColor mt-lg-5 pt-lg-5">
					<div className="col-6 text-start">
						<h2>Workshops and events</h2>
						<p>
							Get to know all our workshops given by our own community. Do you have the capacity to make
							your own course? Apply as mentor and create your workshop.
						</p>
					</div>
					<div className="col-6 d-flex align-items-stretch justify-content-end gap-3">
						<div className="col-12 col-lg-auto">
							<GenericButton type="button" variant="blue" className="text-uppercase">
								<FaGraduationCap size="1em" />
								Apply as mentor
							</GenericButton>
						</div>
						<div className="col-12 col-lg-auto">
							<GenericButton
								type="button"
								variant="cian"
								className="text-uppercase"
								onClick={handleNewWorkshop}
							>
								<FaRegCalendarAlt size="1em" />
								Create your workshop
							</GenericButton>
						</div>
					</div>
				</div>
			</div>
			<div className={`${styles.highlight} defaultPadding`}>
				{!!Object.keys(settings?.highlights?.workshop).length ? (
					<WorkshopCard is_highlight {...settings?.highlights?.workshop} />
				) : (
					<Spinner />
				)}
			</div>
			<div className="d-flex mt-5 flex-wrap align-items-stretch justify-content-between gap-4 defaultPadding">
				{!!settings?.workshops.length &&
					settings?.workshops
						?.slice(0, 3)
						?.map((workshop: IWorkshop) => <WorkshopCard key={workshop.id} {...workshop} />)}
				{!settings.workshops.length && (
					<div className="col-12">
						<Spinner color="dark">Loading</Spinner>
					</div>
				)}
			</div>
			<div>
				<CTABanner
					icon={<WorkshopIcon />}
					text="Is teaching your thing? Feel free to create an event for your people."
				>
					<FaRegCalendarAlt size="1em" />
					CREATE EVENT
				</CTABanner>
			</div>
			<div className="d-flex mt-5 flex-wrap align-items-stretch justify-content-between gap-4 defaultPadding">
				{!!settings?.workshops.length &&
					settings?.workshops
						?.slice(3, 6)
						?.map((workshop: IWorkshop) => <WorkshopCard key={workshop.id} {...workshop} />)}
			</div>
			<div className="my-5 py-5" />
			<NewEventModal />
		</>
	);
}
