import {DynamicModule, HttpModule, Module} from '@nestjs/common';
import {SmsService} from './sms.service';
import {SmsOptions} from './interfaces/sms.options';
import {InfobipSmsService} from './dialect/infobip-sms/infobip-sms.service';
import {TwilioSmsService} from './dialect/twilio-sms/twilio-sms.service';
import {LocalSmsService} from './dialect/local-sms/local-sms.service';
import {BaseSmsService} from './dialect/base-sms.service';

@Module({})
export class SmsModule {
	static register(options: SmsOptions): DynamicModule {
		return {
			module: SmsModule,
			imports: [
				HttpModule,
			],
			providers: [
				SmsService,
				TwilioSmsService,
				InfobipSmsService,
				LocalSmsService,
				BaseSmsService,
				{
					provide: 'SMS_OPTIONS',
					useValue: options,
				},
				{
					provide: 'SMS_DIALECT',
					useFactory: (
						infobip: InfobipSmsService,
						twilio: TwilioSmsService,
						mock: LocalSmsService) => {
						return {
							infobip,
							twilio,
							mock,
						};
					},
					inject: [InfobipSmsService, TwilioSmsService, LocalSmsService],
				},
			],
			exports: [
				SmsService,
				TwilioSmsService,
				InfobipSmsService,
				LocalSmsService,
				BaseSmsService,
			],
		};
	}
}
