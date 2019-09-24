export interface SmsOptions {
	dialect: string | 'infobip' | 'twilio' | 'local';
	sender: string;
}
