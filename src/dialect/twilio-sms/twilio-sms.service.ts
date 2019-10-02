import {Injectable} from '@nestjs/common';
import {BaseSmsService} from '../base-sms.service';
import {SmsInterface} from '../../interfaces';

@Injectable()
export class TwilioSmsService extends BaseSmsService implements SmsInterface {
	async send(): Promise<any> {
		// tslint:disable-next-line:no-console
		console.log('Method not implemented');
		return true;
	}
}
