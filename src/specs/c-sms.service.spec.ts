import {Test, TestingModule} from '@nestjs/testing';
import {HttpModule, HttpService} from '@nestjs/common';
import {CSmsService} from '../c-sms.service';
import {InfobipSmsService} from '../dialect/infobip-sms/infobip-sms.service';

describe('LoansService', () => {
	let service: CSmsService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [
				HttpModule,
			],
			providers: [
				CSmsService,
				{
					provide: 'SMS_OPTIONS',
					useValue: {
						dialect: 'infobip',
						sender: 'test',
					},
				},
				{
					provide: 'SMS_DIALECT',
					useFactory: (
						httpService: HttpService) => {
						return new InfobipSmsService(httpService, {
							dialect: 'infobip',
							sender: 'test',
						});
					},
					inject: [HttpService],
				},
			],
		}).compile();

		service = module.get<CSmsService>(CSmsService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
