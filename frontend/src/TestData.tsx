import { BeaconDetailModel } from "./components/utils/UtilType"

export const testdata = [
    {
        id: "2017LH068",
        name: "항로표지0",
        coordinate: {
            lat: 37.3784357,
            lng: 126.594079,
        },
        state: "low",
        failure_prob: 20,
    },
    {
        id: "2019LH045",
        name: "항로표지1",
        coordinate: {
            lat: 37.3767306,
            lng: 126.5805178,
        },
        state: "medium",
        failure_prob: 50,
    },
    {
        id: "2010LH067",
        name: "항로표지2",
        coordinate: {
            lat: 37.3639067,
            lng: 126.5882425,
        },
        state: "high",
        failure_prob: 90,
    },
    {
        id: "2015LH086",
        name: "항로표지3",
        coordinate: {
            lat: 37.3825279,
            lng: 126.5803461,
        },
        state: "high",
        failure_prob: 99,
    },
    {
        id: "2010LB170",
        name: "항로표지4",
        coordinate: {
            lat: 37.3822551,
            lng: 126.5607767,
        },
        state: "medium",
        failure_prob: 55,
    },
    {
        id: "2012BM019",
        name: "항로표지5",
        coordinate: {
            lat: 37.33368,
            lng: 126.5467005,
        },
        state: "low",
        failure_prob: 10,
    },
    {
        id: "2011LH067",
        name: "항로표지6",
        coordinate: {
            lat: 37.3983488,
            lng: 126.5206079,
        },
        state: "low",
        failure_prob: 80,
    },
    {
        id: "1981LH023",
        name: "항로표지7",
        coordinate: {
            lat: 37.3568799,
            lng: 126.5418939,
        },
        state: "medium",
        failure_prob: 60,
    },
    {
        id: "2012LH053",
        name: "항로표지8",
        coordinate: {
            lat: 37.3369557,
            lng: 126.5607767,
        },
        state: "high",
        failure_prob: 90,
    },
]

export let testfavorites = [
    "2017LH068",
    "2010LH067",
    "2015LH086",
    "1981LH023",
    "2012LH053",
]

export const testdetails: BeaconDetailModel[] = [
    {
        basicInfo: {
           beacon_id: '2017LH068',
           beacon_name: '속초항신수로방파제등대',
           beacon_type: 'lightBeacon',
           beacon_lat: 37.33368,
           beacon_lng: 126.5418939,
           beacon_group: '국유',
           beacon_purpose: '항해원조',
           beacon_office: '제주해양수산관리단',
           beacon_installDate: '1981-02-02',
           beacon_color: '흑',
           beacon_lightColor: 'W',
           beacon_lightCharacteristic: 'Q',
           beacon_lightSignalPeriod: '10'
        },
        featureInfo: {
            rtu: [
                {
                    feature_id: '2018SCE533',
                    feature_installDate: '2023-08-03',
                },
                {
                    feature_id: '2018SCE532',
                    feature_installDate: '2022-04-24',
                },
                {
                    feature_id: '2018SCE531',
                    feature_installDate: '2023-04-29',
                    feature_uninstallDate: '2023-08-03'
                },
                {
                    feature_id: '2018SCE530',
                    feature_installDate: '2022-03-19',
                    feature_uninstallDate: '2023-04-29'
                },
                {
                    feature_id: '2018SCE529',
                    feature_installDate: '2022-01-30',
                    feature_uninstallDate: '2022-03-19'
                },
                {
                    feature_id: '2018SCE528',
                    feature_installDate: '2021-11-22',
                    feature_uninstallDate: '2022-01-30'
                },
                {
                    feature_id: '2018SCE527',
                    feature_installDate: '2021-02-28',
                    feature_uninstallDate: '2021-11-22'
                },
                {
                    feature_id: '2018SCE526',
                    feature_installDate: '2020-10-20',
                    feature_uninstallDate: '2021-02-28'
                },
                {
                    feature_id: '2018SCE525',
                    feature_installDate: '2019-12-25',
                    feature_uninstallDate: '2020-10-20'
                },
                {
                    feature_id: '2018SCE524',
                    feature_installDate: '2018-08-20',
                    feature_uninstallDate: '2019-12-25'
                },
                {
                    feature_id: '2018SCE523',
                    feature_installDate: '2017-09-18',
                    feature_uninstallDate: '2018-08-20'
                },
                {
                    feature_id: '2018SCE522',
                    feature_installDate: '2016-06-06',
                    feature_uninstallDate: '2017-09-18'
                },
                {
                    feature_id: '2018SCE521',
                    feature_installDate: '2015-04-01',
                    feature_uninstallDate: '2016-06-06'
                },
                {
                    feature_id: '2018SCE520',
                    feature_installDate: '2014-01-01',
                    feature_uninstallDate: '2015-04-01'
                },
                {
                    feature_id: '2018SCE519',
                    feature_installDate: '2013-03-01',
                    feature_uninstallDate: '2014-01-01'
                },
                {
                    feature_id: '2018SCE518',
                    feature_installDate: '2012-10-04',
                    feature_uninstallDate: '2013-03-01'
                },
                {
                    feature_id: '2018SCE517',
                    feature_installDate: '2010-02-03',
                    feature_uninstallDate: '2012-10-04'
                },
            ],
            solarbattery: [
                {
                    feature_id: '2017SB533',
                    feature_installDate: '2023-08-03',
                },
                {
                    feature_id: '2017SB532',
                    feature_installDate: '2022-04-24',
                },
                {
                    feature_id: '2017SB531',
                    feature_installDate: '2023-04-29',
                    feature_uninstallDate: '2023-08-03'
                },
                {
                    feature_id: '2017SB530',
                    feature_installDate: '2022-03-19',
                    feature_uninstallDate: '2023-04-29'
                },
                {
                    feature_id: '2017SB529',
                    feature_installDate: '2022-01-30',
                    feature_uninstallDate: '2022-03-19'
                },
                {
                    feature_id: '2017SB528',
                    feature_installDate: '2021-11-22',
                    feature_uninstallDate: '2022-01-30'
                },
                {
                    feature_id: '2017SB527',
                    feature_installDate: '2021-02-28',
                    feature_uninstallDate: '2021-11-22'
                },
                {
                    feature_id: '2017SB526',
                    feature_installDate: '2020-10-20',
                    feature_uninstallDate: '2021-02-28'
                },
                {
                    feature_id: '2017SB525',
                    feature_installDate: '2019-12-25',
                    feature_uninstallDate: '2020-10-20'
                },
                {
                    feature_id: '2017SB524',
                    feature_installDate: '2018-08-20',
                    feature_uninstallDate: '2019-12-25'
                },
                {
                    feature_id: '2017SB523',
                    feature_installDate: '2017-09-18',
                    feature_uninstallDate: '2018-08-20'
                },
                {
                    feature_id: '2017SB522',
                    feature_installDate: '2016-06-06',
                    feature_uninstallDate: '2017-09-18'
                },
                {
                    feature_id: '2017SB521',
                    feature_installDate: '2015-04-01',
                    feature_uninstallDate: '2016-06-06'
                },
                {
                    feature_id: '2017SB520',
                    feature_installDate: '2014-01-01',
                    feature_uninstallDate: '2015-04-01'
                },
            ],
            batterycharge: [
                {
                    feature_id: '2016SCE533',
                    feature_installDate: '2023-08-03',
                },
                {
                    feature_id: '2016SCE531',
                    feature_installDate: '2023-04-29',
                    feature_uninstallDate: '2023-08-03'
                },
                {
                    feature_id: '2016SCE530',
                    feature_installDate: '2022-03-19',
                    feature_uninstallDate: '2023-04-29'
                },
                {
                    feature_id: '2016SCE529',
                    feature_installDate: '2022-01-30',
                    feature_uninstallDate: '2022-03-19'
                },
                {
                    feature_id: '2016SCE528',
                    feature_installDate: '2021-11-22',
                    feature_uninstallDate: '2022-01-30'
                },
                {
                    feature_id: '2016SCE527',
                    feature_installDate: '2021-02-28',
                    feature_uninstallDate: '2021-11-22'
                },
                {
                    feature_id: '2016SCE526',
                    feature_installDate: '2020-10-20',
                    feature_uninstallDate: '2021-02-28'
                },
                {
                    feature_id: '2016SCE525',
                    feature_installDate: '2019-12-25',
                    feature_uninstallDate: '2020-10-20'
                },
                {
                    feature_id: '2016SCE524',
                    feature_installDate: '2018-08-20',
                    feature_uninstallDate: '2019-12-25'
                },
                {
                    feature_id: '2016SCE523',
                    feature_installDate: '2017-09-18',
                    feature_uninstallDate: '2018-08-20'
                },
            ],
            light: [
                {
                    feature_id: '2015SCE534',
                    feature_installDate: '2022-04-24',
                },
                {
                    feature_id: '2015SCE533',
                    feature_installDate: '2023-08-03',
                },
                {
                    feature_id: '2015SCE532',
                    feature_installDate: '2022-04-24',
                },
                {
                    feature_id: '2015SCE531',
                    feature_installDate: '2023-04-29',
                    feature_uninstallDate: '2023-08-03'
                },
                {
                    feature_id: '2015SCE530',
                    feature_installDate: '2022-03-19',
                    feature_uninstallDate: '2023-04-29'
                },
                {
                    feature_id: '2015SCE529',
                    feature_installDate: '2022-01-30',
                    feature_uninstallDate: '2022-03-19'
                },
                {
                    feature_id: '2015SCE528',
                    feature_installDate: '2021-11-22',
                    feature_uninstallDate: '2022-01-30'
                },
                {
                    feature_id: '2015SCE527',
                    feature_installDate: '2021-02-28',
                    feature_uninstallDate: '2021-11-22'
                },
                {
                    feature_id: '2015SCE526',
                    feature_installDate: '2020-10-20',
                    feature_uninstallDate: '2021-02-28'
                },
                {
                    feature_id: '2015SCE525',
                    feature_installDate: '2019-12-25',
                    feature_uninstallDate: '2020-10-20'
                },
                {
                    feature_id: '2015SCE524',
                    feature_installDate: '2018-08-20',
                    feature_uninstallDate: '2019-12-25'
                },
                {
                    feature_id: '2015SCE523',
                    feature_installDate: '2017-09-18',
                    feature_uninstallDate: '2018-08-20'
                },
                {
                    feature_id: '2015SCE522',
                    feature_installDate: '2016-06-06',
                    feature_uninstallDate: '2017-09-18'
                },
                {
                    feature_id: '2015SCE521',
                    feature_installDate: '2015-04-01',
                    feature_uninstallDate: '2016-06-06'
                },
                {
                    feature_id: '2015SCE520',
                    feature_installDate: '2014-01-01',
                    feature_uninstallDate: '2015-04-01'
                },
                {
                    feature_id: '2015SCE519',
                    feature_installDate: '2013-03-01',
                    feature_uninstallDate: '2014-01-01'
                },
            ],
            storagebattery: [
                {
                    feature_id: '2014SCE533',
                    feature_installDate: '2023-08-03',
                },
                {
                    feature_id: '2014SCE532',
                    feature_installDate: '2022-04-24',
                },
                {
                    feature_id: '2014SCE531',
                    feature_installDate: '2023-04-29',
                    feature_uninstallDate: '2023-08-03'
                },
                {
                    feature_id: '2014SCE530',
                    feature_installDate: '2022-03-19',
                    feature_uninstallDate: '2023-04-29'
                },
                {
                    feature_id: '2014SCE529',
                    feature_installDate: '2022-01-30',
                    feature_uninstallDate: '2022-03-19'
                },
                {
                    feature_id: '2014SCE528',
                    feature_installDate: '2021-11-22',
                    feature_uninstallDate: '2022-01-30'
                },
                {
                    feature_id: '2014SCE527',
                    feature_installDate: '2021-02-28',
                    feature_uninstallDate: '2021-11-22'
                },
                {
                    feature_id: '2014SCE526',
                    feature_installDate: '2020-10-20',
                    feature_uninstallDate: '2021-02-28'
                },
                {
                    feature_id: '2014SCE525',
                    feature_installDate: '2019-12-25',
                    feature_uninstallDate: '2020-10-20'
                },
                {
                    feature_id: '2014SCE524',
                    feature_installDate: '2018-08-20',
                    feature_uninstallDate: '2019-12-25'
                },
                {
                    feature_id: '2014SCE523',
                    feature_installDate: '2017-09-18',
                    feature_uninstallDate: '2018-08-20'
                },
                {
                    feature_id: '2014SCE522',
                    feature_installDate: '2016-06-06',
                    feature_uninstallDate: '2017-09-18'
                },
                {
                    feature_id: '2014SCE521',
                    feature_installDate: '2015-04-01',
                    feature_uninstallDate: '2016-06-06'
                },
                {
                    feature_id: '2014SCE520',
                    feature_installDate: '2014-01-01',
                    feature_uninstallDate: '2015-04-01'
                },
                {
                    feature_id: '2014SCE519',
                    feature_installDate: '2013-03-01',
                    feature_uninstallDate: '2014-01-01'
                },
                {
                    feature_id: '2014SCE518',
                    feature_installDate: '2012-10-04',
                    feature_uninstallDate: '2013-03-01'
                },
                {
                    feature_id: '2014SCE517',
                    feature_installDate: '2010-02-03',
                    feature_uninstallDate: '2012-10-04'
                },
            ],
            ais: [
                {
                    feature_id: '2013SCE533',
                    feature_installDate: '2023-08-03',
                },
                {
                    feature_id: '2013SCE532',
                    feature_installDate: '2022-04-24',
                },
                {
                    feature_id: '2013SCE531',
                    feature_installDate: '2023-04-29',
                    feature_uninstallDate: '2023-08-03'
                },
                {
                    feature_id: '2013SCE530',
                    feature_installDate: '2022-03-19',
                    feature_uninstallDate: '2023-04-29'
                },
                {
                    feature_id: '2013SCE529',
                    feature_installDate: '2022-01-30',
                    feature_uninstallDate: '2022-03-19'
                },
                {
                    feature_id: '2013SCE528',
                    feature_installDate: '2021-11-22',
                    feature_uninstallDate: '2022-01-30'
                },
                {
                    feature_id: '2013SCE527',
                    feature_installDate: '2021-02-28',
                    feature_uninstallDate: '2021-11-22'
                },
                {
                    feature_id: '2013SCE526',
                    feature_installDate: '2020-10-20',
                    feature_uninstallDate: '2021-02-28'
                },
                {
                    feature_id: '2013SCE525',
                    feature_installDate: '2019-12-25',
                    feature_uninstallDate: '2020-10-20'
                },
                {
                    feature_id: '2013SCE524',
                    feature_installDate: '2018-08-20',
                    feature_uninstallDate: '2019-12-25'
                },
                {
                    feature_id: '2013SCE523',
                    feature_installDate: '2017-09-18',
                    feature_uninstallDate: '2018-08-20'
                },
                {
                    feature_id: '2013SCE522',
                    feature_installDate: '2016-06-06',
                    feature_uninstallDate: '2017-09-18'
                },
                {
                    feature_id: '2013SCE521',
                    feature_installDate: '2015-04-01',
                    feature_uninstallDate: '2016-06-06'
                },
            ],
            racon: [
                {
                    feature_id: '2012SCE533',
                    feature_installDate: '2023-08-03',
                },
                {
                    feature_id: '2012SCE532',
                    feature_installDate: '2022-04-24',
                },
                {
                    feature_id: '2012SCE531',
                    feature_installDate: '2023-04-29',
                    feature_uninstallDate: '2023-08-03'
                },
                {
                    feature_id: '2012SCE530',
                    feature_installDate: '2022-03-19',
                    feature_uninstallDate: '2023-04-29'
                },
                {
                    feature_id: '2012SCE529',
                    feature_installDate: '2022-01-30',
                    feature_uninstallDate: '2022-03-19'
                },
                {
                    feature_id: '2012SCE528',
                    feature_installDate: '2021-11-22',
                    feature_uninstallDate: '2022-01-30'
                },
                {
                    feature_id: '2012SCE527',
                    feature_installDate: '2021-02-28',
                    feature_uninstallDate: '2021-11-22'
                },
                {
                    feature_id: '2012SCE526',
                    feature_installDate: '2020-10-20',
                    feature_uninstallDate: '2021-02-28'
                },
                {
                    feature_id: '2012SCE525',
                    feature_installDate: '2019-12-25',
                    feature_uninstallDate: '2020-10-20'
                },
                {
                    feature_id: '2012SCE524',
                    feature_installDate: '2018-08-20',
                    feature_uninstallDate: '2019-12-25'
                },
                {
                    feature_id: '2012SCE523',
                    feature_installDate: '2017-09-18',
                    feature_uninstallDate: '2018-08-20'
                },
                {
                    feature_id: '2012SCE522',
                    feature_installDate: '2016-06-06',
                    feature_uninstallDate: '2017-09-18'
                },
                {
                    feature_id: '2012SCE521',
                    feature_installDate: '2015-04-01',
                    feature_uninstallDate: '2016-06-06'
                },
                {
                    feature_id: '2012SCE520',
                    feature_installDate: '2014-01-01',
                    feature_uninstallDate: '2015-04-01'
                },
                {
                    feature_id: '2012SCE519',
                    feature_installDate: '2013-03-01',
                    feature_uninstallDate: '2014-01-01'
                },
                {
                    feature_id: '2012SCE518',
                    feature_installDate: '2012-10-04',
                    feature_uninstallDate: '2013-03-01'
                },
                {
                    feature_id: '2012SCE517',
                    feature_installDate: '2010-02-03',
                    feature_uninstallDate: '2012-10-04'
                },
            ],
        },
        inspectionInfo: [
            {
                inspection_id: '2023PT1001',
                inspection_inspector: '정믿음',
                inspection_purpose: '테스트',
                inspection_content: '그냥 여러가지를 점검했다',
                inspection_note: '',
                inspection_startDate: '2023-06-14',
                inspection_endDate: '2023-06-16'
            },
            {
                inspection_id: '2023PT1000',
                inspection_inspector: '표힘찬',
                inspection_purpose: '테스트',
                inspection_content: '그냥 여러가지를 점검했다',
                inspection_note: '',
                inspection_startDate: '2023-06-14',
                inspection_endDate: '2023-06-16'
            },
            {
                inspection_id: '2023PT1099',
                inspection_inspector: '백믿음',
                inspection_purpose: '테스트',
                inspection_content: '그냥 여러가지를 점검했다',
                inspection_note: '',
                inspection_startDate: '2023-06-14',
                inspection_endDate: '2023-06-16'
            },
            {
                inspection_id: '2023PT1098',
                inspection_inspector: '서달',
                inspection_purpose: '테스트',
                inspection_content: '그냥 여러가지를 점검했다',
                inspection_note: '',
                inspection_startDate: '2023-06-14',
                inspection_endDate: '2023-06-16'
            },
            {
                inspection_id: '2023PT1097',
                inspection_inspector: '정버들',
                inspection_purpose: '테스트',
                inspection_content: '그냥 여러가지를 점검했다',
                inspection_note: '',
                inspection_startDate: '2023-06-14',
                inspection_endDate: '2023-06-16'
            },
            {
                inspection_id: '2023PT1096',
                inspection_inspector: '문다운',
                inspection_purpose: '테스트',
                inspection_content: '그냥 여러가지를 점검했다',
                inspection_note: '',
                inspection_startDate: '2023-06-14',
                inspection_endDate: '2023-06-16'
            },
            {
                inspection_id: '2023PT1095',
                inspection_inspector: '남우람',
                inspection_purpose: '테스트',
                inspection_content: '그냥 여러가지를 점검했다',
                inspection_note: '',
                inspection_startDate: '2023-06-14',
                inspection_endDate: '2023-06-16'
            },
            {
                inspection_id: '2023PT1094',
                inspection_inspector: '배버들',
                inspection_purpose: '테스트',
                inspection_content: '그냥 여러가지를 점검했다',
                inspection_note: '',
                inspection_startDate: '2023-06-14',
                inspection_endDate: '2023-06-16'
            },
            {
                inspection_id: '2023PT1093',
                inspection_inspector: '성다운',
                inspection_purpose: '테스트',
                inspection_content: '그냥 여러가지를 점검했다',
                inspection_note: '',
                inspection_startDate: '2023-06-14',
                inspection_endDate: '2023-06-16'
            },
            {
                inspection_id: '2023PT1092',
                inspection_inspector: '봉믿음',
                inspection_purpose: '테스트',
                inspection_content: '그냥 여러가지를 점검했다',
                inspection_note: '',
                inspection_startDate: '2023-06-14',
                inspection_endDate: '2023-06-16'
            },
            {
                inspection_id: '2023PT1091',
                inspection_inspector: '노달',
                inspection_purpose: '테스트',
                inspection_content: '그냥 여러가지를 점검했다',
                inspection_note: '',
                inspection_startDate: '2023-06-14',
                inspection_endDate: '2023-06-16'
            },
            {
                inspection_id: '2023PT1090',
                inspection_inspector: '오우람',
                inspection_purpose: '테스트',
                inspection_content: '그냥 여러가지를 점검했다',
                inspection_note: '',
                inspection_startDate: '2023-06-14',
                inspection_endDate: '2023-06-16'
            },
            {
                inspection_id: '2023PT1089',
                inspection_inspector: '황보나라우람',
                inspection_purpose: '테스트',
                inspection_content: '그냥 여러가지를 점검했다',
                inspection_note: '',
                inspection_startDate: '2023-06-14',
                inspection_endDate: '2023-06-16'
            },
            {
                inspection_id: '2023PT1088',
                inspection_inspector: '표빛가람',
                inspection_purpose: '테스트',
                inspection_content: '그냥 여러가지를 점검했다',
                inspection_note: '',
                inspection_startDate: '2023-06-14',
                inspection_endDate: '2023-06-16'
            },
        ],
     }
]