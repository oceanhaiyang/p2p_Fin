package cn.haiyang.dao.creditor;

import cn.haiyang.domain.creditor.CreditorModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ICreditorDAO extends JpaRepository<CreditorModel, Integer>{

}
