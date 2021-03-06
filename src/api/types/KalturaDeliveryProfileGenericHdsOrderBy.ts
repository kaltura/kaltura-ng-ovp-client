

import { KalturaObjectBase } from '../kaltura-object-base';
import { KalturaTypesFactory } from '../kaltura-types-factory';

export class KalturaDeliveryProfileGenericHdsOrderBy extends KalturaObjectBase {
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

    static createdAtAsc = new KalturaDeliveryProfileGenericHdsOrderBy('+createdAt');
	static createdAtDesc = new KalturaDeliveryProfileGenericHdsOrderBy('-createdAt');
	static updatedAtAsc = new KalturaDeliveryProfileGenericHdsOrderBy('+updatedAt');
	static updatedAtDesc = new KalturaDeliveryProfileGenericHdsOrderBy('-updatedAt');
}
KalturaTypesFactory.registerType('KalturaDeliveryProfileGenericHdsOrderBy',KalturaDeliveryProfileGenericHdsOrderBy);