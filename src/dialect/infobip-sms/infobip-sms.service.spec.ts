import { Test, TestingModule } from '@nestjs/testing';
import { InfobipSmsService } from './infobip-sms.service';

describe('InfobipSmsService', () => {
	let service: InfobipSmsService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [InfobipSmsService],
		}).compile();

		service = module.get<InfobipSmsService>(InfobipSmsService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
