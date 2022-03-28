import { Inject, Injectable } from '@nestjs/common';
import got from 'got';
import * as FormData from 'form-data';

import { CONFIG_OPTIONS } from 'src/common/common.constants';
import { MailModuleOptions, MailVar } from './mail.interfaces';

@Injectable()
export class MailService {
  constructor(@Inject(CONFIG_OPTIONS) private options: MailModuleOptions) {}

  async sendEmail(
    subject: string,
    template: string,
    mailVars: MailVar[],
  ): Promise<boolean> {
    const form = new FormData();
    form.append('from', `Excited User <mailgun@${this.options.domain}>`);
    form.append('to', 'imangali950@gmail.com');
    form.append('subject', subject);
    form.append('template', template);
    mailVars.forEach((mVar) => form.append(`v:${mVar.key}`, mVar.value));

    try {
      await got.post(
        `https://api.mailgun.net/v3/${this.options.domain}/messages`,
        {
          headers: {
            Authorization: `Basic ${Buffer.from(
              `api:${this.options.apiKey}`,
            ).toString('base64')}`,
          },
          body: form,
        },
      );
      return true;
    } catch (error) {
      return false;
    }
  }

  sendVerificationEmail(email: string, code: string) {
    this.sendEmail('Verify Your Email', 'verify-email', [
      { key: 'code', value: code },
      { key: 'username', value: email },
    ]);
  }
}
