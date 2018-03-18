package cn.haiyang.service.creditor;

import cn.haiyang.domain.creditor.CreditorModel;

import java.util.List;
import java.util.Map;

public interface ICreditorService {

	void addMulti(List<CreditorModel> cs);

	List<CreditorModel> findCreditorByCondition(Map<String, Object> map);

	List<Object[]> findCreditorBySum(Map<String, Object> map);

	void checkCreditor(String[] id);

}
