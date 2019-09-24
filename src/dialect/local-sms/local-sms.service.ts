import { Injectable } from '@nestjs/common';
import { SmsInterface } from '../../interfaces/sms.interface';
import { BaseSmsService } from '../base-sms.service';

@Injectable()
export class LocalSmsService extends BaseSmsService implements SmsInterface {
	async send(): Promise<any> {
		// tslint:disable-next-line:no-console
		console.log('Message has been sent');
		return true;
	}
}
