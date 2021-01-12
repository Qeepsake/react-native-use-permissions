/// <reference types="react" />
import { ResultMap } from 'react-native-permissions/dist/typescript/results';
export declare function useNotificationStatus(initialValue?: ResultMap[keyof ResultMap]): ("unavailable" | "blocked" | "denied" | "granted" | "limited" | import("react").Dispatch<import("react").SetStateAction<"unavailable" | "blocked" | "denied" | "granted" | "limited">>)[];
