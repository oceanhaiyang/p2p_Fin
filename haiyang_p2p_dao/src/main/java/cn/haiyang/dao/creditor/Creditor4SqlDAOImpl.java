package cn.haiyang.dao.creditor;

import cn.haiyang.domain.creditor.CreditorModel;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;

@Repository
public class Creditor4SqlDAOImpl implements ICreditor4SqlDAO {

	@PersistenceContext
	private EntityManager em; // 相当于hibernate中的session

	//债权信息
	@Override
	public List<CreditorModel> findCreditorByCondition(Map<String, Object> map) {

		String sql = "select a.* from t_debt_info a,(select rownum rn,d_id from t_debt_info) b where 1=1";
		// 1.得到标的编号
		String dDebtNo = (String) map.get("dDebtNo");
		if (dDebtNo != null) {
			sql += " and d_debt_no='" + dDebtNo + "'";
		}
		// 2.借款id 就是合同编号
		String dContractNo = (String) map.get("dContractNo");
		if (dContractNo != null) {
			sql += " and d_contract_No='" + dContractNo + "'";
		}
		// 3.债权转入日期
		Date dDebtTransferredDateStart = (Date) map.get("dDebtTransferredDateStart");
		Date dDebtTransferredDateEnd = (Date) map.get("dDebtTransferredDateEnd");
		SimpleDateFormat sdf = new SimpleDateFormat();

		if (dDebtTransferredDateStart != null && dDebtTransferredDateEnd != null) {
			String start = sdf.format(dDebtTransferredDateStart);
			String end = sdf.format(dDebtTransferredDateEnd);
			sql += " and d_debt_Transferred_Date between to_date('" + start + "','yyyy-mm-dd') and to_date('" + end
					+ "','yyyy-mm-dd')";
		}
		// 4.债权的状态
		Integer dDebtStatus = (Integer) map.get("dDebtStatus");
		if (dDebtStatus != null && dDebtStatus != 0) {
			sql += " and d_debt_Status='" + dDebtStatus + "'";
		}
		// 5.债权的匹配状态
		Integer dMatchedStatus = (Integer) map.get("dMatchedStatus");
		if (dMatchedStatus != null && dMatchedStatus != 0) {
			sql += " and d_matched_Status='" + dMatchedStatus + "'";
		}
		
		//6.分页
		int currentNum=(int) map.get("currentNum");
		int startIndex=(int) map.get("startIndex");
		sql+=" and b.rn >"+startIndex+" and b.rn<="+(startIndex+currentNum)+" and a.d_id=b.d_id order by a.d_id";
		
		

		Query query = em.createNativeQuery(sql, CreditorModel.class);
		List<CreditorModel> resultList = query.getResultList();
		return resultList;
	}

	//债权统计信息
	@Override
	public List<Object[]> findCreditorBySum(Map<String, Object> map) {
		String sql = "select  count(d_id),sum(d_debt_Transferred_Money),sum(d_available_Money) from t_debt_info where 1=1";
		// 1.得到标的编号
		String dDebtNo = (String) map.get("dDebtNo");
		if (dDebtNo != null) {
			sql += " and d_debt_no='" + dDebtNo + "'";
		}
		// 2.借款id 就是合同编号
		String dContractNo = (String) map.get("dContractNo");
		if (dContractNo != null) {
			sql += " and d_contract_No='" + dContractNo + "'";
		}
		// 3.债权转入日期
		Date dDebtTransferredDateStart = (Date) map.get("dDebtTransferredDateStart");
		Date dDebtTransferredDateEnd = (Date) map.get("dDebtTransferredDateEnd");
		SimpleDateFormat sdf = new SimpleDateFormat();

		if (dDebtTransferredDateStart != null && dDebtTransferredDateEnd != null) {
			String start = sdf.format(dDebtTransferredDateStart);
			String end = sdf.format(dDebtTransferredDateEnd);
			sql += " and d_debt_Transferred_Date between to_date('" + start + "','yyyy-mm-dd') and to_date('" + end
					+ "','yyyy-mm-dd')";
		}
		// 4.债权的状态
		Integer dDebtStatus = (Integer) map.get("dDebtStatus");
		if (dDebtStatus != null && dDebtStatus != 0) {
			sql += " and d_debt_Status='" + dDebtStatus + "'";
		}
		// 5.债权的匹配状态
		Integer dMatchedStatus = (Integer) map.get("dMatchedStatus");
		if (dMatchedStatus != null && dMatchedStatus != 0) {
			sql += " and d_matched_Status='" + dMatchedStatus + "'";
		}
		
		Query query = em.createNativeQuery(sql);
		List<Object[]> resultList = query.getResultList();
		return resultList;
	}
}
