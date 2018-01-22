package cn.haiyang.action.investment;

import cn.haiyang.action.admin.BaseAction;
import cn.haiyang.cache.BaseCacheService;
import cn.haiyang.domain.userAccount.UserAccountModel;
import cn.haiyang.filter.GetHttpResponseHeader;
import cn.haiyang.service.userAccount.IUserAccountService;
import cn.haiyang.utils.Response;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import java.util.Map;

@Controller
@Scope("prototype")
@Namespace("/investment")
public class InvestmentAction extends BaseAction {

    @Autowired
    private BaseCacheService baseCacheService;

    @Autowired
    private IUserAccountService iUserAccountService;
    @Action("checkAccount")
    public void checkAccount(){
        double account = Double.parseDouble(this.getRequest().getParameter("account"));
        String token = GetHttpResponseHeader.getHeadersInfo(this.getRequest());
        Map<String,Object> map = baseCacheService.getHmap(token);

        try{
            if(map==null||map.size()==0){
                this.getResponse().getWriter().write(Response.build().setStatus("15").toJSON());
                return;
            }

            int userId =(int )map.get("id");

            UserAccountModel model = iUserAccountService.findByUserId(userId);

           double balance =  model.getBalance();

           if(balance>=account){
               this.getResponse().getWriter().write(Response.build().setStatus("1").toJSON());
                return;
           }
           else{
               this.getResponse().getWriter().write(Response.build().setStatus("17").toJSON());
                return;
           }
        }catch (Exception e){
            e.printStackTrace();
        }

    }
}
