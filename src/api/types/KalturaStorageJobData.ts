
import { KalturaObjectMetadata } from '../kaltura-object-base';
import { KalturaTypesFactory } from '../kaltura-types-factory';
import { KalturaJobData, KalturaJobDataArgs } from './KalturaJobData';

export interface KalturaStorageJobDataArgs  extends KalturaJobDataArgs {
    serverUrl? : string;
	serverUsername? : string;
	serverPassword? : string;
	serverPrivateKey? : string;
	serverPublicKey? : string;
	serverPassPhrase? : string;
	ftpPassiveMode? : boolean;
	srcFileSyncLocalPath? : string;
	srcFileSyncId? : string;
	destFileSyncStoredPath? : string;
}


export class KalturaStorageJobData extends KalturaJobData {

    serverUrl : string;
	serverUsername : string;
	serverPassword : string;
	serverPrivateKey : string;
	serverPublicKey : string;
	serverPassPhrase : string;
	ftpPassiveMode : boolean;
	srcFileSyncLocalPath : string;
	srcFileSyncId : string;
	destFileSyncStoredPath : string;

    constructor(data? : KalturaStorageJobDataArgs)
    {
        super(data);
    }

    protected _getMetadata() : KalturaObjectMetadata
    {
        const result = super._getMetadata();
        Object.assign(
            result.properties,
            {
                objectType : { type : 'c', default : 'KalturaStorageJobData' },
				serverUrl : { type : 's' },
				serverUsername : { type : 's' },
				serverPassword : { type : 's' },
				serverPrivateKey : { type : 's' },
				serverPublicKey : { type : 's' },
				serverPassPhrase : { type : 's' },
				ftpPassiveMode : { type : 'b' },
				srcFileSyncLocalPath : { type : 's' },
				srcFileSyncId : { type : 's' },
				destFileSyncStoredPath : { type : 's' }
            }
        );
        return result;
    }
}

KalturaTypesFactory.registerType('KalturaStorageJobData',KalturaStorageJobData);
