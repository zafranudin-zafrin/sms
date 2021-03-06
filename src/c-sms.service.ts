import {Inject, Injectable} from '@nestjs/common';
import {SmsOptions} from './interfaces/sms.options';

@Injectable()
export class CSmsService {
	sms: any;

	constructor(
		@Inject('SMS_DIALECT') private readonly SMS_DIALECT: any,
		@Inject('SMS_OPTIONS') private readonly smsOptions: SmsOptions,
	) {
		this.sms = SMS_DIALECT;
	}

	draft(message: string, mobileNo: string) {
		this.sms.from = this.smsOptions.sender;
		this.sms.text = message;
		this.sms.to = mobileNo;
		return this;
	}

	async submit() {
		return await this.sms.send();
	}

	async send(message: string, mobileNo: string): Promise<any> {
		this.sms.from = this.smsOptions.sender;
		this.sms.text = message;
		this.sms.to = mobileNo;

		await this.sms.send();
		return this.getResponse();
	}

	getBody() {
		return this.sms.body;
	}

	getResponse() {
		return this.sms.response;
	}
}
