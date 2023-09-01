import React from 'react'
import { useState, useEffect } from "react";
import ReactDOM from 'react-dom/client'
import Header from './components/Header.tsx'
import Body from './components/Body.tsx'
import Heading from './components/Heading.tsx';
import GridBox from './components/GridBox.tsx';
import GridItem from './components/GridItems.tsx';
import GauageChart from './components/GauageChart.tsx';
import TextInfoBox from './components/TextInfoBox.tsx';
import LineGraph from './components/LineGraph.tsx';
import TabMenu from './components/TabMenu.tsx';
import TabItem from './components/TabItem.tsx';
import FeatureInfo from './components/FeatureInfo.tsx';
import InspectionInfo from './components/InspectionInfo.tsx';
import SignalInfo from './components/SignalInfo.tsx';
import './index.css'

import { testdata, testdetails } from './TestData.tsx';
import { BeaconDetailModel, Coordinate, SignalModel } from './components/utils/UtilType.ts';

import UNDO_IMG from './assets/undo.png'

import * as Route from './route.ts'
import BasicInfo from './components/BasicInfo.tsx';

function DetailPage() {
    const [beaconID, setBeaconID] = useState<string>();
    const [detailModel, setDetailModel] = useState<BeaconDetailModel>({
        basicInfo: {
            beacon_id: '-',
            beacon_name: '-',
            beacon_type: '-',
            beacon_lat: -1,
            beacon_lng: -1,
            beacon_group: '-',
            beacon_purpose: '-',
            beacon_office: '-',
            beacon_installDate: '-',
            beacon_color: '-',
            beacon_lightColor: '-',
            beacon_lightCharacteristic: '-',
            beacon_lightSignalPeriod: '-'
        },
        featureInfo: {},
        inspectionInfo: [],
    })
    const [signalModel, setSignalModel] = useState<SignalModel>({});
    const [prob, setProb] = useState<number>(0)

    function fetchBeaconInfo(beaconID: string) {
        setProb(30);
        fetch(Route.API_BASE_URL+'/beacon/detailInfo?id='+beaconID, {
            method: 'GET',
        })
        .then(result => {
            return result.json();
        })
        .then(result => {
            setDetailModel(result)
            console.log(result)
        })
    }
    function fetchSignalInfo(beaconID: string) {
        fetch(Route.API_BASE_URL+'/beacon/signalInfo?id='+beaconID, {
            method: 'GET',
        })
        .then(result => {
            return result.json();
        })
        .then(result => {
            setSignalModel(result)
            console.log(result)
        })
    }
    function fetchPredictionInfo(beaconID: string) {
        setProb(30);
        fetch(Route.API_BASE_URL+'/beacon/predictionInfo?id='+beaconID, {
            method: 'GET',
        })
        .then(result => {
            return result.json();
        })
        .then(result => {
            // setDetailModel(result)
            console.log(result)
        })
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
        setBeaconID(receivedObject['id']);
        fetchBeaconInfo(receivedObject['id']);
        fetchSignalInfo(receivedObject['id']);
        fetchPredictionInfo(receivedObject['id']);
    }, []);

    return (
        <div className='h-screen flex flex-col'>
            <Header className='p-4 bg-blue-500 flex items-center select-none'>
                <a href={Route.SEARCH_PAGE_URL} className='bg-white hover:bg-gray-300 rounded p-2'>
                    <img src={UNDO_IMG} alt="탐색 페이지로 돌아가기" width={25}/>
                </a>
            </Header>
            <Body className='px-10 py-6 flex flex-col items-center bg-slate-50'>
                <Heading level={1} className='bg-blue-500 text-white mr-auto mb-2'>기본 정보</Heading>
                <BasicInfo imgURL={Route.API_BASE_URL+'/beacon/image?id='+beaconID} className='w-full' model={detailModel.basicInfo}></BasicInfo>

                <Heading level={1} className='bg-blue-500 text-white mr-auto my-4'>장비 정보</Heading>
                <TabMenu className='w-full'>
                    {
                        Object.keys(detailModel.featureInfo).map((aFeature) => {
                            let itemTitle = '장비'
                            switch (aFeature) {
                                case 'rtu':
                                    itemTitle = 'RTU'
                                    break;
                                case 'solarbattery':
                                    itemTitle = '태양전지'
                                    break;
                                case 'batterycharge':
                                    itemTitle = '충방전조절기'
                                    break;
                                case 'light':
                                    itemTitle = '등명기'
                                    break;
                                case 'storagebattery':
                                    itemTitle = '축전기'
                                    break;
                                case 'ais':
                                    itemTitle = 'AIS'
                                    break;
                                case 'racon':
                                    itemTitle = '레이콘'
                                    break;
                            }
                            if(itemTitle == '장비' || detailModel.featureInfo[aFeature].length == 0) {
                                return
                            }
                            return (
                                <TabItem title={itemTitle} key={aFeature}>
                                    <FeatureInfo model={detailModel.featureInfo[aFeature]} className='p-3 shadow-md bg-slate-100 rounded-md rounded-ss-none border'></FeatureInfo>
                                </TabItem>
                            );
                        })
                    }
                </TabMenu>

                <Heading level={1} className='bg-blue-500 text-white mr-auto my-4'>정비 이력</Heading>
                <InspectionInfo model={detailModel['inspectionInfo']} className='w-full p-3 shadow-md bg-slate-100 rounded-md border'></InspectionInfo>

                <Heading level={1} className='bg-blue-500 text-white mr-auto my-4'>신호 수신 현황</Heading>
                <SignalInfo className='w-full shadow-md rounded-md bg-slate-100 border' model={detailModel['signalInfo']}></SignalInfo>

                <Heading level={1} className='bg-blue-500 text-white mr-auto my-4'>분석 정보</Heading>
                <GridBox cols={3} className='gap-5 w-full'>
                    <GridItem colSpan={1} className='flex flex-col rounded-md shadow-md p-3 bg-slate-100 border'>
                        <h2 className='text-center text-3xl font-bold'>고장 확률</h2>
                        <GauageChart threshold={[0, 50, 66, 100]} labels={['낮음', '중간', '높음']} colors={['green', 'yellow', 'red']} value={prob} height='170px' className='mx-auto'/>
                        <p className='text-2xl font-bold text-center'>고장 의심</p>
                    </GridItem>
                    <GridItem colSpan={1} className='flex flex-col rounded-md shadow-md p-3 bg-slate-100 border'>
                        <h2 className='text-center text-3xl font-bold'>고장 원인</h2>
                        <TextInfoBox className='my-auto'>안녕하세요</TextInfoBox>
                    </GridItem>
                    <GridItem colSpan={1} className='flex flex-col rounded-md shadow-md p-3 bg-slate-100 border'>
                        <h2 className='text-center text-3xl font-bold'>고장 유형</h2>
                        <TextInfoBox className='my-auto'>꾸준한 이상치 증가</TextInfoBox>
                    </GridItem>
                    <GridItem colSpan={3} className='flex flex-col rounded-md shadow-md p-3 bg-slate-100 border'>
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
  