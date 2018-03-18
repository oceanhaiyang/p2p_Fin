package cn.haiyang.service.creditor.impl;

import cn.haiyang.dao.creditor.ICreditor4SqlDAO;
import cn.haiyang.dao.creditor.ICreditorDAO;
import cn.haiyang.domain.creditor.CreditorModel;
import cn.haiyang.service.creditor.ICreditorService;
import cn.haiyang.utils.constant.ClaimsType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

@Service
@Transactional
public class CreditorServiceImpl implements ICreditorService {

	@Autowired
	private ICreditorDAO creditorDao;

	@Autowired
	private ICreditor4SqlDAO creditor4SqlDao;

	@Override
	public void addMulti(List<CreditorModel> cs) {

		creditorDao.save(cs);
	}

	// 多条件债权信息查询
	@Override
	public List<CreditorModel> findCreditorByCondition(Map<String, Object> map) {
		return creditor4SqlDao.findCreditorByCondition(map);
	}

	// 多条件查询债权的统计信息
	@Override
	public List<Object[]> findCreditorBySum(Map<String, Object> map) {
		return creditor4SqlDao.findCreditorBySum(map);
	}

	// 债权的审核
	@Override
	public void checkCreditor(String[] id) {
		for (int i = 0; i < id.length; i++) {
			// 1.根据id去查询债权
			CreditorModel creditor = creditorDao.findOne(Integer.parseInt(id[i].trim()));
			
			if(creditor!=null){
				//查找到
				//2.修改债权的状态
				creditor.setDebtStatus(ClaimsType.CHECKED);
			}
		}
		
		
	}
}
