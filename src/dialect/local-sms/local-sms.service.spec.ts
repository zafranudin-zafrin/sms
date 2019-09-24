import { Test, TestingModule } from '@nestjs/testing';
import { LocalSmsService } from './local-sms.service';

describe('LocalSmsService', () => {
	let service: LocalSmsService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [LocalSmsService],
		}).compile();

		service = module.get<LocalSmsService>(LocalSmsService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
