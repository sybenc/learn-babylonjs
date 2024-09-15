import {cn} from "@/lib/utils.ts";

export default function Item({
                                 className,
                                 data
                             }) {
    return (
        <div className={cn('relative', className)}
             style={{
                 backgroundImage: ` url("/src/assets/images/pulse_bg.png")`,
                 width: '399px',
                 height: '54px',
                 backgroundSize: "contain",
                 backgroundPosition: "center",
                 backgroundRepeat: "no-repeat"
             }}>
            <div className="absolute h-full left-16 top-4 text-white">
                {data.title}
            </div>
            <div style={{
                position: "absolute",
                display: "flex",
                justifyContent: "space-between",
                color: "white",
                left: "210px",
                top: "1rem",
                width: "150px"
            }}>
                <span>{data.number1}</span>
                <span>{data.number2 + '(脉冲/s)'}</span>
            </div>
        </div>
    )
}