declare module "react-native-sse" {
  interface EventSourceOptions {
    method?: string;
    timeout?: number;
    timeoutBeforeConnection?: number;
    withCredentials?: boolean;
    headers?: Record<string, string>;
    body?: string;
    debug?: boolean;
    pollingInterval?: number;
    lineEndingCharacter?: string | null;
  }

  interface EventSourceEvent {
    type: string;
    [key: string]: any;
  }

  interface MessageEvent extends EventSourceEvent {
    type: string;
    data: string;
    url: string;
    lastEventId: string | null;
  }

  type EventHandler = (event: EventSourceEvent | MessageEvent) => void;

  class EventSource {
    readonly ERROR: -1;
    readonly CONNECTING: 0;
    readonly OPEN: 1;
    readonly CLOSED: 2;

    readonly url: string;
    readonly status: -1 | 0 | 1 | 2;
    readonly lastEventId: string | null;
    readonly interval: number;
    readonly debug: boolean;

    onopen: (event: EventSourceEvent) => void;
    onmessage: (event: MessageEvent) => void;
    onerror: (event: EventSourceEvent) => void;
    onclose: (event: EventSourceEvent) => void;

    constructor(url: string, options?: EventSourceOptions);
    open(): void;
    close(): void;
    addEventListener(type: string, listener: EventHandler): void;
    removeEventListener(type: string, listener: EventHandler): void;
    removeAllEventListeners(type?: string): void;
    dispatch(type: string, data: EventSourceEvent): void;
  }

  export default EventSource;
}
