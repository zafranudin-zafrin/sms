import {Inject, Injectable} from '@nestjs/common';
import {SmsOptions} from './interfaces/sms.options';
import {InfobipSmsService} from './dialect/infobip-sms/infobip-sms.service';
import {TwilioSmsService} from './dialect/twilio-sms/twilio-sms.service';
import {LocalSmsService} from './dialect/local-sms/local-sms.service';

@Injectable()
export class SmsService {
	sms: any;

	constructor(
		@Inject('SMS_DIALECT') private readonly SMS_DIALECT: any,
		@Inject('SMS_OPTIONS') private readonly smsOptions: SmsOptions,
		private infobip: InfobipSmsService,
		private twilio: TwilioSmsService,
		private mock: LocalSmsService,
	) {
		this.sms = this.SMS_DIALECT;
		switch (smsOptions.dialect) {
			case 'infobip':
				this.sms = infobip;
				break;
			case 'twilio':
				this.sms = twilio;
				break;
			default:
				this.sms = mock;
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
