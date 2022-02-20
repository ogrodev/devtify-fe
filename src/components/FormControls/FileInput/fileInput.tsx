import { ChangeEvent, useRef, useState } from "react";
import useNotification from "../../../hooks/useNotification";
import GenericButton from "../../Buttons/genericButton";
import { CloudUploadIcon } from "../../Icons/cloudUpload.icon";
import styles from "./fileInput.module.sass";

interface IProps {
	onSelect: (file: string) => void;
}

export default function FileInput(props: IProps) {
	const [dragging, setDragging] = useState(false);
	const [file, setFile] = useState<File | null>(null);
	const accepts = {
		video: "video/mp4, video/ogx, video/oga, video/ogv, video/ogg, video/webm",
		image: "image/jpeg, image/png, image/gif",
		document: "application/pdf, .doc, .docx, .ppt, .pptx",
	};
	const supportText = {
		video: `* .MP4, .OG*, .WEBM video. 5MB max.`,
		image: `* .JPG, .PNG, .GIF image. 5MB max.`,
		document: `* .PDF, .DOC, .DOCX, .PPT, .PPTX document. 5MB max.`,
	};
	const notify = useNotification();
	const maxSize = 5 * 1024 * 1024;

	const inputFilePicker = useRef<HTMLInputElement>(null);

	const importFile = () => {
		if (!inputFilePicker.current) return;
		inputFilePicker.current.click();
	};

	const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		e.stopPropagation();
		setDragging(true);
	};
	const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		e.stopPropagation();
		setDragging(false);
	};
	const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		e.stopPropagation();
	};

	const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		e.stopPropagation();
		setDragging(false);
		const file = e.dataTransfer.files[0];
		if (file) {
			if (file.size > maxSize) {
				notify("File is too big!", "Error");
				return;
			}
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => {
				props.onSelect(reader.result as string);
			};
			return setFile(file);
		}
		return;
	};

	const handleUpdateFile = async (e: ChangeEvent<HTMLInputElement>) => {
		const file: File = e.target.files![0];
		if (file.size > maxSize) {
			notify("File is too big!", "Error");
			return;
		}
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => {
			props.onSelect(reader.result as string);
		};
		setFile(file);
	};

	return (
		<>
			<div
				className={styles.dropBox + " " + (dragging ? styles.dragging : "")}
				onClick={importFile}
				onDragEnter={handleDragEnter}
				onDragExit={handleDragLeave}
				onDragOver={handleDragOver}
				onDrop={handleDrop}
			>
				<div className={styles.cloudIcon}>
					<CloudUploadIcon size={50} />
				</div>
				<div className={styles.dropBoxText}>
					<span>
						Drag and drop your image here or
						<GenericButton type="button">browse from your device</GenericButton>
					</span>
					<input
						hidden
						type="file"
						accept={accepts["image"]}
						onChange={(e) => handleUpdateFile(e)}
						ref={inputFilePicker}
						className={styles.inputFile}
					/>
				</div>
			</div>
			<div className={styles.supportText}>
				<span>{supportText["image"]}</span>
			</div>
		</>
	);
}
