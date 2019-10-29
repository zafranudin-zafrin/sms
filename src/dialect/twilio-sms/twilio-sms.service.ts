import {Injectable} from '@nestjs/common';
import {BaseSmsService} from '../base-sms.service';
import {SmsInterface} from '../../interfaces';
import {Twilio} from 'twilio';

@Injectable()
export class TwilioSmsService extends BaseSmsService implements SmsInterface {
	async send(): Promise<any> {
		const accountSid = String(process.env.TWILIO_SID);
		const authToken = String(process.env.TWILIO_TOKEN);
		const twilio: Twilio = new Twilio(accountSid, authToken);

		// Perform twilio action here

		return true;
	}
}
