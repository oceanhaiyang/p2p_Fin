package cn.haiyang.action.verification;

import cn.haiyang.action.admin.BaseAction;
import cn.haiyang.cache.BaseCacheService;
import cn.haiyang.domain.user.UserModel;
import cn.haiyang.filter.GetHttpResponseHeader;
import cn.haiyang.service.mail.MailService;
import cn.haiyang.service.user.IUserService;
import cn.haiyang.utils.EmailUtils;
import cn.haiyang.utils.FrontStatusConstants;
import cn.haiyang.utils.Response;
import cn.haiyang.utils.SecretUtil;
import org.apache.commons.lang.RandomStringUtils;
import org.apache.commons.lang.StringUtils;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import java.io.IOException;
import java.util.Map;

@Controller
@Scope("prototype")
@Namespace("/verification")
public class VerificationAction extends BaseAction{
    @Autowired
    private BaseCacheService baseService;

    @Autowired
    private IUserService userService;

    @Autowired
    private MailService mailService;


    @Action("validateSMS")
    public void validateSMS(){
        try {
            this.getResponse().getWriter().write(Response.build().setStatus("1").toJSON());
        } catch (IOException e) {
            e.printStackTrace();
        }
    }


    //发送短信
    @Action("sendMessage")
    public void sendMessage(){
        String phone = this.getRequest().getParameter("phone");

        String randomNumeric = RandomStringUtils.randomNumeric(6);

        String content = "P2P短信认证："+randomNumeric;

        System.out.println("向"+phone+"发送验证消息"+content);

        baseService.set(phone,randomNumeric);



        baseService.expire(phone,3*60);

        try {
            this.getResponse().getWriter().write(Response.build().setStatus("1").toJSON());
        } catch (IOException e) {
            e.printStackTrace();
        }

    }

//绑定手机
    @Action("addPhone")
    public void addPhone(){
        //先判断token的状态
        String token = GetHttpResponseHeader.getHeadersInfo(this.getRequest());

        try {
            if (StringUtils.isEmpty(token)){
                //token过期
                this.getResponse().getWriter().write(Response.build().setStatus(FrontStatusConstants.NULL_TOKEN).toJSON());
                return;

            }
            Map<String,Object> hmap = baseService.getHmap(token);
            if(hmap ==null||hmap.size()==0){
                //用户未登录
                this.getResponse().getWriter()
                        .write(Response.build().setStatus(FrontStatusConstants.NOT_LOGGED_IN).toJSON());
                return;

            }

            // 1.获取请求参数
            String phone = this.getRequest().getParameter("phone");
            String phoneCode = this.getRequest().getParameter("phoneCode");
            // 2.判断验证码是否正确
            String _phoneCode = baseService.get(phone);

            if (!_phoneCode.equals(phoneCode)) {
                // 说明不正确
                this.getResponse().getWriter()
                        .write(Response.build().setStatus(FrontStatusConstants.INPUT_ERROR_OF_VALIDATE_CARD).toJSON());
                return;
            }
            // 3.得到用户，判断用户是否已经绑定手机
            UserModel user = userService.findById((int) (hmap.get("id")));
            if (user.getPhoneStatus() == 1) {
                this.getResponse().getWriter()
                        .write(Response.build().setStatus(FrontStatusConstants.MOBILE_ALREADY_REGISTER).toJSON());
                return;
            }

            // 4.绑定手机
            userService.updatePhoneStatus(phone, (int) (hmap.get("id")));
            this.getResponse().getWriter().write(Response.build().setStatus(FrontStatusConstants.SUCCESS).toJSON());

        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @Action("verifiRealName")
    public void verifiRealName(){
        //先判断token的状态
        String token = GetHttpResponseHeader.getHeadersInfo(this.getRequest());

        try {
            if (StringUtils.isEmpty(token)){
                //token过期
                this.getResponse().getWriter().write(Response.build().setStatus(FrontStatusConstants.NULL_TOKEN).toJSON());
                return;

            }
            Map<String,Object> hmap = baseService.getHmap(token);
            if(hmap ==null||hmap.size()==0){
                //用户未登录
                this.getResponse().getWriter()
                        .write(Response.build().setStatus(FrontStatusConstants.NOT_LOGGED_IN).toJSON());
                return;

            }

            String realName = this.getRequest().getParameter("realName");
            String identity = this.getRequest().getParameter("identity");

            userService.updateRealName(realName,identity,(int)hmap.get("id"));
            this.getResponse().getWriter()
                    .write(Response.build().setStatus(FrontStatusConstants.SUCCESS).toJSON());
            return;

        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @Action("auth")
    public void auth(){
        GetHttpResponseHeader.getHeadersInfo(this.getRequest());

        String userId = this.getRequest().getParameter("userId");

        String username = this.getRequest().getParameter("username");

        String email = this.getRequest().getParameter("email");

        String title = "邮箱认证激活";
        try {
            String enc = SecretUtil.encrypt(userId);
            String content = EmailUtils.getMailCapacity(email,enc,username);

            mailService.sendMail(email,title,content);

            userService.addEmail(email,Integer.parseInt(userId));
            this.getResponse().getWriter()
                    .write(Response.build().setStatus(FrontStatusConstants.SUCCESS).toJSON());

        } catch (Exception e) {
            e.printStackTrace();
        }


    }

    @Action("emailactivation")
    public void emailactivation(){
        this.getResponse().setContentType("text/html;charset=utf-8");
        String us = this.getRequest().getParameter("us");

        try {
            String userId = SecretUtil.decode(us);
            userService.updateEmailStatus(Integer.parseInt(userId));
            this.getResponse().getWriter().write("认证成功");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
