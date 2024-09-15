export default function Header({
                                   orientation,
                                   className,
                                   title
                               }) {
    return (
        <div className={className}>
            <img height={20} src={`./src/assets/images/header_${orientation}.png`} alt=""/>
            <div className={
                orientation === 'left'
                    ? 'absolute top-1.5 left-4 text-white'
                    : 'absolute top-1.5 right-4 text-white'
            }>{title}</div>
        </div>
    )
}