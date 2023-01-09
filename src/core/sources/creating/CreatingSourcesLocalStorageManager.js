import { SOURCES_TYPES_KEY } from "../../../constants/local-storage-constants";
import { assignToObject } from "../../../helpers/objects/assignToObject";

export function CreatingSourcesLocalStorageManager({ props }) {
    const NEW_TYPE_SHOULD_BE_ADDED_HERE = false;
    let decodedSourceTypes;
    let newSourceTypesToDetect = 0;
    const newTypes = {};

    this.getSourceTypeFromLocalStorageByUrl = (url) => {
        if (!decodedSourceTypes[url]) {
            return addNewUrlToDetect(url);
        }
        return decodedSourceTypes[url];
    };

    this.handleReceivedSourceTypeForUrl = (sourceType, url) => {
        if (newTypes[url] === NEW_TYPE_SHOULD_BE_ADDED_HERE) {
            newSourceTypesToDetect--;

            // not storing invalid types
            if (sourceType !== 'invalid') {
                newTypes[url] = sourceType;
            } else {
                delete newTypes[url];
            }

            if (newSourceTypesToDetect === 0) {
                assignToObject(decodedSourceTypes, newTypes);
                localStorage.setItem(SOURCES_TYPES_KEY, JSON.stringify(decodedSourceTypes));
            }
        }
    };

    const addNewUrlToDetect = (url) => {
        newSourceTypesToDetect++;
        newTypes[url] = NEW_TYPE_SHOULD_BE_ADDED_HERE;
    };

    if (!props.disableLocalStorage) {
        decodedSourceTypes = JSON.parse(localStorage.getItem(SOURCES_TYPES_KEY));
        // we are checking if detected source types contains at certain key source type
        // when localStorage will be empty we can overwrite this method because we are sure
        // that at every index will be no source type
        if (!decodedSourceTypes) {
            // in ifAllNewTypesAreDetectedStoreAllTypesToLocalStorage we are assigning to
            // decodedSourceTypes new Types so we need to make it an object to avoid errors
            decodedSourceTypes = {};
            this.getSourceTypeFromLocalStorageByUrl = addNewUrlToDetect;
        }
    } else {
        this.getSourceTypeFromLocalStorageByUrl = function () {};
        this.handleReceivedSourceTypeForUrl = function () {};
    }
}
