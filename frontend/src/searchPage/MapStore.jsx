class MapStore {
    #center;
    #eventListeners;

    constructor() {
        this.#center = {
            lat: -1,
            lng: -1,
        };
        this.#eventListeners = [];
    }

    getCenter() {
        return this.#center;
    }
    setCenter(newCenter) {
        if(this.#center.lat == newCenter.lat && this.#center.lng == newCenter.lng) {
            return;
        }

        this.#center = {
            lat: newCenter.lat,
            lng: newCenter.lng,
        }

        this.handleEvent("centerchange", {});
    }

    handleEvent(event, object) {
        for(let {targetEvent, handler} of this.#eventListeners) {
            if(targetEvent == event) {
                handler(object);
            }
        }
    }

    addEventListener(targetEvent, aHandler) {
        let newListener = {
            targetEvent: targetEvent,
            handler: aHandler
        }
        this.#eventListeners.push(newListener)

        return newListener;
    }

    removeEventListener(aListener) {
        this.#eventListeners = this.#eventListeners.filter(l => l !== aListener);
    }
}

export { MapStore };