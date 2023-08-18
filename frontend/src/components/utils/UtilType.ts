export interface MyComponentProp {
    className?: string,
    children?: React.ReactNode
}

export type Color = "gray" | "green" | "yellow" | "red"
export type BeaconState = undefined | 'low' | 'medium' | 'high'

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

export type BeaconDetailModel = {

}

export type Session = {
    id: string
}