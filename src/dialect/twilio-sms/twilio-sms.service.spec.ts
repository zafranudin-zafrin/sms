import { Test, TestingModule } from '@nestjs/testing';
import { TwilioSmsService } from './twilio-sms.service';

describe('TwilioSmsService', () => {
	let service: TwilioSmsService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [TwilioSmsService],
		}).compile();

		service = module.get<TwilioSmsService>(TwilioSmsService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
