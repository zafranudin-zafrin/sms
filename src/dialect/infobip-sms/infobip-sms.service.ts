import { Injectable } from '@nestjs/common';
import { SmsInterface } from '../../interfaces/sms.interface';
import { BaseSmsService } from '../base-sms.service';

@Injectable()
export class InfobipSmsService extends BaseSmsService implements SmsInterface {

	protected _headers = {
		'Content-Type': 'application/json',
		'Authorization': `App ${process.env.INFOBIP_APP_TOKEN}`,
	};

	protected _config = {
		headers: this._headers,
	};

	async send(): Promise<any> {
		this.response = await this.httpService.post(process.env.INFOBIP_BASE_URL + '/sms/2/text/single',
			this._body,
			this._config).toPromise();
		return this.response;
	}
}
