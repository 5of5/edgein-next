import React from "react";

type Props = {
    className?: string;
    menuItems?: string[],
    onTabClick?: (index: number) => void,
    selectedTab?: number
}

export const ElemTabBar: React.FC<Props> = ({
    className,
    menuItems,
    onTabClick,
    selectedTab
}) => {
    //console.log("menus =", menuItems)
    return (
        <div>
            <hr className="mt-5 mb-4"></hr>
            {
                menuItems && menuItems.map((item, index) => {
                    return (
                        <button onClick={() => onTabClick(index)} className={`ml-4  cursor-pointer decoration-4 font-bold ${selectedTab === index ? 'text-primary-500 ' : 'text-dark-500'}`}>
                            {item}
                        </button>
                    )
                })
            }

            {/* <span className=" ml-4 font-bold cursor-pointer">Team</span>
            <span className=" ml-4 font-bold cursor-pointer">Investments</span> */}
            <hr className="mt-4"></hr>
        </div>

    )
}