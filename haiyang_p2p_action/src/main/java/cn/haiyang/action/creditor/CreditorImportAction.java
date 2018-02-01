package cn.haiyang.action.creditor;

import java.io.*;
import java.net.URLEncoder;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

import cn.haiyang.action.admin.BaseAction;
import org.apache.log4j.Logger;
import org.apache.poi.util.IOUtils;
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
	@Action("download")
	public void download() {
		FileInputStream inStream = null;
		try {
			String url = this.getRequest().getSession().getServletContext()
					.getRealPath("/WEB-INF/TemplateExcel/ClaimsBatchImportTemplate.xlsx");
			inStream = new FileInputStream(url);
			// 设置输出的格式
			getResponse().reset();
			getResponse().addHeader("content-type", "application/x-excel");
			getResponse().addHeader("Content-Disposition", "attachment;filename="
					+ new Date().toLocaleString() + ".xlsx");

			OutputStream os = this.getResponse().getOutputStream();
			IOUtils.copy(inStream,os);

		} catch (Exception e) {
			logger.debug("债权导入错误");
		}finally {
			if(inStream != null){
				try {
					inStream.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}

	}

}
