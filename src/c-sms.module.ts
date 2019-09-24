import {DynamicModule, HttpModule, Module} from '@nestjs/common';
import {CSmsService} from './c-sms.service';
import {SmsOptions} from './interfaces/sms.options';
import {InfobipSmsService} from './dialect/infobip-sms/infobip-sms.service';
import {TwilioSmsService} from './dialect/twilio-sms/twilio-sms.service';
import {LocalSmsService} from './dialect/local-sms/local-sms.service';
import {BaseSmsService} from './dialect/base-sms.service';

@Module({
	imports: [
		HttpModule,
	],
	providers: [
		CSmsService,
		TwilioSmsService,
		InfobipSmsService,
		LocalSmsService,
		BaseSmsService,
	],
	exports: [
		CSmsService,
		TwilioSmsService,
		InfobipSmsService,
		LocalSmsService,
		BaseSmsService,
	],
})
export class CSmsModule {
	static register(options: SmsOptions): DynamicModule {
		return {
			module: CSmsModule,
			imports: [
				HttpModule,
			],
			providers: [
				CSmsService,
				TwilioSmsService,
				InfobipSmsService,
				LocalSmsService,
				BaseSmsService,
				{
					provide: 'SMS_OPTIONS',
					useValue: options,
				},
			],
			exports: [
				CSmsService,
				TwilioSmsService,
				InfobipSmsService,
				LocalSmsService,
				BaseSmsService,
				{
					provide: 'SMS_OPTIONS',
					useValue: options,
				},
			],
		};
	}
}
