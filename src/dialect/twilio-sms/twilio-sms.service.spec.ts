import {Test, TestingModule} from '@nestjs/testing';
import {HttpModule} from '@nestjs/common';
import {TwilioSmsService} from './twilio-sms.service';

describe('LoansService', () => {
	let service: TwilioSmsService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [
				HttpModule,
			],
			providers: [
				TwilioSmsService,
			],
		}).compile();

		service = module.get<TwilioSmsService>(TwilioSmsService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
