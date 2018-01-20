package cn.haiyang.service.mail.impl;

import cn.haiyang.service.mail.MailService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;


@Service
public class MailServiceImpl implements MailService {

    Logger logger = LoggerFactory.getLogger(MailServiceImpl.class);

    @Autowired
    private JavaMailSender javaMailSender;
    @Value("${mail.from}")
    private String from;

    public void sendMail(String email,String title,String content){
        MimeMessage mm = javaMailSender.createMimeMessage();

        MimeMessageHelper helper = new MimeMessageHelper(mm);

        try {
            helper.setFrom(from);
            helper.setSubject(title);
            helper.setText(content,true);
            helper.setTo(email);
        } catch (MessagingException e) {
            e.printStackTrace();
        }

        javaMailSender.send(mm);
        System.out.println("邮件发送");

    }
}
