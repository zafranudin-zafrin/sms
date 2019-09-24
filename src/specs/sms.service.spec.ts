import {Test, TestingModule} from '@nestjs/testing';
import {CSmsService} from '../c-sms.service';

describe('SmsService', () => {
	let service: CSmsService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [CSmsService],
		}).compile();

		service = module.get<CSmsService>(CSmsService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
