import { Inject, Injectable } from '@nestjs/common';
import got from 'got';
import * as FormData from 'form-data';

import { CONFIG_OPTIONS } from 'src/common/common.constants';
import { MailModuleOptions, MailVar } from './mail.interfaces';

@Injectable()
export class MailService {
  constructor(@Inject(CONFIG_OPTIONS) private options: MailModuleOptions) {}

  async sendEmail(subject: string, template: string, mailVars: MailVar[]) {
    const form = new FormData();
    form.append('from', `Excited User <mailgun@${this.options.domain}>`);
    form.append('to', 'imangali950@gmail.com');
    form.append('subject', subject);
    form.append('template', template);
    mailVars.forEach((mVar) => form.append(`v:${mVar.key}`, mVar.value));

    try {
      const response = await got(
        `https://api.mailgun.net/v3/${this.options.domain}/messages`,
        {
          method: 'POST',
          headers: {
            Authorization: `Basic ${Buffer.from(
              `api:${this.options.apiKey}`,
            ).toString('base64')}`,
          },
          body: form,
        },
      );
      console.log(response.body);
    } catch (error) {
      console.log(error);
    }
  }

  sendVerificationEmail(email: string, code: string) {
    this.sendEmail('Verify Your Email', 'verify-email', [
      { key: 'code', value: code },
      { key: 'username', value: email },
    ]);
  }
}
