import {createClient, createMicrophoneAndCameraTracks} from "agora-rtc-sdk-ng/esm";

const appId = '056e7ee25ec24b4586f17ec177e121d1'

export const config = {mode: "rtc", codec: "vp8", appId: appId};
export const useClient = createClient();
export const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();