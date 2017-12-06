package cn.haiyang.action.user;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

import org.apache.commons.lang3.StringUtils;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import cn.haiyang.action.admin.BaseAction;
import cn.haiyang.cache.BaseCacheService;
import cn.haiyang.domain.user.UserModel;
import cn.haiyang.service.user.IUserService;
import cn.haiyang.utils.FrontStatusConstants;
import cn.haiyang.utils.ImageUtil;
import cn.haiyang.utils.Response;

@SuppressWarnings("serial")
@Controller
@Scope("prototype")
@Namespace("/user")
public class UserAction extends BaseAction{
	
	@Autowired
	private BaseCacheService baseCache;
	
	@Autowired
	private IUserService iUserService;
	/**
	 * 产生uuid,保存到redis中
	 */
	@Action("uuid")
	public void user(){
		String uuid = UUID.randomUUID().toString();
		baseCache.set(uuid, uuid);
		baseCache.expire(uuid, 3*60);
		try {
			this.getResponse().getWriter().write(Response.build().setStatus("1").setUuid(uuid).toJSON());
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	/**
	 * 产生验证码，保存在redis中
	 */
	@Action("validateCode")
	public void validateCode(){
		String tokenUuid = this.getRequest().getParameter("tokenUuid");
		String uuid = baseCache.get(tokenUuid);
		try {
			if(StringUtils.isEmpty(uuid))
				return;
			String str = ImageUtil.getRundomStr();
			
			baseCache.del(uuid);
			baseCache.set(uuid, str);
			baseCache.expire(uuid, 3*60);
			
			ImageUtil.getImage(str, this.getResponse().getOutputStream());
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	/**
	 * 验证用户名是否有效
	 */
	@Action("validateUserName")
	public void validateUserName(){
		String username = this.getRequest().getParameter("username");
		UserModel user = iUserService.findByUsername(username);
		try {
			if(user == null){
				this.getResponse().getWriter().write(Response.build().setStatus("1").toJSON());
				return;
			}
			else{
			this.getResponse().getWriter().write(Response.build().setStatus(FrontStatusConstants.ALREADY_EXIST_OF_USERNAME).toJSON());
			return;
			}
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}
}
