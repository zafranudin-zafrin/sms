import {DynamicModule, HttpModule, HttpService, Module} from '@nestjs/common';
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
				{
					provide: 'SMS_OPTIONS',
					useValue: options,
				},
				{
					provide: 'SMS_DIALECT',
					useFactory: (
						httpService: HttpService) => {
						switch (options.dialect) {
							case 'infobip':
								return new InfobipSmsService(httpService, options);
							case 'twilio':
								return new TwilioSmsService();
							default:
								return new LocalSmsService(httpService, options);
						}
					},
					inject: [HttpService],
				},
			],
		};
	}
}
