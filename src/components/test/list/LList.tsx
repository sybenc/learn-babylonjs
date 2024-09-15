import {cn} from "@/lib/utils.ts";
import Header from "@/components/test/list/header.tsx";
import Item from "@/components/test/list/item.tsx";

const data = [
    {title: "上料位启动", number1: 1, number2: 2},
    {title: "上料位启动", number1: 1, number2: 2},
    {title: "上料位启动", number1: 1, number2: 2},
    {title: "上料位启动", number1: 1, number2: 2},
    {title: "上料位启动", number1: 1, number2: 2},
    {title: "上料位启动", number1: 1, number2: 2},
    {title: "上料位启动", number1: 1, number2: 2},
    {title: "上料位启动", number1: 1, number2: 2},
    {title: "上料位启动", number1: 1, number2: 2},
    {title: "上料位启动", number1: 1, number2: 2},
]

export default function LList({className, orientation, title}) {
    return (
        <div className={cn(className, 'origin-top-left top-[120px] left-[20px]')}>
            <Header orientation={orientation} title={title}/>
            <div className="p-5">
                {data.map((item, index) => {
                    return (
                        <Item key={index} className="mb-5" data={item}/>
                    )
                })}
            </div>
        </div>
    )
}