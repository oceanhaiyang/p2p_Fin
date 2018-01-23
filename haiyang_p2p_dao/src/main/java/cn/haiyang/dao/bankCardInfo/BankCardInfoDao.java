package cn.haiyang.dao.bankCardInfo;

import cn.haiyang.domain.bankCardInfo.BankCardInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface BankCardInfoDao extends JpaRepository<BankCardInfo,Integer>{

    BankCardInfo findByUserId(Integer userId);
}
