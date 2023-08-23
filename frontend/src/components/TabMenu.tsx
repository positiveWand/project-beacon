import React, { useState } from 'react'
import{ MyComponentProp} from './utils/UtilType'
import ClassNames from './utils/ClassNames'

interface Prop extends MyComponentProp {
}

function TabMenu({className, children}: Prop) {
    const [currentTab, setCurrentTab] = useState<number>(0);

    let classes = new ClassNames(className)

    let tabItems:{title:string, content:React.ReactNode}[] = []

    let handleClick = (index: number) => {
        setCurrentTab(index);
    }

    React.Children.forEach(children, element => {
        if (!React.isValidElement(element)) return

        tabItems.push({
            title: element.props.title,
            content: element
        });
    })
    return (
        <div className={classes.toString()}>
            <ul className='flex'>
                {tabItems.map((element, index) => {
                    let tabStyle = new ClassNames('text-white text-xl font-bold p-2 hover:cursor-pointer rounded-t mr-1');

                    if(index == currentTab) {
                        tabStyle.add('bg-blue-500');
                    } else {
                        tabStyle.add('bg-blue-300');
                    }

                    if(index == 0) {

                    } else if(index == tabItems.length - 1) {

                    }
                    return (
                        <li
                            className={tabStyle.toString()}
                            onClick={() => handleClick(index)}
                        >
                            {element.title}
                        </li>
                    );
                })}
            </ul>
            <div>
                {tabItems[currentTab]?.content}
            </div>
        </div>
    )
}

export default TabMenu
