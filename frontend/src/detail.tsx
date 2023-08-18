import React from 'react'
import { useState, useEffect } from "react";
import ReactDOM from 'react-dom/client'
import Header from './components/Header.tsx'
import Body from './components/Body.tsx'
import Heading from './components/Heading.tsx';
import ScrollableSectionBox from './components/ScrollableSectionBox.tsx';
import DetailInfoBox from './components/DetailInfoBox.tsx';
import GridBox from './components/GridBox.tsx';
import GridItem from './components/GridItems.tsx';
import GauageChart from './components/GauageChart.tsx';
import TextInfoBox from './components/TextInfoBox.tsx';
import ScrollableRecordInfoBox from './components/ScrollableRecordInfoBox.tsx';
import PagedRecordInfoBox from './components/PagedRecordInfoBox.tsx';
import LineGraph from './components/LineGraph.tsx';
import './index.css'

import { testdata } from './TestData.tsx';
import { Coordinate } from './components/utils/UtilType.ts';

import UNDO_IMG from './assets/undo.png'

import * as Route from './route.ts'

function DetailPage() {
    const [beaconName, setBeaconName] = useState<string>('-')
    const [beaconID, setBeaconID] = useState<string>()
    const [beaconCoord, setBeaconCoord] = useState<Coordinate>()
    const [prob, setProb] = useState<number>(0)

    function fetchBeaconInfo(beaconID: string) {
        const targetBeacon = testdata.find(element => element.id == beaconID);
        console.log(targetBeacon);

        setBeaconName(targetBeacon.name);
        setBeaconID(targetBeacon.id);
        setBeaconCoord({lat: targetBeacon.coordinate.lat, lng: targetBeacon.coordinate.lng});
        setProb(targetBeacon.failure_prob);
        // fetch('/beacon/'+beaconID)
        // .then(res => res.json())
        // .then(targetBeacon => {
        //     setBeaconName(targetBeacon.name);
        //     setBeaconID(targetBeacon.id);
        //     setBeaconCoord({lat: targetBeacon.coordinate.lat, lng: targetBeacon.coordinate.lng});
        //     setProb(targetBeacon.failure_prob);
        // });
    }

    useEffect(()=>{
        const receivedRaw = location.href.split("?")[1].split("#")[0];
        const receivedObject: {[attr: string]: string} = {};
        receivedRaw.split("&").map(aItem => {
            const split = aItem.split("=");
            receivedObject[split[0]] = split[1];
            return;
        });
        // console.log(receivedObject);

        fetchBeaconInfo(receivedObject['id']);
    }, []);

    let test:{id: number, content: string}[] = []
    for (let i = 0; i < 50; i++) {
        test.push(
            {
                id: i,
                content: "blah " + i
            }
        )
    }
    return (
        <div className='h-screen flex flex-col'>
            <Header className='p-4 bg-blue-500 flex items-center select-none'>
                <a href={Route.SEARCH_PAGE_URL} className='bg-white hover:bg-gray-300 rounded p-2'>
                    <img src={UNDO_IMG} alt="탐색 페이지로 돌아가기" width={25}/>
                </a>
            </Header>
            <Body className='px-10 py-6 flex flex-col items-center'>
                <Heading className='bg-blue-500 text-white mr-auto'>기본 정보</Heading>
                <DetailInfoBox className='w-full my-4'></DetailInfoBox>
                <Heading className='bg-blue-500 text-white mr-auto'>장비 구성</Heading>
                <ScrollableRecordInfoBox maxHeight='10rem' className='w-full'></ScrollableRecordInfoBox>
                <PagedRecordInfoBox size={5} records={test} className='w-full'></PagedRecordInfoBox>
                <Heading className='bg-blue-500 text-white mr-auto mb-4'>분석 정보</Heading>
                <GridBox cols={3} className='gap-5 w-full'>
                    <GridItem colSpan={1} className='flex flex-col border-2 rounded-md border-gray-400 p-3 bg-gray-200'>
                        <h2 className='text-center text-3xl font-bold'>고장 확률</h2>
                        <GauageChart threshold={[0, 50, 66, 100]} labels={['낮음', '중간', '높음']} colors={['green', 'yellow', 'red']} value={prob} height='170px' className='mx-auto'/>
                        <p className='text-2xl font-bold text-center'>고장 의심</p>
                    </GridItem>
                    <GridItem colSpan={1} className='flex flex-col border-2 rounded-md border-gray-400 p-3 bg-gray-200'>
                        <h2 className='text-center text-3xl font-bold'>고장 원인</h2>
                        <TextInfoBox className='my-auto'>안녕하세요</TextInfoBox>
                    </GridItem>
                    <GridItem colSpan={1} className='flex flex-col border-2 rounded-md border-gray-400 p-3 bg-gray-200'>
                        <h2 className='text-center text-3xl font-bold'>고장 유형</h2>
                        <TextInfoBox className='my-auto'>꾸준한 이상치 증가</TextInfoBox>
                    </GridItem>
                    <GridItem colSpan={3} className='flex flex-col border-2 rounded-md border-gray-400 p-3 bg-gray-200'>
                        <h2 className='text-center text-3xl font-bold'>고장 확률 추세선</h2>
                        <LineGraph height='300px' className='w-full'></LineGraph>
                    </GridItem>
                </GridBox>
            </Body>
        </div>
    )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <DetailPage></DetailPage>
  </React.StrictMode>,
)
  