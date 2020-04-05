package com.example.reddit.service;

        import com.example.reddit.model.NotificationEmail;
        import lombok.AllArgsConstructor;
        import lombok.extern.slf4j.Slf4j;
        import org.springframework.mail.MailException;
        import org.springframework.mail.javamail.JavaMailSender;
        import org.springframework.mail.javamail.MimeMessageHelper;
        import org.springframework.mail.javamail.MimeMessagePreparator;
        import org.springframework.scheduling.annotation.Async;
        import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
@Slf4j
@Async
class MailService {

    private final JavaMailSender mailSender;
    private final MailContentBuilder mailContentBuilder;

    void sendMail(NotificationEmail notificationEmail) {
        MimeMessagePreparator messagePreparator = mimeMessage -> {
            MimeMessageHelper messageHelper = new MimeMessageHelper(mimeMessage);
            messageHelper.setFrom("doosun@email.com");
            messageHelper.setTo(notificationEmail.getRecipient());
            messageHelper.setSubject(notificationEmail.getSubject());
            messageHelper.setText(mailContentBuilder.build(notificationEmail.getBody()));
        };
        try {
            mailSender.send(messagePreparator);
            log.info("Activation email sent!!");
        } catch (MailException e) {
//            throw new Exception("Exception occurred when sending mail to " + notificationEmail.getRecipient());
        }
    }

}

