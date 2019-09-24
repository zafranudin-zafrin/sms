import {SmsBody} from './sms.interface';

export interface BaseSmsInterface {

	response(): any;

	body(): SmsBody;

	from(): string;

	to(): string;

	text(): string;

	send(): Promise<any>;
}
