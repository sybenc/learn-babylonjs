import {cn} from "@/lib/utils.ts";
import Header from "@/components/test/list/header.tsx";

function SquareItem(){
    return (
        <div className="flex items-center justify-center gap-2 h-[54px] w-[200px] bg-[#41BACD]/20 rounded text-white">
            <img src="./src/assets/images/robot_icon.png" alt="" className="h-[20px]"/>
            <span>你好</span>
        </div>
    )
}
export default function RList({className, orientation, title}) {
    return (
        <div className={cn(className, 'origin-top-right top-[120px] right-[20px]')}>
            <Header orientation={orientation} title={title}/>
            <div className="grid grid-cols-2 gap-4 p-5">
                <SquareItem/>
                <SquareItem/>
                <SquareItem/>
                <SquareItem/>
                <SquareItem/>
                <SquareItem/>
            </div>
        </div>
    )
}