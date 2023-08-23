export interface MyComponentProp {
    className?: string,
    children?: React.ReactNode
}

export type Color = "gray" | "green" | "yellow" | "red"
export type BeaconState = undefined | null | 'unknown' | 'low' | 'medium' | 'high'

export type MapEvent = 'update'
export type MapEventObject = {
    name: MapEvent,
    target: object
}
export type MapEventHandler = (event: MapEventObject) => void
export type MapEventListener = { event: MapEvent, handler: MapEventHandler }

export type Coordinate = {
    lat: number,
    lng: number
}

export type Weather = {
    coord: {
        lon: number,
        lat: number
    },
    weather: {
        id: number,
        main: string,
        description: string,
        icon: string
    }[],
    base: string,
    main: {
        temp: number,
        feels_like: number,
        temp_min: number,
        temp_max: number,
        pressure: number,
        humidity: number,
        sea_level: number,
        grnd_level: number
    },
    name: string,
} | undefined

export type LoginModel = {
    id: string,
    password: string
}

export type SignupModel = {
    id: string,
    email: string,
    password: string,
    repassword: string
}

export type BeaconModel = {
    id: string,
    name: string,
    coordinate: {
        lat: number,
        lng: number
    },
    state: BeaconState,
    failure_prob: number
}

export type Session = {
    id: string
}

export type FeatureModel = {
    feature_id: string,
    feature_installDate: string,
    feature_uninstallDate?: string
}

export type InspectionModel = {
    inspection_id: string,
    inspection_inspector: string,
    inspection_purpose: string,
    inspection_content: string,
    inspection_note: string,
    inspection_startDate: string,
    inspection_endDate: string
}

export type SignalModel = {
    [index: string]: 'true' | 'false' | null | undefined
}

export type BasicInfoModel = {
    beacon_id: string,
    beacon_name: string,
    beacon_type: string,
    beacon_lat: number,
    beacon_lng: number,
    beacon_group: string,
    beacon_purpose: string,
    beacon_office: string,
    beacon_installDate: string,
    beacon_color: string,
    beacon_lightColor: string,
    beacon_lightCharacteristic: string,
    beacon_lightSignalPeriod: string
}

export type BeaconDetailModel = {
    basicInfo: BasicInfoModel,
     featureInfo: {
        rtu?: FeatureModel[],
        solarbattery?: FeatureModel[],
        batterycharge?: FeatureModel[],
        light?: FeatureModel[],
        storagebattery?: FeatureModel[],
        ais?: FeatureModel[],
        racon?: FeatureModel[]
     },
     inspectionInfo: InspectionModel[],
}
