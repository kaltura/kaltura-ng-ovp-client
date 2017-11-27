import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import { Http, Headers, Response } from '@angular/http';

import { KalturaRequest } from './api/kaltura-request';
import { KalturaMultiRequest } from './api/kaltura-multi-request';
import { KalturaMultiResponse } from './api/kaltura-multi-response';
import { CancelableAction } from './api/utils/cancelable-action';
import { KalturaHttpClientBase } from './api/kaltura-clients/kaltura-http-client-base';
import { KalturaAPIException } from './api/kaltura-api-exception';
import { KalturaClientConfiguration } from './kaltura-client-configuration.service';

@Injectable()
export class KalturaClient extends KalturaHttpClientBase {

    constructor(private http : Http, configuration : KalturaClientConfiguration) {
        super(configuration);
    }

    protected _createCancelableAction(data: { endpoint: string, headers: any, body: any}): CancelableAction {
        const requestContext = new CancelableAction((resolve, reject) => {

            const body = JSON.stringify(data.body);
            const headers = new Headers(data.headers);

            const subscription = this.http.request(data.endpoint,
                {
                    method: 'post',
                    body: body,
                    headers: headers
                }
            ).subscribe(
                response => {
                    resolve(response.json());
                },
                error => {
                    reject(error);
                });

            return () =>
            {
                if (subscription)
                {
                    subscription.unsubscribe();
                }
            }
        });

        return requestContext;
    }

    public request<T>(request: KalturaRequest<T>): Observable<T> {
        return Observable.create(observer => {
            const requestContext = super._request(request).then(
                value => {
                    observer.next(value);
                    observer.complete();
                },
                reason => {
                    observer.error(reason);
                }
            );

            return () =>
            {
                requestContext.cancel();
            };
        });
    }

    public multiRequest(requests: KalturaRequest<any>[]): Observable<KalturaMultiResponse>
    public multiRequest(request: KalturaMultiRequest): Observable<KalturaMultiResponse>;
    public multiRequest(arg: KalturaMultiRequest | KalturaRequest<any>[]): Observable<KalturaMultiResponse> {

        return Observable.create(observer => {
            const requestContext = super._multiRequest(arg).then(
                value => {
                    observer.next(value);
                    observer.complete();
                },
                reason => {
                    observer.error(reason);
                }
            );

            return () =>
            {
                requestContext.cancel();
            };
        });
    }

}
