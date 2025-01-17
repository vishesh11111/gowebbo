
const InputUi = ({ onChange, value, type, placeholder, keyName, title, required, disabled, register, message, errors }, props) => {
    return <div className={title ? "flex flex-col lg:flex-row gap-x-5 gap-y-2 lg:gap-y-0 justify-between lg:items-center min-h-[3rem]" : "min-h-[3rem]"}>
        {title && <p className="text-[1.8rem] lg:text-[2rem]">{title}:</p>}
        <input
            required={required ?? false}
            disabled={disabled}
            placeholder={placeholder || ""}
            type={type}
            onChange={onChange}
            {...props}
            value={value}
            // {...register("date", { required: message || "" })}
            className="border w-full lg:w-[45%] 2xl:w-[60%] h-full min-h-[3rem] min-w-[10rem] px-2 rounded-lg text-[1.5rem] py-2 lg:text-[1.6rem]"
        />
        {/* {errors[keyName] && <span className="error-message">{errors[keyName].message}</span>} */}
    </div>
}

export default InputUi;

export const InputUiForm = ({ focus, type, value, onChange, placeholder, keyName, title, required, disabled, register, message, errors }, props) => {
    return (
        <div>
            <input
                autoFocus={focus}
                required={required ?? false}
                disabled={disabled}
                placeholder={placeholder || ""}
                type={type}
                value={value}
                onChange={onChange}
                {...props}
                // {...register("date", { required: message || "" })}
                className="border w-full h-full min-h-[4rem] md:min-h-[5rem] min-w-[10rem] px-5 rounded-lg text-[1.4rem] sm:text-[1.6rem] py-2 lg:text-[1.8rem]"
            />
            {/* {errors[keyName] && <span className="error-message">{errors[keyName].message}</span>} */}
        </div>
    )
}