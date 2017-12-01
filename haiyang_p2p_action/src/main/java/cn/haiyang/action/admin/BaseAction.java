package cn.haiyang.action.admin;

import java.util.Map;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.ServletActionContext;

import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionSupport;

public class BaseAction extends ActionSupport {

	/**
	 * @Fields serialVersionUID : TODO(用一句话描述这个变量表示什么)
	 */

	private static final long serialVersionUID = 1L;

	public static final String VIEW = "view";
	public static final String LIST = "list";
	public static final String STATUS = "status";
	public static final String WARN = "warn";
	public static final String SUCCESS = "success";
	public static final String ERROR = "error";
	public static final String MESSAGE = "message";
	public static final String CONTENT = "content";

	/**
	 * 得到Attribute
	 * 
	 * @param name
	 *            - 名称(key)
	 * @return Object - 对象(value)
	 */
	public Object getAttribute(String name) {
		return ServletActionContext.getRequest().getAttribute(name);
	}

	/**
	 * 设置Attribute
	 * 
	 * @param name
	 *            - 名称(key)
	 * @param value
	 *            - 对象(value)
	 */
	public void setAttribute(String name, Object value) {
		ServletActionContext.getRequest().setAttribute(name, value);
	}

	/**
	 * 获取Parameter
	 * 
	 * @param name
	 *            - 参数的name
	 * @return String - 参数值
	 */
	public String getParameter(String name) {
		return getRequest().getParameter(name);
	}

	/**
	 * 获取Parameter数组
	 * 
	 * @param name
	 *            - 参数的name
	 * @return String[] - 参数值数组
	 */
	public String[] getParameterValues(String name) {
		return getRequest().getParameterValues(name);
	}

	/**
	 * 获取Session
	 * 
	 * @param name
	 *            - Session的name
	 * @return Object - 对象
	 */
	public Object getSession(String name) {
		ActionContext actionContext = ActionContext.getContext();
		Map session = actionContext.getSession();
		return session.get(name);
	}

	/**
	 * 获取Session
	 * 
	 * @return Map - Map
	 */
	public Map getSession() {
		ActionContext actionContext = ActionContext.getContext();
		Map session = actionContext.getSession();
		return session;
	}

	/**
	 * 设置Session
	 * 
	 * @param name
	 *            - Session的name
	 * @param value
	 *            - Session的value
	 */
	public void setSession(String name, Object value) {
		ActionContext actionContext = ActionContext.getContext();
		Map session = actionContext.getSession();
		session.put(name, value);
	}

	/**
	 * 获取Request
	 * 
	 * @return HttpServletRequest - HttpServletRequest
	 */
	public HttpServletRequest getRequest() {
		return ServletActionContext.getRequest();
	}

	/**
	 * 获取Response
	 * 
	 * @return HttpServletResponse - HttpServletResponse
	 */
	public HttpServletResponse getResponse() {
		return ServletActionContext.getResponse();
	}

	/**
	 * 获取Application
	 * 
	 * @return ServletContext - ServletContext
	 */
	public ServletContext getApplication() {
		return ServletActionContext.getServletContext();
	}

}
