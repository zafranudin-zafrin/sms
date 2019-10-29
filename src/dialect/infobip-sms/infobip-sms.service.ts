import {Injectable} from '@nestjs/common';
import {SmsInterface} from '../../interfaces/sms.interface';
import {BaseSmsService} from '../base-sms.service';

@Injectable()
export class InfobipSmsService extends BaseSmsService implements SmsInterface {

	protected _headers = {
		'Content-Type': 'application/json',
		'Authorization': `App ${process.env.INFOBIP_APP_TOKEN}`,
	};

	protected _config = {
		headers: this._headers,
	};

	get to() {
		return this._body.to;
	}

	set to(recipients) {
		this._body.to = InfobipSmsService._validateNumber(recipients);
	}

	async send(): Promise<any> {
		this.response = await this.httpService.post(process.env.INFOBIP_BASE_URL + '/sms/2/text/single',
			this._body,
			this._config).toPromise();
		return this.response;
	}

	private static _validateNumber(mobileNo: string | string[]) {
		if (Array.isArray(mobileNo)) {
			const sanitized = [];
			for (const num of mobileNo) {
				sanitized.push(InfobipSmsService._cleanNumber(num));
			}
			return sanitized;
		}
		return InfobipSmsService._cleanNumber(mobileNo);
	}

	private static _cleanNumber(mobileNo: string) {
		if (mobileNo.charAt(0) !== '6' && mobileNo.charAt(0) === '0') {
			mobileNo = '6' + mobileNo;
		}
		return mobileNo;
	}
}
