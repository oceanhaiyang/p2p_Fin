package cn.haiyang.action.admin;

import java.io.IOException;

import org.apache.poi.util.IOUtils;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import cn.haiyang.domain.admin.AdminModel;
import cn.haiyang.service.admin.IAdminService;

@SuppressWarnings("serial")
@Controller
@Namespace("/account")
@Scope("prototype")  //代表action是多列的
public class AdminAction extends BaseAction {
	@Autowired
	private IAdminService adminService;
	
    @Action("login")
    public void login(){
    	
        String username = this.getRequest().getParameter("username");
        String password = this.getRequest().getParameter("password");

        try {
        	AdminModel  adminModel  = adminService.login(username, password);
            if (adminModel!=null){
                this.getResponse().getWriter().write("{\"status\":\"1\"}");
                return;
            }else {
                this.getResponse().getWriter().write("{\"status\":\"0\"}");
                return;
            }

            //ServletActionContext.getResponse().getWriter().write("{\"status\":\"1\"}");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

}
