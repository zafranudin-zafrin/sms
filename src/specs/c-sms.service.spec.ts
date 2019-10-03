import {Test, TestingModule} from '@nestjs/testing';
import {HttpModule, HttpService} from '@nestjs/common';
import {CSmsService} from '../c-sms.service';
import {InfobipSmsService} from '../dialect/infobip-sms/infobip-sms.service';
import {of} from 'rxjs';
import {AxiosResponse} from 'axios';

describe('CSmsService', () => {
	let service: CSmsService;
	let http: HttpService;

	const message = 'Hello world';
	const recipientNo = '60123456789';
	const sender = 'ACME';
	const result: AxiosResponse = {
		data: {
			messages: [{
				to: recipientNo,
				status: {
					groupId: 1,
					groupName: 'PENDING',
					id: 26,
					name: 'PENDING_ACCEPTED',
					description: 'Message sent to next instance',
				},
				messageId: '1568961198322110598',
			}],
		},
		status: 200,
		statusText: 'OK',
		headers: {},
		config: {},
	};

	beforeEach(async () => {
		http = new HttpService();

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
						sender,
					},
				},
				{
					provide: 'SMS_DIALECT',
					useFactory: () => {
						return new InfobipSmsService(http, {
							dialect: 'infobip',
							sender,
						});
					},
				},
			],
		}).compile();

		service = module.get<CSmsService>(CSmsService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	it('should send SMS', async () => {
		jest.spyOn(http, 'post').mockImplementation((): any => {
			return of(result);
		});

		expect(await service.send(message, recipientNo)).toBe(result);
	});

	it('can draft message', async () => {

		expect(await service.draft(message, recipientNo)).toBe(service);
	});

	it('can submit drafted message', async () => {
		jest.spyOn(http, 'post').mockImplementation((): any => {
			return of(result);
		});
		const flow = await service.draft(message, recipientNo);
		expect(await flow.submit()).toBe(result);
	});

	it('can get the body', async () => {
		const flow = await service.draft(message, recipientNo);

		expect(flow.getBody()).toStrictEqual({
			from: sender,
			to: recipientNo,
			text: message,
		});
	});

	it('can get the response after sent', async () => {
		jest.spyOn(http, 'post').mockImplementation((): any => {
			return of(result);
		});
		await service.send(message, recipientNo);
		expect(service.getResponse()).toBe(result);
	});
});
