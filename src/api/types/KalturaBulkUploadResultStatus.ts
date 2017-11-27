

import { KalturaObjectBase } from '../kaltura-object-base';
import { KalturaTypesFactory } from '../kaltura-types-factory';

export class KalturaBulkUploadResultStatus extends KalturaObjectBase {
    private _value : string;
    constructor( value?:string | number){
        super();
        this._value = value + '';
    }

    equals(obj : this) : boolean
    {
        return obj && obj.toString() === this._value;
    }

    toString(){
        return this._value;
    }

    static error = new KalturaBulkUploadResultStatus('1');
	static inProgress = new KalturaBulkUploadResultStatus('3');
	static ok = new KalturaBulkUploadResultStatus('2');
}
KalturaTypesFactory.registerType('KalturaBulkUploadResultStatus',KalturaBulkUploadResultStatus);