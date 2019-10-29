import {Injectable} from '@nestjs/common';
import {BaseSmsService} from '../base-sms.service';
import {SmsInterface} from '../../interfaces';
import * as twilio from 'twilio';

@Injectable()
export class TwilioSmsService extends BaseSmsService implements SmsInterface {
	twilio: twilio;
	async send(): Promise<any> {
		const accountSid = process.env.TWILIO_SID;
		const authToken = process.env.TWILIO_TOKEN;
		this.twilio = this.twilio(accountSid, authToken);
		console.log('Method not implemented');
		return true;
	}
}
