package cn.haiyang.dao.creditor;


import cn.haiyang.domain.creditor.CreditorModel;

import java.util.List;
import java.util.Map;

public interface ICreditor4SqlDAO {

	List<CreditorModel> findCreditorByCondition(Map<String, Object> map);

	List<Object[]> findCreditorBySum(Map<String, Object> map);

}
