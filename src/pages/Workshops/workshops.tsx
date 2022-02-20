import MainBanner from "../../components/Banner/mainBanner";
import GenericButton from "../../components/Buttons/genericButton";
import { FaGraduationCap, FaRegCalendarAlt } from "react-icons/fa";
import styles from "./workshops.module.sass";
import mockedWorkshops from "./MockedData/mockedWorkshops.json";
import mockedHighlight from "./MockedData/mockedHighlight.json";
import WorkshopCard from "../../components/Cards/workshop.card";

export interface IWorkshop {
	id: string;
	title: string;
	category: string;
	price: string;
	author: {
		name: string;
		job_title: string;
		avatar: string;
	};
	image: string;
	liked: boolean;
	likes: number;
}

export default function Workshops() {
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
							<GenericButton type="button" variant="cian" className="text-uppercase">
								<FaRegCalendarAlt size="1em" />
								Create your workshop
							</GenericButton>
						</div>
					</div>
				</div>
			</div>
			<div className={`${styles.highlight} defaultPadding`}>
				<WorkshopCard is_highlight {...mockedHighlight} />
			</div>
			<div className="d-flex mt-3 flex-wrap align-items-stretch justify-content-between gap-4 defaultPadding">
				{mockedWorkshops.slice(0, 3).map((workshop: IWorkshop) => (
					<WorkshopCard key={workshop.id} {...workshop} />
				))}
			</div>
			<div className="my-5 py-5" />
		</>
	);
}
