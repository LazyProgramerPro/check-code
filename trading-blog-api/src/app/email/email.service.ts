import { Inject, Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';
import { Transporter } from 'nodemailer';
import { compile, Template } from 'handlebars';
import { join } from 'path';
import { EmailDTO } from './dtos';
import { EMAIL_TRANSPORT_TOKEN } from '../constants';
import { SystemConfigService } from '../config/system/system-config.service';

@Injectable()
export class EmailService {
  constructor(
    @Inject(EMAIL_TRANSPORT_TOKEN) private transport: Transporter,
    private readonly systemConfig: SystemConfigService,
  ) {}

  public async sendEmail(emailDTO: EmailDTO): Promise<boolean> {
    const { from, to, cc = '', bcc = '', subject, content } = emailDTO;
    const sendFrom = from || this.systemConfig.mailFrom;
    const sendTo = Array.isArray(to) ? to.join(',') : to;
    await this.transport.sendMail({
      from: sendFrom,
      to: sendTo,
      subject,
      cc,
      bcc,
      text: content,
      encoding: 'UTF-8',
    });
    return true;
  }

  public async sendEmailTemplate(
    emailDTO: EmailDTO,
    templateUrl: string,
  ): Promise<boolean> {
    const { from, to, cc = '', bcc = '', subject, context } = emailDTO;
    const sendFrom = from || this.systemConfig.mailFrom;
    const sendTo = Array.isArray(to) ? to.join(',') : to;

    const emailTemplatePath = join(__dirname, '.', 'templates', templateUrl);
    const templateSource = readFileSync(emailTemplatePath, 'utf8');
    const template: Template = compile(templateSource);
    const parsedHtml = template(context);

    await this.transport.sendMail({
      from: sendFrom,
      to: sendTo,
      subject,
      cc,
      bcc,
      html: parsedHtml,
      encoding: 'UTF-8',
    });
    return true;
  }
}
