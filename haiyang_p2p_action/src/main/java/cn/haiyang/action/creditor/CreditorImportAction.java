package cn.haiyang.action.creditor;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.URLEncoder;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

import cn.haiyang.action.admin.BaseAction;
import org.apache.log4j.Logger;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.InterceptorRef;
import org.apache.struts2.convention.annotation.InterceptorRefs;
import org.apache.struts2.convention.annotation.Namespace;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import com.opensymphony.xwork2.interceptor.annotations.InputConfig;


//债权管理

@Scope("prototype")
@Namespace("/creditor")
@Controller
public class CreditorImportAction extends BaseAction {

	private static Logger logger = Logger.getLogger(CreditorImportAction.class);




	/**
	 * 文件下载
	 * 

	 */
	@Action(value = "download", results = { @Result(name = "success", type = "json") }, params = { "contentType",
			"text/html" })
	public void download() {
		FileInputStream inStream = null;
		try {
			String url = getRequest().getSession().getServletContext()
					.getRealPath("/WEB-INF/TemplateExcel/ClaimsBatchImportTemplate.xlsx");
			inStream = new FileInputStream(url);
			// 设置输出的格式
			getResponse().reset();
			getResponse().addHeader("content-type", "application/x-excel");
			getResponse().addHeader("Content-Disposition", "attachment;filename="
					+ new Date().toLocaleString() + ".xlsx");
			// 循环取出流中的数据
			byte[] b = new byte[1024];
			int len;
			while ((len = inStream.read(b)) > 0)
				getResponse().getOutputStream().write(b, 0, len);
			getResponse().getOutputStream().flush();
		} catch (Exception e) {
			logger.debug("债权导入错误");
		}

	}

}
