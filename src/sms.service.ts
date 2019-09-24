import {Inject, Injectable} from '@nestjs/common';
import {SmsOptions} from './interfaces/sms.options';

@Injectable()
export class SmsService {
	constructor(
		@Inject('SMS_DIALECT') private readonly SMS_DIALECT: any,
		@Inject('SMS_OPTIONS') private readonly smsOptions: SmsOptions,
	) {
	}

	async send(message: string, mobileNo: string): Promise<any> {
		const sms = this.SMS_DIALECT;
		sms.from = this.smsOptions.sender;
		sms.text = message;
		sms.to = mobileNo;

		return await sms.send();
	}
}
