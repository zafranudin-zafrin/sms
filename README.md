# Nest | Carsome Sms

A library for Nest that allow you to send simple SMS to preferred recipient, using your
provider of choice. Supported by Carsome.

Supported sms provider:

* Infobip
* Local
* Twilio (Upcoming)

## Installation

```
$ npm install --save @zafranudin.zafrin/sms
```

## Usage

To begin using this library, import CSmsModule into your module

```
import { CSmsModule } from '@zafranudin.zafrin/sms';
import { Module } from '@nestjs/common';


@Module({
    imports: [
        //...
        CSmsModule.register({
                dialect: 'infobip', 
                sender: 'Acme' 
        }),
    ],
})
export class YourModule {}
```

And then inject the `CSmsService` into your provider, and you can already
use the library.

```
import { CSmsService } from '@zafranudin.zafrin/sms';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LocalOtpService implements AwesomeService {

    constructor(private smsService: CSmsService) {}
    //...
    
    async doSomethingAwesome(){
        const message = `RM0.00 You should try this library, it's awesome~`;
        await this.smsService.send(message, '60123456789');
    }
}
```

## Useful Helper

### Getting the sms body

Perhaps you want to get the body of the sms before sending them. You can do as such:

```
//...
async doSomethingAwesome(){
    const message = `RM0.00 You should try this library, it's awesome~`;

    const sms = this.smsService.draft(message, '60123456789');
    console.log(sms.getBody());
    await sms.submit();
}

```

This action wil return to your console the following result

```
{
    from: 'Acme',  // from your module's sender option
    to: '60123456789',
    text: 'RM0.00 You should try this library, it's awesome~',
}
```

### Sending to multiple recipients

This library also support to send the message to a multiple recipients.

```
//...
async doSomethingAwesome(){
    const message = `RM0.00 You should try this library, it's awesome~`;
    const recipients = [
        '60123456789',
        '60101228341',
        '60147111476'
    ];
    return await this.smsService.send(message, recipients);
}

```

### Getting the response of the sms provider

At times, you may want to see the response send by the provider.

```
//...
async doSomethingAwesome(){
    const message = `RM0.00 You should try this library, it's awesome~`;
    const recipients = [
        '60123456789',
        '60101228341',
        '60147111476'
    ];
    const sms = await this.smsService.send(message, recipients);
    console.log(sms.getResponse());
}

```

## Support

If you would like to help and improve this awesome library, kindly make a fork and do your magic!

This project will be using tslint to ensure code quality before commit. We would also appreciate
if you would write a test before submitting the pull request.
