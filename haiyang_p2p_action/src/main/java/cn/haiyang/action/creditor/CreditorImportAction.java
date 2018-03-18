package cn.haiyang.action.creditor;

import java.io.*;
import java.net.URLEncoder;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

import cn.haiyang.action.admin.BaseAction;
import cn.haiyang.dao.creditor.CreditorDao;
import cn.haiyang.domain.creditor.CreditorModel;
import cn.haiyang.utils.FrontStatusConstants;
import cn.haiyang.utils.RandomNumberUtil;
import cn.haiyang.utils.constant.ClaimsType;
import cn.haiyang.utils.excelUtil.DataFormatUtilInterfaceImpl;
import com.opensymphony.xwork2.ModelDriven;
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
public class CreditorImportAction extends BaseAction implements ModelDriven<CreditorModel>{

	private CreditorModel creditor = new CreditorModel();
	@Override
	public CreditorModel getModel() {
		return creditor;
	}

	private static Logger logger = Logger.getLogger(CreditorImportAction.class);
	@Autowired
	private CreditorDao creditorDao;

    @Action("/addCreditor")
	public void addCreditor(){
		// 手动封装请求参数
		creditor.setDebtNo("ZQNO" + RandomNumberUtil.randomNumber(new Date()));// 债权编号
		creditor.setBorrowerId(1); // 借款人编号
		creditor.setDebtStatus(ClaimsType.UNCHECKDE); // 债权状态 ----未审核
		creditor.setMatchedStatus(ClaimsType.UNMATCH); // 匹配状态 ----未匹配
		creditor.setDebtType(FrontStatusConstants.NULL_SELECT_OUTACCOUNT);// 标的类型
		creditor.setAvailablePeriod(creditor.getDebtTransferredPeriod());// 可用期限
		creditor.setAvailableMoney(creditor.getDebtTransferredMoney());// 可用金额
		creditor.setDebtMonthRate(new DataFormatUtilInterfaceImpl().formatToDouble(creditor.getDebtMonthRate(), 12));
//完成添加操作
		creditorDao.save(creditor);
		try {
			this.getResponse().getWriter().write("{\"status\":\"1\"}");
			return;
		} catch (IOException e) {
			e.printStackTrace();
		}



	}
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
