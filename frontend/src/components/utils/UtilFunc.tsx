export function useWaitCursor() {
    document.querySelector('body').style.cursor = 'wait';
}

export function useDefaultCursor() {
    document.querySelector('body').style.removeProperty('cursor');
}