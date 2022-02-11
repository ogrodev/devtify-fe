import { Controller, useFormContext, Validate } from "react-hook-form";

interface IProps {
	id: string;
	className?: string;
	label?: string;
	placeholder?: string;
	disabled?: boolean;
	isRequired?: boolean;
	isPassword?: boolean;
	validationSchema?: Validate<any>;
	onChange?: Function;
	onBlur?: Function;
	value?: string;
}

export default function TextInput(props: IProps) {
	const { control } = useFormContext();
	return (
		<Controller
			control={control}
			name={props.id}
			rules={{ required: props.isRequired, validate: props.validationSchema }}
			render={({ field: { onChange, onBlur, value, ref }, fieldState, formState }) => (
				<label className="d-flex flex-column align-items-start w-100">
					{props.label}
					<input
						className={props.className ? props.className : "defaultInput"}
						onChange={(e) => {
							onChange(e);
							props.onChange && props.onChange(e);
						}}
						type={props.isPassword ? "password" : "text"}
						onBlur={
							props.onBlur
								? (e) => {
										props.onBlur!(e);
										onBlur();
								  }
								: onBlur
						}
						value={value}
						ref={ref}
						disabled={props.disabled}
						placeholder={props.placeholder}
					/>
				</label>
			)}
		/>
	);
}
