import {Inject, Injectable} from '@nestjs/common';
import {SmsOptions} from './interfaces/sms.options';
import {BaseSmsService} from './dialect/base-sms.service';

@Injectable()
export class SmsService {
	sms: BaseSmsService;

	constructor(
		@Inject('SMS_DIALECT') private readonly SMS_DIALECT: any,
		@Inject('SMS_OPTIONS') private readonly smsOptions: SmsOptions,
	) {
		this.sms = this.SMS_DIALECT;
		switch (smsOptions.dialect) {
			case 'infobip':
				this.sms = SMS_DIALECT.infobip;
				break;
			case 'twilio':
				this.sms = SMS_DIALECT.twilio;
				break;
			default:
				this.sms = SMS_DIALECT.mock;
				break;
		}

	}

	async send(message: string, mobileNo: string): Promise<any> {
		this.sms.from = this.smsOptions.sender;
		this.sms.text = message;
		this.sms.to = mobileNo;

		return await this.sms.send();
	}

	getBody() {
		return this.sms.body;
	}
}
