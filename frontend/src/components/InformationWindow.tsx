import { useState, useEffect } from "react";
import CROSS_IMG from "/src/assets/searchpage/close.png";
import {MyComponentProp, BeaconModel} from "./utils/UtilType";
import ClassNames from "./utils/ClassNames";
import StarIcon from "./icons/StarIcon";

interface Prop extends MyComponentProp {
    model: BeaconModel
    isFavorite?: boolean
}

export default function InformationWindow({model, isFavorite}: Prop) {
    return (
        <div className="infowindow flex flex-col bg-white border-2 rounded-lg p-3 min-w-[250px]">
            <header className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                    <h2 className="text-3xl font-bold mr-1">{model.name}</h2>
                    {
                        isFavorite != undefined ?
                        <>
                            <a href="#" hidden={!isFavorite} className="star-filled">
                                <StarIcon width="35px" height="35px" filled={true}/>
                            </a>
                            <a href="#" hidden={isFavorite} className="star-unfilled">
                                <StarIcon width="35px" height="35px" filled={false}/>
                            </a>
                        </>
                        : null
                    }
                </div>
                <a href="#" className="close-button">
                    <img src={CROSS_IMG} alt="닫기 버튼" width={25} height={25}/>
                </a>
            </header>
            <table className="border-collapse my-3">
                <tr className="border-b border-b-gray-300">
                    <th scope="row" className='py-2'>식별번호</th>
                    <td>{model.id}</td>
                </tr>
                <tr className="border-b border-b-gray-300">
                    <th scope="row"  className='py-2'>위도</th>
                    <td>{model.coordinate.lat}</td>
                </tr>
                <tr className="border-b border-b-gray-300">
                    <th scope="row"  className='py-2'>경도</th>
                    <td>{model.coordinate.lng}</td>
                </tr>
                <tr className="border-b border-b-gray-300">
                    <th scope="row"  className='py-2'>고장 확률</th>
                    <td>{model.failure_prob}</td>
                </tr>
            </table>
            <button type="button" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">상세보기 &gt;</button>
        </div>
    );
}