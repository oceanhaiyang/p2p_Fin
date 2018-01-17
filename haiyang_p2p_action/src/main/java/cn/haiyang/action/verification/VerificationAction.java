package cn.haiyang.action.verification;

import cn.haiyang.action.admin.BaseAction;
import cn.haiyang.cache.BaseCacheService;
import cn.haiyang.domain.user.UserModel;
import cn.haiyang.filter.GetHttpResponseHeader;
import cn.haiyang.service.user.IUserService;
import cn.haiyang.utils.FrontStatusConstants;
import cn.haiyang.utils.Response;
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
    //发送短信
    @Action("sendMessage")
    public void sendMessage(){
        String phone = this.getRequest().getParameter("phone");

        String randomNumeric = RandomStringUtils.randomNumeric(6);

        String content = "P2P短信认证："+randomNumeric;

        System.out.println("向"+phone+"发送验证消息"+content);

        baseService.set(phone,randomNumeric);



        baseService.expire("phone",3*60);

        try {
            this.getResponse().getWriter().write(Response.build().setStatus("1").toJSON());
        } catch (IOException e) {
            e.printStackTrace();
        }

    }

//先判断token的状态
    @Action("addPhone")
    public void addPhone(){
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
}
