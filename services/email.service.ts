import {SendEmailCommand, SendEmailRequest, SendEmailResponse, SESClient} from "@aws-sdk/client-ses";
import {SESClientConfig} from "@aws-sdk/client-ses/dist-types/SESClient";
import {env} from "@/services/config.service";

export class EmailService {
    private client: SESClient

    constructor(configuration: SESClientConfig) {
        this.client = new SESClient(configuration)
    }

    public sendEmail(input: SendEmailRequest): Promise<SendEmailResponse> {
        const command = new SendEmailCommand(input);
        return this.client.send(command)
    }
}

let client: EmailService | undefined = undefined;

export const makeEmailService = (configuration?: SESClientConfig): EmailService => {
    if (!client) {
        client = new EmailService({
            region: env.AWS_SES_REGION,
            credentials: {
                accessKeyId: env.AWS_SES_ACCESS_KEY_ID,
                secretAccessKey: env.AWS_SES_ACCESS_SECRET_KEY
            }, ...configuration
        });
    }
    return client
}